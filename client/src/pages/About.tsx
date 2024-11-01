import './About.css'
import about from '../assets/buffet.png'
import graph from '../assets/about-graph.png'
import aboutFood from '../assets/about-food.png'
import logo from '../assets/footerLogo.png'
import { Link } from 'react-router-dom'

const About: React.FC = () => {
    return (
        <div className='about-container'>
            <div className="about-content">
                <div className="about-text">
                    <h1>Chef’s Choice</h1>
                    <h2>Our Nutrition & Ingredient Philosophy</h2>
                    <h3>Real nutrition, made simple.</h3>
                    <p>We believe that a well-balanced diet is key to achieving a sustainable and healthful lifestyle long term. Chef’s Choice makes it easy with chef prepared, dietician-approved meals.</p>
                    <Link to="/login">
                        <button className="learn-more-btn">Learn More</button>
                    </Link>
                </div>
                <div className="about-image" id="image-box">
                    <img src={about} alt="about" />
                </div>
            </div>
            <div className="about-main">
                <h1 className="ingredient-heading">Our Ingredient Philosophy Applied</h1>
                <p className="ingredient-philosophy">We focus on utilizing whole food ingredients with science-backed health benefits. These ingredients are carefully selected to provide a variety of nutrients and flavors to help you achieve your daily dietary needs.</p>
                <div className="about-dropdown">
                    <ul className="dropdown-text">
                        <li className="dropdown-bullet">
                            Array of Micronutrients
                        </li>
                        <li className="dropdown-bullet">
                            Animal and Plant-Based Proteins
                        </li>
                        <li className="dropdown-bullet">
                            A Wide Variety of Fruits
                        </li>
                        <li className="dropdown-bullet">
                            A Wide Variety of Vegetables
                        </li>
                        <li className="dropdown-bullet">
                            Beans, Lentils, and Legumes
                        </li>
                        <li className="dropdown-bullet">
                            Healthy Facts
                        </li>
                        <li className="dropdown-bullet">
                            Nuts and Seeds
                        </li>
                        <li className="dropdown-bullet">
                            Whole Grains
                        </li>
                    </ul>
                </div>
            </div>
            <div className="graph-div">
                <h2>Ingredients with Integrity</h2>
                <p>Out of 500+ reviewed ingredients, more than 160 have been banned for use in Chef’s Choice products based on our teams’ extensive 5 step analysis.</p>
                <img src={graph} alt="graph" />
                <p>Each ingredient brought to Chef’s Choice follows an extensive process for approval that includes examining human health impacts, safety, efficacy, consumer expectations, and more. Deciding which ingredients are a “no” can be difficult, but we are committed to our ingredient standards and evolving with the ever-changing dietary landscape.</p>
            </div>
            <div className="coaching">
                <div className="coaching-image">
                    <img src={aboutFood} alt="aboutFood" className="about-food"/>
                </div>
                <div className="coaching-content">
                    <img src={logo} alt="logo" className="coaching-logo"/>
                    <div className="nutrition-text">
                        <h2>Need Nutritional Advice?</h2>
                        <p>Kickstart your wellness journey with a FREE 30-minute nutrition coaching session led by our registered dietitians. From goal-setting to ingredient insights, our expert team is looking forward to answering your questions and supporting you along the way!</p>
                        <button>Book a free coaching session</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
