import React, { useEffect } from 'react';
import '../RegistrationComponents.css';

interface Step4Props {
    formData: any;
    setFormData: (data: any) => void;
    nextStep: () => void;
    prevStep: () => void;
    categories: { _id: string, name: string, description: string, icon: string, sortOrder: number }[];
}

const Step4: React.FC<Step4Props> = ({ formData, setFormData, nextStep, prevStep, categories }) => {

    useEffect(() => {
        console.log('Icons used in Step4 component:');
        sensitivityCategories.forEach(category => {
            console.log(category.icon);
        });
    }, []);

    const handleChange = (sensitivityId: string) => {
        const sensitivities = formData.sensitivities || [];
        if (sensitivities.includes(sensitivityId)) {
            setFormData({ ...formData, sensitivities: sensitivities.filter((s: string) => s !== sensitivityId) });
        } else {
            setFormData({ ...formData, sensitivities: [...sensitivities, sensitivityId] });
        }
    };

    const sensitivityCategories = categories
        ? categories.filter(category => category.description.startsWith('Sensitivity:')).sort((a, b) => a.sortOrder - b.sortOrder)
        : [];


    return (
        <div className='outer-step-container'>
            <div className='step-container'>
                <div className='step-inner-container'>
                    <div className='step-container-left'>
                        <div className='category-copy-container'>
                            <h2>Select your food sensitivities</h2>
                            <span>Your choices help our AI recommend meals free of allergens and intolerances.</span>
                        </div>
                    </div>
                    <div className='step-container-right'>
                        <div className='category-button-container'>
                            {sensitivityCategories.map(category => (
                                <button
                                    key={category._id}
                                    onClick={() => handleChange(category._id)}
                                    className={`category-button ${formData.sensitivities.includes(category._id) ? 'selected' : ''}`}
                                >
                                    <div className='sensitivities-button-copy'>
                                        {category.icon ? (
                                            <>
                                                <div className='icon-container'>
                                                    <img
                                                        src={`/sensitivities/${category.icon}`}  
                                                        alt={category.name}
                                                        className='category-icon'
                                                    />
                                                </div>
                                                <span className='category-name sensitivities-name'>{category.name}</span>
                                            </>
                                        ) : (
                                            <span className='category-name sensitivities-name' style={{ flexBasis: '100%', textAlign: 'center' }}>{category.name}</span>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='direction-button-container'>
                    <button onClick={prevStep} className='back-button'>Back</button>
                    <button onClick={nextStep} className='next-button'>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Step4;
