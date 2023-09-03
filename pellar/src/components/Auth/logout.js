import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
    const history = useNavigate('')
    useEffect(() => {
      localStorage.clear()
      history('/');
    }, [])
}