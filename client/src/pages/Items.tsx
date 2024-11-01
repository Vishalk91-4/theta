import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Items.css'

interface Item {
    _id: string
    name: string
    image?: string
    category?: string[]
    price?: number
    description?: string
    calories: number
    protein: number
    carbs: number
    fats: number
}

const Items: React.FC = () => {
    const navigate = useNavigate()
    const [items, setItems] = useState<Item[]>([])
    const [selectedMealKits, setSelectedMealKits] = useState<string[]>([])

    useEffect(() => {
        fetch('/api/items')
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching items:', error))
    }, [])

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const mealKit = event.target.value;
        if (event.target.checked) {
            setSelectedMealKits([...selectedMealKits, mealKit]);
        } else {
            setSelectedMealKits(selectedMealKits.filter(item => item !== mealKit))
        }
    }

    const handleSubmit = () => {
        navigate('/cart', { state: { selectedMealKits } })
    }

    return (
        <div className='items-container'>
            <h1>Choose your Meal Kits</h1>

            <h3>!!! TODO! - TEST WITH MOCK DATA / WITH BACKEND DATA !!!</h3>
            {items.map(item => (
                <label key={item._id}>
                    <input
                        type="checkbox"
                        value={item.name}
                        checked={selectedMealKits.includes(item.name)}
                        onChange={handleCheckboxChange}
                    />
                    {item.name}
                </label>
            ))}
            <button onClick={handleSubmit}>Add to Cart</button>
        </div>
    )
}

export default Items
