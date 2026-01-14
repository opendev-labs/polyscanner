import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { webhookUrl, name } = await req.json();

        if (!webhookUrl) {
            return NextResponse.json({ success: false, error: 'Missing webhookUrl' }, { status: 400 });
        }

        const payload = {
            username: "PollyScanner Captain Hook",
            avatar_url: "https://polyscanner.vercel.app/logo_transparent.png",
            embeds: [
                {
                    title: "🪝 Captain Hook Connected!",
                    description: `This is a test alert for **${name || 'Your Alert'}**.\n\nPollyScanner can now send signals directly to this channel.`,
                    color: 5814783, // Emerald/Green-ish
                    fields: [
                        {
                            name: "Status",
                            value: "✅ Operational",
                            inline: true,
                        },
                        {
                            name: "Latency",
                            value: "Instant",
                            inline: true,
                        }
                    ],
                    footer: {
                        text: "PollyScanner - Simple Alerts",
                    },
                    timestamp: new Date().toISOString(),
                }
            ]
        };

        const discordRes = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!discordRes.ok) {
            const text = await discordRes.text();
            throw new Error(`Discord API Error: ${discordRes.status} ${text}`);
        }

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error("Webhook Test Failed:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
