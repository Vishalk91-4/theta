import React from 'react'
import './Footer.css'
import banner from '../assets/banner.png'
import facebookIcon from '../assets/FacebookLogo.png'
import mailIcon from '../assets/EnvelopeSimple.png'
import twitterIcon from '../assets/TwitterLogo.png'
import footerLogo from '../assets/footerLogo.png'

const Footer: React.FC = () => {
    // Function to scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // for smoothly scrolling
        });
    };

    return (
        <>
            <div className='footer-container'>
                <div className='footer-logo'>
                    {/* <img className='banner' src={banner} alt='logo' /> */}
                    <a href="/faq">Help Using this Website</a>
                    <img className='ft-logo' src={footerLogo} alt='chefs choice logo' />
                </div>
                <div className='footer-website'>
                    <a href="/">Home</a>
                    <a href="/about">About Us</a>
                    <a href="/menu">Weekly Menu</a>
                    <a href="/">Plans</a>
                    <a href="/faq">FAQ</a>
                </div>
                <div className='footer-social'>
                    <button onClick={scrollToTop} className="back-to-top">Back to the top ↑</button>
                    <a href="mailto:example@example.com"><img src={mailIcon} alt="Email" />Mail Us</a>
                    <a href="https://www.facebook.com/"><img src={facebookIcon} alt="Facebook" />Follow us on Facebook</a>
                    <a href="https://www.twitter.com/"><img src={twitterIcon} alt="Twitter" />Follow us on Twitter</a>
                </div>
            </div>
        </>
    );
}

export default Footer
