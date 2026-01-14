"use client"

import React, { useEffect, useRef } from 'react';

export default function TradingViewWidget({ symbol = "BINANCE:BTCUSDT" }: { symbol?: string }) {
    const container = useRef<HTMLDivElement>(null);
    const scriptRef = useRef<HTMLScriptElement | null>(null);

    useEffect(() => {
        if (!container.current) return;

        // Cleanup previous script if it exists (though TV widget might be tricky with simple cleanup)
        // For this simple implementation, we just clear the container if we strictly want to re-render,
        // but TV widget script loading is often once-per-mount.
        // Let's try to just clear the container.
        container.current.innerHTML = "";

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify({
            "autosize": true,
            "symbol": symbol,
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "enable_publishing": false,
            "allow_symbol_change": true,
            "calendar": false,
            "support_host": "https://www.tradingview.com"
        });
        container.current.appendChild(script);
        scriptRef.current = script;
    }, [symbol]);

    return (
        <div className="tradingview-widget-container h-full w-full bg-[#0f172a]" ref={container}>
            <div className="tradingview-widget-container__widget h-full w-full"></div>
        </div>
    );
}
