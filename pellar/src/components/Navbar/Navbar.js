import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../ExtraTabs/Input'
import Button from '../ExtraTabs/Button'
import '../ExtraTabs/Extra.css'

export default function Navbar() {
    const history = useNavigate('')

    return (
        <>
            {
                <nav class="">
                <nav class="navbar navbar-expand-lg  bg-body-tertiary">
                    <div class="container-fluid ">
                        <Button name="Home" onClick={() => history('/data')} />
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <Button name="About" onClick={() => history('/about')} />
                                </li>
                                <li class="nav-item">
                                    <Button name="Payment" onClick={() => history('/payment')} />
                                </li>
                                <li class="nav-item">
                                    <Button name="Profile" onClick={() => history('/profile')} />
                                </li>
                            </ul>
                            <form class="d-flex" role="search">
                                {/* <Input name="search" placeholder="Search"  /> */}
                                <Button name="Logout" onClick={() => history('/logout')} />
                            </form>
                        </div>
                    </div>
                </nav>
                </nav>
            }
        </>
    )

}
