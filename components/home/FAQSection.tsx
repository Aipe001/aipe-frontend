import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What is this platform?",
    answer:
      "We are a technology platform that helps you connect with verified finance experts for consultations, filings, and compliance work.",
  },
  {
    question: "Do you provide financial or legal advice?",
    answer:
      "No. All advice and services are provided by independent third-party experts, not by the platform.",
  },
  {
    question: "What services can I use here?",
    answer:
      "You can get expert help for investments, loans, taxation, ROC services, registrations, licenses, filings, and compliance.",
  },
  {
    question: "How does “Book an Expert” work?",
    answer:
      "Choose a service → select a time slot → make payment → an expert is assigned → join the video call → get help or execution → chat support for up to 72 hours (if applicable).",
  },
  {
    question: "How does “Apply for Registration or Filing” work?",
    answer:
      "Choose a service → make payment → expert is assigned → share documents securely → track status updates → get notified until completion.",
  },
  {
    question: "How fast is an expert assigned?",
    answer: "Usually within 10 minutes, subject to availability.",
  },
  {
    question: "Are experts verified?",
    answer:
      "Experts are onboarded after basic verification of experience and credentials. The platform does not guarantee outcomes.",
  },
  {
    question: "Can I choose my expert?",
    answer:
      "Experts are auto-assigned based on service type and availability to ensure faster turnaround.",
  },
  {
    question: "Is my data and documents safe?",
    answer:
      "Yes. Documents and OTPs are shared via encrypted, secure in-app chat and used only for your service.",
  },
  {
    question: "Do you store my passwords or OTPs?",
    answer: "No. OTPs are used temporarily and are not stored permanently.",
  },
  {
    question: "Are fees refundable?",
    answer:
      "No. All payments are non-refundable once the service is booked or initiated.",
  },
  {
    question: "Can I reschedule or cancel a booking?",
    answer:
      "No. Booked slots and initiated services cannot be rescheduled or cancelled.",
  },
  {
    question: "What if my application or filing gets rejected?",
    answer:
      "The platform is not responsible for government or regulatory decisions. Experts work on a best-effort basis.",
  },
  {
    question: "Do you guarantee approvals or results?",
    answer:
      "No. Approvals, timelines, and outcomes depend on regulators, authorities, and information provided by you.",
  },
  {
    question: "Who is responsible for the advice or work done?",
    answer:
      "The assigned expert is solely responsible for the advice and execution. The platform only facilitates the connection.",
  },
  {
    question: "What if the expert needs more information?",
    answer:
      "The expert will request details or documents via in-app chat. Timely response helps faster completion.",
  },
  {
    question: "Will I get updates on my service?",
    answer:
      "Yes. You’ll receive updates through in-app chat and notifications.",
  },
  {
    question: "Can the expert call me?",
    answer:
      "Calls are scheduled only if required and based on mutual availability.",
  },
  {
    question: "Do you charge extra government fees?",
    answer:
      "Statutory or government fees, if applicable, are shown separately.",
  },
  {
    question: "How can I contact support?",
    answer: (
      <span>
        Email us at{" "}
        <a
          href="mailto:hello@aipe.club"
          className="text-[#1C8AFF] hover:underline"
        >
          hello@aipe.club
        </a>
      </span>
    ),
  },
  {
    question: "Is this platform a bank, broker, or advisor?",
    answer:
      "No. We are a technology-enabled marketplace, not a financial institution or advisory firm.",
  },
];

interface FAQSectionProps {
  limit?: number;
}

export function FAQSection({ limit }: FAQSectionProps) {
  const displayedFaqs = limit ? faqData.slice(0, limit) : faqData;

  return (
    <section id="faq" className="py-8 md:py-12">
      <div className="page-container">
        <div className="bg-primary/5 rounded-[24px] p-6 md:p-12">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold uppercase text-[#1C8AFF]">
              FAQs
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="multiple" className="w-full space-y-4">
              {displayedFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-[12px] border-none shadow-sm px-4 md:px-6"
                >
                  <AccordionTrigger className="hover:no-underline py-4 md:py-6 text-left [&>svg]:text-[#1C8AFF] [&>svg]:bg-[#1C8AFF]/10 [&>svg]:rounded-full [&>svg]:w-6 [&>svg]:h-6 [&>svg]:p-1">
                    <span className="text-base md:text-lg font-medium text-foreground pr-4 flex-1">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-6 pt-0">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
