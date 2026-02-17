import React from "react";

const faqs = [
  {
    question: "How do I trigger an SOS alert?",
    answer: "You can press the SOS button on the dashboard or use your custom voice trigger phrase to send an alert automatically."
  },
  {
    question: "Can I update my trusted contacts?",
    answer: "Yes, go to Profile → Trusted Contacts to add, remove, or edit your emergency contacts in different layers."
  },
  {
    question: "How are safer routes calculated?",
    answer: "Routes are suggested based on lighting, crowd density, past incident reports, and public zones like malls or stations."
  },
  {
    question: "Is my data safe?",
    answer: "Yes, all your personal data is securely stored and encrypted. You can also post anonymously on the community forum."
  }
];

function FAQ() {
  return (
    <div className="p-4 bg-white rounded-lg shadow max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-purple-600 mb-4">Frequently Asked Questions</h2>
      {faqs.map((faq, idx) => (
        <div key={idx} className="mb-3 border-b pb-2">
          <p className="font-semibold text-gray-800">{faq.question}</p>
          <p className="text-gray-600">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}

export default FAQ;