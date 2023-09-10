import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../ExtraTabs/Input'
import Button from '../ExtraTabs/Button'
import './auth.css'
const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export default function Verifyotp() {
    const history = useNavigate('')
    const [otp, setOtp] = useState('');

    const Postdata = async (event) => {
        event.preventDefault();
        let otpId = localStorage.getItem("OtpId")
        console.log(otpId,otp);
        fetch(`${apiUrl}/v1/auth/otp/validate`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "applicaiton-type": "application/json"
            },
            body: JSON.stringify({
                OtpId: otpId,
                otp: otp
            })
        }).then(res => res.json())
            .then(data => {
                if (!data.status) {
                    console.log(data);
                    alert(data.errors);

                } else {
                    alert('user verified');
                    history('/login');
                }
            }).catch(err => {
                console.log(err);
                alert(err)
            })
    }
    return (
        <div className='container_auth'>
            <h1>Enter Otp</h1>
            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                <Input placeholder="otp" value={otp} onChange={(e) => setOtp(e.target.value)} />
                <Button name="Send" onClick={Postdata} />
            </form>
        </div>
    )
}