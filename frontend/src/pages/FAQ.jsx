import React from "react";

const faqs = [
  {
    question: "What is TechfluxAi?",
    answer:
      "TechfluxAi is an AI-powered platform that helps businesses automate communication and enhance customer experience using smart tools like AI calling agents.",
  },
  {
    question: "How do I book a demo?",
    answer:
      "Click the 'Book a Demo' button in the navigation bar and fill out your details. Our team will reach out to you shortly.",
  },
  {
    question: "Is TechfluxAi secure?",
    answer:
      "Yes, we use advanced encryption protocols and secure cloud infrastructure to protect your data and ensure privacy.",
  },
  {
    question: "Can I customize the AI agent for my business?",
    answer:
      "Absolutely! Our platform allows customization based on your specific workflow, industry, and communication tone.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, we offer a free trial for eligible users. Reach out to us through the demo form for more details.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0e0e0e] to-black text-white px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center text-4xl md:text-5xl font-bold text-purple-500 mb-12">
          Frequently Asked Questions
        </h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] border border-purple-600 rounded-2xl p-6 transition hover:scale-[1.02] duration-200"
            >
              <h3 className="text-lg md:text-xl font-semibold text-purple-400">
                {faq.question}
              </h3>
              <p className="text-gray-300 mt-2 text-sm md:text-base">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
