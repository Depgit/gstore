import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ExtraTabs/Button'
import './authPage.css'

function AuthPage() {
    const history = useNavigate('')

    
    return (
        <div className="container_home">
            <h1>Welcome to SD TALLY Automation!</h1>
            <div >
                <Button name="Login" onClick={() => history('/login')} />
                <Button name="Signup" onClick={() => history('/signup')}/>
            </div>
        </div>
    );
}

export default AuthPage;
