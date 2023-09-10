import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../ExtraTabs/Button'
import Input from '../ExtraTabs/Input'
import './auth.css'
const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export default function Login() {
    const history = useNavigate('')
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');


    // useEffect(() => {
    //     let user = JSON.parse(localStorage.getItem("user"))
    //     console.log(user);
    //     if (user && user.token) {
    //         history('/sendmail');
    //     }
    // }, []);

    const Postdata = async (event) => {
      event.preventDefault()
      if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
          alert("wrong email addres pattern");
          return
      }
      fetch(`${apiUrl}/v1/auth/login`, {
          method: "post",
          headers: {
              "Content-Type": "application/json",
              "applicaiton-type": "application/json"
          },
          credentials: 'include',
          body: JSON.stringify({
              email,
              password
          })
      }).then(res => res.json())
          .then(data=>{
              if(!data.status){
                  console.log(data.errors);
                  throw new Error(data.errors)
              }
              if(data.response.OtpId){
                alert('Please verify otp');
                console.log(data);
                localStorage.setItem("OtpId",data.response.OtpId)
                history('/verifyotp')
              }else{
                    alert('Login Successfully');
                  console.log(data);
                  localStorage.setItem("user",JSON.stringify(data.response.User))
                  history('/home')
              }
          }).catch(err=>{
            alert(err)
          })
  }
      
    return (
        <div className='container_auth'>
            <h1>Login</h1>
            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button name="Login" onClick={Postdata} />
                <div >
                    <Button name="ForgetPassword" onClick={() => alert('relax and try to remember')} />
                    <Button name="Not Register" onClick={() => history('/signup')} />
                </div>
            </form>
        </div>
    )
}