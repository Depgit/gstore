import React, { useContext, useState, useEffect, useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../ExtraTabs/Input'
import Button from '../ExtraTabs/Button'
import './auth.css'

export default function Verifymail() {
    const history = useNavigate('')
    const [code, setCode] = useState('');

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
        fetch('/v1/user/verifymail', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "applicaiton-type": "application/json"
            },
            body: JSON.stringify({
                code,
            })
        }).then(res => res.json())
            .then(data => {
                if (data.Status===400) {
                    console.log(data.Error);
                    alert(data.Error);
                } else {
                    alert('Succesfully email verified');
                    localStorage.setItem("user", JSON.stringify(data.Response))
                    history('/data');
                }
            }).catch(err => {
                console.log(err);
                alert(err)
            })
    }
    return (
        <div className='container_auth'>
            <h1>code</h1>
            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                <Input placeholder="Code" type="text" value={code} onChange={(e) => setCode(e.target.value)} style={{ marginBottom: '10px' }} />
                <Button name="Send" onClick={Postdata} />
            </form>
        </div>
    )
}