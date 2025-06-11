import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-neutral-light pt-32 pb-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-16 text-primary-navy">Frequently Asked Questions</h1>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="what-is-plusplus">
              <AccordionTrigger className="text-xl text-primary-navy">What is Plusplus?</AccordionTrigger>
              <AccordionContent className="text-neutral-dark leading-relaxed">
                Plusplus AG is a Swiss financial technology company that bridges traditional finance (TradFi) with decentralized finance (DeFi). We provide institutional-grade solutions that offer attractive yields on Swiss Franc deposits while ensuring full compliance with Swiss financial regulations.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how-it-works">
              <AccordionTrigger className="text-xl text-primary-navy">How does it work?</AccordionTrigger>
              <AccordionContent className="text-neutral-dark leading-relaxed">
                Our platform converts your CHF deposits into Swiss Franc-backed stablecoins (ZCHF) which are then placed in high-yield DeFi protocols. The process is fully automated and secure, with smart contracts managing interest payments and withdrawals. You can withdraw your funds back to CHF at any time.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="returns">
              <AccordionTrigger className="text-xl text-primary-navy">What returns can I expect?</AccordionTrigger>
              <AccordionContent className="text-neutral-dark leading-relaxed">
                Our platform typically offers yields between 3-4% APY on Swiss Franc deposits, significantly higher than traditional savings accounts. These returns are generated through efficient DeFi protocols while maintaining the stability of the Swiss Franc.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="security">
              <AccordionTrigger className="text-xl text-primary-navy">How secure is Plusplus?</AccordionTrigger>
              <AccordionContent className="text-neutral-dark leading-relaxed">
                Security is our top priority. We operate under full compliance with Swiss financial regulations (FINMA, VQF) and implement institutional-grade security measures. All smart contracts are thoroughly audited, and we maintain comprehensive insurance coverage for digital assets.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="get-started">
              <AccordionTrigger className="text-xl text-primary-navy">How can I get started?</AccordionTrigger>
              <AccordionContent className="text-neutral-dark leading-relaxed">
                Getting started is simple. Once our platform launches, you can create an account, complete the verification process, and make your first deposit. Our user-friendly interface guides you through each step, making it easy to start earning higher yields on your Swiss Franc deposits.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </main>
  );
}
