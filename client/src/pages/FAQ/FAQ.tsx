import React, { useState } from 'react';
import './FAQ.css';

const FAQ: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState<string | null>(null);

    const faqData = [
        { 
            category: 'About Chef\'s Choice',
            sections: [
                { title: 'How It Works', questions: [
                    { question: 'Can I see the menu before sign up?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                    { question: 'How does Chef\'s Choice work?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                    { question: 'What delivery days are there in my area?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                    { question: 'Is there a minimum duration required for the Chef\'s Choice meals subscription?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                ]},
                { title: 'Plans', questions: [
                    { question: 'How much will my subscription cost?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                    { question: 'What meal plans do you offer?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                    { question: 'Do you have specific dietary plans?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                ]},
            ]
        },
        {
            category: 'Account Info and Billing',
            sections: [
                { title: 'Account Info', questions: [
                    { question: 'How do I cancel my account?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                    { question: 'How do I update my account info?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                    { question: 'How do I manage my Chef\'s Choice account?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                ]},
                { title: 'Billings', questions: [
                    { question: 'How do i update my payment info?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                    { question: 'How do I view my delivery and charge history?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                    { question: 'What types of payments can I use?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                ]}
            ]
        },
        {
            category: 'Get In Touch',
            sections: [
                { title: 'Frequently Asked Questions', questions: [
                    { question: 'How do I contact customer service?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                    { question: 'What should I do if my box is late or there\'s an issue with my delivery?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                    { question: 'Who should I email with a press inquiry?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                ]}
            ]
        }
    ];
    

    const handleAccordionClick = (id: string) => {
        setActiveIndex(activeIndex === id ? null : id);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = faqData.map(category => ({
        ...category,
        sections: category.sections.map(section => ({
            ...section,
            questions: section.questions.filter(q => 
                q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                q.answer.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((question, index) => ({
                ...question,
                id: `${category.category}-${section.title}-${index}`
            }))
        })).filter(section => section.questions.length > 0)
    })).filter(category => category.sections.length > 0);

    return (
        <div className='FAQ'>
            <div 
                className='faq-hero'
                style={{ backgroundImage: 'url(/assets/faq-page-image.png)' }}
            >
                <div className='faq-search-container'>
                    <h2 className='faq-h2'>Help Center</h2>
                    <span className='faq-search-span'>How can we help you? Search our FAQs or click one of the sections below.</span>
                    <div className='faq-search-bar-container'>
                        <input 
                            type="text" 
                            className='faq-search-bar'
                            placeholder='Search by topics, keywords, or phrases'
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
            </div>
            <div className='faq-button-section'>
                <div className='faq-button-container'>
                    <button className="faq-button">Button label</button>
                    <button className="faq-button">Button label</button>
                    <button className="faq-button">Button label</button>
                    <button className="faq-button">Button label</button>
                    <button className="faq-button">Button label</button>
                    <button className="faq-button">Button label</button>
                    <button className="faq-button">Button label</button>
                    <button className="faq-button">Button label</button>
                    <button className="faq-button">Button label</button>
                </div>
            </div>
            <div className='faq-question-section-container'>
                {filteredData.map((category, categoryIndex) => (
                    <div key={categoryIndex} className='faq-category'>
                        <h2 className='faq-category-title'>{category.category}</h2>
                        {category.sections.map((section, sectionIndex) => (
                            <div key={sectionIndex} className='faq-question-section'>
                                <h3>{section.title}</h3>
                                {section.questions.map((item, index) => (
                                    <div key={item.id} className={`faq-question-item ${activeIndex === item.id ? 'active' : ''}`}>
                                        <div className='faq-question-container' onClick={() => handleAccordionClick(item.id)}>
                                            <span className={`faq-question ${activeIndex === item.id ? 'active' : ''}`}>{item.question}</span>
                                            <span className='faq-plus'>{activeIndex === item.id ? '-' : '+'}</span>
                                        </div>
                                        {activeIndex === item.id && (
                                            <div className='faq-answer'>
                                                {item.answer}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FAQ;
