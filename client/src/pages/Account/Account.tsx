import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountComponent from '../../components/Registration/AccountComponent/AccountComponent';
import { useUserContext } from "../../context/UserContext";
import './Account.css';

const Account: React.FC = () => {
    const { user } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div className='Account'>
            {user && <AccountComponent />}
        </div>
    );
}

export default Account;