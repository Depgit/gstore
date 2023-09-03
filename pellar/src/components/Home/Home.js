import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ExtraTabs/Button';
import './home.css';
import Card from '../card/card';
import image_path from '../../assest/flower.jpeg'
function Home() {
  const history = useNavigate('');

  const cardData = [];
  for(let i=1;i<20;i++){
     cardData.push(
         { id: i, title: 'Product 1', image: `${image_path}`, price: 19.99 }
     )
  }

  return (
    <div className="container home-container">
      <div className="row">
        {cardData.map((card) => (
          <div key={card.id} className="col-lg-3 col-md-4 col-sm-6">
            <Card product={card} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
