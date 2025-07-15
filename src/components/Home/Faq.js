"use client"

import React, { useState } from 'react'

const faqs = [
    {
        question: "Ödəniş barədə məlumatı necə ala bilərəm?",
        answer: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
    },
    {
        question: "Ödəniş barədə məlumatı necə ala bilərəm?",
        answer: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
    },
    {
        question: "Ödəniş barədə məlumatı necə ala bilərəm?",
        answer: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
    },
    {
        question: "Ödəniş barədə məlumatı necə ala bilərəm?",
        answer: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
    },
    {
        question: "Ödəniş barədə məlumatı necə ala bilərəm?",
        answer: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
    },
    {
        question: "Ödəniş barədə məlumatı necə ala bilərəm?",
        answer: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
    },
];

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null); 

    // Split into two columns
    const leftColumn = faqs.slice(0, 3);
    const rightColumn = faqs.slice(3);

  
    const renderFaqItem = (faq, index, globalIndex) => {
        const isOpen = openIndex === globalIndex;
        return (
            <div
                key={globalIndex}
                className={`mb-4 shadow-md transition-all  duration-200 ${
                    isOpen
                        ? 'bg-[#FF7A00] text-white'
                        : ''
                }`}
                style={{
                    ...( !isOpen ? { background: 'rgba(240, 238, 238, 1)', border: 'none' } : {} ),
                    borderRadius: '33px 33px 33px 0',
                }}
            >
                <button
                    className={`w-full cursor-pointer flex items-center justify-between px-6 py-4 text-left focus:outline-none rounded-2xl`}
                    onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                >
                    <div className={`font-semibold text-[ 12px] md:text-[20px] w-[80%] ${isOpen ? 'text-white' : 'text-[#181D24]'}`}>
                        {faq.question}
                    </div>
                   <span className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
  <img
    src="./assets/images/Vector (4).svg"
    alt="arrow icon"
    className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-60' : ''}`}
  />
</span>

                </button>
                {/* Animated answer section (if open) */}
                <div
                    className={`transition-all duration-[400ms] ease-in-out overflow-hidden px-6`}
                    style={{
                        maxHeight: isOpen ? '500px' : '0px',
                        opacity: isOpen ? 1 : 0,
                        paddingTop: isOpen ? '16px' : '0px',
                        paddingBottom: isOpen ? '16px' : '0px',
                        background: 'rgba(240, 238, 238, 1)',
                        borderRadius: '0 0 33px 0',
                    }}
                >
                    <p className="text-gray-600">{faq.answer}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-6xl px-4 py-12 mx-auto mt-5 border-none">
            <h2 className="px-[20px] text-[32px] sm:text-[36px] md:text-[48px] text-center mb-10">Tez - Tez verilən <span className="font-bold">suallar</span></h2>
            <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-8">
                <div>
                    {leftColumn.map((faq, i) => renderFaqItem(faq, i, i))}
                </div>
                <div>
                    {rightColumn.map((faq, i) => renderFaqItem(faq, i, i + 3))}
                </div>
            </div>
        </div>
    );
};

export default Faq;

