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
    const [openIndex, setOpenIndex] = useState(0); 

    // Split into two columns
    const leftColumn = faqs.slice(0, 3);
    const rightColumn = faqs.slice(3);

    const ArrowIcon = ({ open }) => (
        <span
            className={
                `flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 bg-white transition-transform duration-200`
            }
        >
            <img
                src={open ? './assets/icons/rigthdown-line.svg' : './assets/icons/rigth-line.svg'}
                alt="arrow icon"
                className="w-5 h-5"
            />
        </span>
    );

    const renderFaqItem = (faq, index, globalIndex) => {
        const isOpen = openIndex === globalIndex;
        return (
            <div
                key={globalIndex}
                className={`mb-4 shadow-md transition-all duration-200 ${
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
                    className={`w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none rounded-2xl`}
                    onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                >
                    <div className={`font-semibold text-lg ${isOpen ? 'text-white' : 'text-[#181D24]'}`}>
                        {faq.question}
                    </div>
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
                        <img
                            src={isOpen ? './assets/images/Vector (5).svg' : './assets/images/Vector (4).svg'}
                            alt="arrow icon"
                            className="w-5 h-5"
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
        <div className="max-w-6xl mx-auto px-4 py-12 border-none">
            <h2 className="px-[20px] text-[32px] sm:text-[36px] md:text-[48px] text-center mb-10">Tez - Tez verilən <span className="font-bold">suallar</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8">
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

