import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../ExtraTabs/Input'
import Button from '../ExtraTabs/Button'
import './auth.css'

export default function SendEmail() {
    const history = useNavigate('')
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetch("/v1/user/is_email_verify", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "applicaiton-type": "application/json"
            },
        }).then(res => res.json())
            .then(data => {
                console.log({data});
                if (data.Error) {
                    console.log({data});
                    throw new Error(data.Error)
                } else {
                    console.log({data});
                    if(data.Response){
                        history('/data')
                    }
                }
            }).catch(err => {
                console.log(err);
                alert(err.toString())
            })
    },[]);


    const Postdata = async (event) => {
        event.preventDefault();
        if (!/^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            alert("wrong email addres pattern");
            return
        }
        fetch('/v1/user/sendmail', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "applicaiton-type": "application/json"
            },
            body: JSON.stringify({
                email,
            })
        }).then(res => res.json())
            .then(data => {
                if (data.Status===400) {
                    console.log(data.Error);
                    alert(data.Error);
                } else {
                    alert('Sended email check your inbox ');
                    localStorage.setItem("user", JSON.stringify(data.Response))
                    history('/verifymail');
                }
            }).catch(err => {
                console.log(err);
                alert(err)
            })
    }
    return (
        <div className='container_auth'>
            <h1>Verify Email</h1>
            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Button name="Send" onClick={Postdata} />
            </form>
        </div>
    )
}