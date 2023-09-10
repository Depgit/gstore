import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import Button from '../ExtraTabs/Button'
import Input from '../ExtraTabs/Input'
import './auth.css'
const apiUrl = process.env.REACT_APP_API_ENDPOINT;


export default function Signup() {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Postdata = async (event) => {
        event.preventDefault();
        if (!/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            alert("wrong email addres pattern");
            return
        }
        fetch(`${apiUrl}/v1/auth/singup`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "applicaiton-type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json())
            .then(data => {
                if (!data.status) {
                    console.log(data.errors);
                    if(!data.response){
                        history('/login')
                    }
                    throw new Error(data.errors);
                } else {
                    localStorage.setItem("OtpId",(data.response.OtpId))
                    alert('Signup Successfully');
                    history('/verifyotp');
                }
            }).catch(err => {
                alert(err)
            })
    }
    return (
        <div className='container_auth'>
            <h1>Signup</h1>
            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                
               
                <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                
                <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button name="Signup" onClick={Postdata}/>
                <Button name="Already Login" onClick={() => history('/login')} />
            </form>
        </div>
    )
}