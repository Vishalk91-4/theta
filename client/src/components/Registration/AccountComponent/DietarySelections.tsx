import React from 'react';
import './DietarySelections.css';

interface DietarySelectionsProps {
    formData: any;
    setFormData: (data: any) => void;
    categories: { _id: string, name: string, description: string, copy: string, sortOrder: number }[];
    handleSubmit: () => void;
    submitStatus: 'idle' | 'submitting' | 'success' | 'error';
}

const DietarySelections: React.FC<DietarySelectionsProps> = ({ formData, setFormData, categories, handleSubmit, submitStatus }) => {
    const handleChange = (id: string, type: 'preference' | 'sensitivity') => {
        if (type === 'preference') {
            const preferences = formData.preferences || [];
            if (preferences.includes(id)) {
                setFormData({ ...formData, preferences: preferences.filter((p: string) => p !== id) });
            } else {
                setFormData({ ...formData, preferences: [...preferences, id] });
            }
        } else if (type === 'sensitivity') {
            const sensitivities = formData.sensitivities || [];
            if (sensitivities.includes(id)) {
                setFormData({ ...formData, sensitivities: sensitivities.filter((s: string) => s !== id) });
            } else {
                setFormData({ ...formData, sensitivities: [...sensitivities, id] });
            }
        }
    };

    const preferenceCategories = categories
        ? categories.filter(category => category.description.startsWith('Preference:')).sort((a, b) => a.sortOrder - b.sortOrder)
        : [];

    const sensitivityCategories = categories
        ? categories.filter(category => category.description.startsWith('Sensitivity:')).sort((a, b) => a.sortOrder - b.sortOrder)
        : [];

    if (!formData) {
        return <div>Loading...</div>;
    }

    return (
        <div className='DietarySelections'>
            <h2>Dietary Selections</h2>
            <div className='dietary-lists-container'>
                <div className='preferences'>
                    <h3>Food Preferences</h3>
                    <div className='preferences-list'>
                        {preferenceCategories.map(category => (
                            <div className='preferences-list-item' key={category._id}>
                                <div className='preferences-list-item-top'>
                                    <input
                                        type="checkbox"
                                        className='dietary-selections-checkbox'
                                        checked={formData.preferences?.includes(category._id) || false}
                                        onChange={() => handleChange(category._id, 'preference')}
                                    />
                                    <span className='preferences-name'>{category.name}</span>
                                </div>
                                <span className='category-copy'>{category.copy}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='sensitivities'>
                    <h3>Sensitivities</h3>
                    <div className='sensitivities-list'>
                        {sensitivityCategories.map(category => (
                            <div className='sensitivities-list-item' key={category._id}>
                                <div className='sensitivities-list-item-top'>
                                    <input
                                        type="checkbox"
                                        className='dietary-selections-checkbox'
                                        checked={formData.sensitivities?.includes(category._id) || false}
                                        onChange={() => handleChange(category._id, 'sensitivity')}
                                    />
                                    <span className='sensitivities-name'>{category.name}</span>
                                </div>
                                <span className='category-copy'>{category.copy}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='submit-button-container'>
                <button 
                    onClick={handleSubmit} 
                    className={`submit-button ${submitStatus === 'success' ? 'success' : ''}`}
                    disabled={submitStatus === 'submitting'}
                >
                    {submitStatus === 'submitting' ? 'Submitting...' : submitStatus === 'success' ? 'Success!' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

export default DietarySelections;
