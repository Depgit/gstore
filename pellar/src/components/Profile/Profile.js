import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './profile.css';
import { Link } from 'react-router-dom';
import { urlencoded } from 'body-parser';

export default function Profile() {
  const [user, setUser] = useState();
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    const curUser = JSON.parse(localStorage.getItem('user'));
    setUser(curUser);
    setAmount(null);
    
  }, []);

  const handleCheckout = () => {
    window.location.href = amount.receipt_url;
  };
  
  let avatar = "https://res.cloudinary.com/depimage/image/upload/v1678642770/sdtally_automation_bmcbio.jpg"

  return (
    <>
      <Navbar />
      {user ? (
        <div className="profile-container">
          <div className="profile-card">
            <div className="glassmorphism">
              <div className="user-details">
                <img className="avatar" src={avatar} alt="User avatar" />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <p>{amount===null ? "Not Paid" : <Link to={amount.receipt_url}>View Receipt {(amount.amount)/100}</Link>}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
