import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ExtraTabs/Button';
import './home.css';
import Card from '../card/card';
const apiUrl = process.env.REACT_APP_API_ENDPOINT;

function Home() {
  const history = useNavigate('');
  const [cardData, setCardData] = useState([])

  useEffect(() => {
    fetch(`${apiUrl}/v1/get/product`, {
      method: "get",
      headers: {
          "Content-Type": "application/json",
          "applicaiton-type": "application/json"
      }
  }).then(res => res.json())
      .then(data=>{
          if(!data.status){
              console.log(data.errors);
              throw new Error(data.errors)
          }
          setCardData(data.response.Product)
        }).catch(err=>{
          alert(err)
        })
        
      }, [])
  console.log({cardData});
  

  return (
    <div className="container home-container">
      <div className="row">
        {cardData.map((card) => (
          <div key={card._id} className="col-lg-3 col-md-4 col-sm-6">
            <Card product={card} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
