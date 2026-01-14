import { NextRequest, NextResponse } from "next/server";

interface Signal {
    symbol: string;
    condition: string;
    price: string;
    status: string;
    timestamp: string;
    analysis?: string;
}

const askGemini = async (symbol: string, condition: string, price: string) => {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) return null;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const prompt = `You are LEO, a senior crypto quant. Analyze this signal: ${symbol} at ${price} with logic: ${condition}. Give a 1-sentence sharp opinion.`;

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        });
        const data = await res.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "Analysis unavailable.";
    } catch (e) {
        return null;
    }
};

export async function POST(req: NextRequest) {
    try {
        const { sheetId, webhookUrl } = await req.json();

        if (!sheetId) {
            return NextResponse.json(
                { success: false, error: "Missing Sheet ID" },
                { status: 400 }
            );
        }

        // 1. Fetch CSV from Google Sheets
        const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
        const sheetRes = await fetch(csvUrl);

        if (!sheetRes.ok) {
            throw new Error("Failed to fetch sheet data. Ensure the sheet is Public.");
        }

        const csvText = await sheetRes.text();
        const rows = csvText.split("\n").map((row) => row.split(","));

        // 2. Parse Signals
        // Row 0 is headers. We look for rows with Symbol (Col 0) and Condition (Col 1)
        const signals: Signal[] = [];
        const recentRows = rows.slice(1).filter((r) => r[0] && r[1]).slice(-5); // Reduced limit for AI speed

        for (const row of recentRows) {
            const symbol = row[0]?.replace(/"/g, "").trim();
            const condition = row[1]?.replace(/"/g, "").trim();
            const price = row[2]?.replace(/"/g, "").trim() || "Market";
            const status = row[3]?.replace(/"/g, "").trim() || "PENDING";

            if (symbol && condition) {
                // Run AI analysis for PENDING signals
                let analysis = undefined;
                if (status === "PENDING") {
                    analysis = await askGemini(symbol, condition, price);
                }

                signals.push({
                    symbol,
                    condition,
                    price,
                    status,
                    timestamp: new Date().toISOString(),
                    analysis
                });
            }
        }

        // 3. Optional: Dispatch to Discord
        if (webhookUrl && signals.length > 0) {
            const notificationSignal = signals[signals.length - 1];

            const payload = {
                username: "Polyscan Intelligence Agent",
                avatar_url: "https://polyscanner.vercel.app/logo_transparent.png",
                embeds: [
                    {
                        title: `🚨 Signal Detected: ${notificationSignal.symbol}`,
                        description: `**Condition**: ${notificationSignal.condition}\n**Price**: ${notificationSignal.price}\n\n**🦁 LEO Analysis**: ${notificationSignal.analysis || 'Awaiting analysis...'}`,
                        color: 0xff6c37, // Polyscan Orange
                        footer: { text: "Polyscan Protocol • Live Feed" },
                    },
                ],
            };

            await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            }).catch(console.error);
        }

        return NextResponse.json({
            success: true,
            signals: signals.reverse(), // Newest first
        });
    } catch (error: any) {
        console.error("Scanner API Error:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
