import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import Banner from '../assets/banner.png';
import { useUserContext } from "../context/UserContext";

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrollDirection, setScrollDirection] = useState("up");

    const { user, token, updateUser, logOut, register } = useUserContext();

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const updateScrollDirection = () => {
            const scrollY = window.scrollY;
            if (scrollY > lastScrollY && scrollDirection !== "down") {
                setScrollDirection("down");
            } else if (scrollY < lastScrollY && scrollDirection !== "up") {
                setScrollDirection("up");
            }
            lastScrollY = scrollY > 0 ? scrollY : 0;
        };

        window.addEventListener("scroll", updateScrollDirection);
        return () => window.removeEventListener("scroll", updateScrollDirection);
    }, [scrollDirection]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='header-container'>
            <NavLink to="/" className="header-link">
                <img className='header-banner' src={Banner} alt="chef's choice logo" />
            </NavLink>
            <div className='header-links'>
                <NavLink to="/" className="header-link">Home</NavLink>
                <NavLink to="/about" className="header-link">About Us</NavLink>
                <NavLink to="/menu" className="header-link">Weekly Menu</NavLink>
                <NavLink to="/" className="header-link">Plans</NavLink>
                <NavLink to="/faq" className="header-link">FAQ</NavLink>
            </div>
            {user ? (
                <div className='user-header-auth'>
                    <NavLink to="/account" className="header-link"><span>{user.name}<br/>Account</span></NavLink>
                    <button onClick={logOut} className="logout-header-button">Log Out</button>
                </div>
            ) : (
                <div className='header-auth'>
                    <NavLink to="/login" className="header-link">Login</NavLink>
                    <NavLink to="/registration">
                        <button className='header-sign-up'>Sign Up</button>
                    </NavLink>
                </div>
            )}
            <button
                className={`hamburger-menu ${scrollDirection === "down" ? "hidden" : "visible"}`}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </button>
            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                <NavLink to="/" className="header-link mobile" onClick={() => setMenuOpen(false)}>Home</NavLink>
                <NavLink to="/about" className="header-link mobile" onClick={() => setMenuOpen(false)}>About Us</NavLink>
                <NavLink to="/menu" className="header-link mobile" onClick={() => setMenuOpen(false)}>Weekly Menu</NavLink>
                <NavLink to="/" className="header-link mobile" onClick={() => setMenuOpen(false)}>Plans</NavLink>
                <NavLink to="/faq" className="header-link mobile" onClick={() => setMenuOpen(false)}>FAQ</NavLink>

                {user ? (
                    <div className='mobile-header-auth'>
                        <NavLink to="/account" className="header-link mobile">{user.name}</NavLink>
                        <button onClick={logOut} className="logout-header-button">Log Out</button>
                    </div>
                ) : (
                    <div className='mobile-header-auth'>
                        <NavLink to="/login" className="header-link mobile" onClick={() => setMenuOpen(false)}>Login</NavLink>
                        <NavLink to="/registration" className="header-link mobile" onClick={() => setMenuOpen(false)}>
                            <button className='header-sign-up mobile'>Sign Up</button>
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
