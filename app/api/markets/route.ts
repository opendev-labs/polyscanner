import { NextResponse } from "next/server";

// Mock data generator for prediction markets
const getMockMarkets = () => [
    {
        id: "poly-1",
        symbol: "FED_RATE_HIKE_FEB",
        name: "Fed to Hike Rates in February?",
        probability: (Math.random() * 20 + 60).toFixed(1), // 60-80%
        volume: "$1.2M",
        delta: "+1.2%",
        status: "STABLE",
    },
    {
        id: "poly-2",
        symbol: "BTC_SUB_40K_Q1",
        name: "Bitcoin below $40k in Q1?",
        probability: (Math.random() * 15 + 10).toFixed(1), // 10-25%
        volume: "$840k",
        delta: "-0.5%",
        status: "VOLATILE",
    },
    {
        id: "poly-3",
        symbol: "SOL_ATH_2026",
        name: "Solana New ATH in 2026?",
        probability: (Math.random() * 20 + 40).toFixed(1), // 40-60%
        volume: "$2.1M",
        delta: "+4.8%",
        status: "DIVERGENT",
    },
    {
        id: "poly-4",
        symbol: "ETH_ETF_APPROVAL",
        name: "ETH Staking ETF Approved?",
        probability: (Math.random() * 30 + 50).toFixed(1), // 50-80%
        volume: "$5.4M",
        delta: "+0.2%",
        status: "CONVICTION",
    },
];

export async function GET() {
    const markets = getMockMarkets();
    return NextResponse.json({
        success: true,
        timestamp: new Date().toISOString(),
        markets,
    });
}
