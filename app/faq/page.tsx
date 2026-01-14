"use strict";
import Navigation from "@/components/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
    {
        question: "Is this automatic trading?",
        answer: "No. PollyScanner is strictly a screening and alert system. It identifies potential setups based on your logic but it never places orders on your behalf."
    },
    {
        question: "Can I stop the bot anytime?",
        answer: "Yes. Since the logic lives in your private Google Sheet, you can simply delete the trigger or pause the script instantly. You have 100% control."
    },
    {
        question: "Is my brokerage account connected?",
        answer: "No. PollyScanner does not require API keys for your broker or exchange. It reads market data and sends messages to Discord. Your funds are never touched."
    },
    {
        question: "Do I need a TradingView subscription?",
        answer: "For basic features, no. However, if you want to use TradingView Webhooks as a data source for the sheet, a Pro or higher plan is recommended."
    },
    {
        question: "What markets does it support?",
        answer: "Crypto, Stocks, Forex — anything TradingView or Google Finance supports can be screened."
    }
];

export default function FAQ() {
    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-emerald-500/30 font-sans">
            <Navigation />

            <main className="container mx-auto px-6 py-16 flex flex-col items-center">
                <div className="text-center mb-16 max-w-2xl">
                    <h1 className="text-4xl font-black mb-4">Questions & Answers</h1>
                    <p className="text-white/40 text-lg">
                        Everything you need to know about safety and functionality.
                    </p>
                </div>

                <div className="w-full max-w-2xl">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`} className="border border-white/10 px-4 rounded-lg bg-white/5">
                                <AccordionTrigger className="hover:no-underline font-bold text-lg py-4">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-white/60 leading-relaxed pb-4">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

            </main>
        </div>
    )
}
