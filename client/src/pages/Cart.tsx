import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Cart.css'

const Cart: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { selectedMealKits } = location.state || { selectedMealKits: [] }

    const handleSubmit = () => {
        navigate('/checkout')
    }

    return (
        <div className='cart-container'>
            <h1>My Cart</h1>
            {selectedMealKits.length > 0 ? (
                <ul>
                    {selectedMealKits.map(() => (
                        // !!! TODO add ' key={TODO ADD INDEX}>{TODO ADD MEALKIT}' !!!
                        <li> ^^^ </li>
                    ))}
                </ul>
            ) : (
                <p>No meal kits selected.</p>
            )}
            <button onClick={handleSubmit}>Confirm choices</button>
        </div>
    )
}

export default Cart
