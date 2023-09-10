import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ExtraTabs/Button';
import Input from '../ExtraTabs/Input';
import './addProduct.css';

const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export default function AddProduct() {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    vendor: '',
    price:0
  });
  const [selectedFile, setSelectedFile] = useState(null)

  const { title, description, url, vendor, image,price } = formData;


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const Postdata = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('url', url);
    data.append('vendor', vendor);
    data.append('price',price);
    if (selectedFile) {
      data.append('product_image', selectedFile);
    }
    console.log(selectedFile);
    fetch(`${apiUrl}/v1/admin/add/product`, {
      method: 'post',
      credentials: 'include',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.status) {
          console.log(data.errors);
          throw new Error(data.errors);
        } else {
          alert('AddProduct Successfully');
          console.log({data});
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="container_auth">
      <h1>AddProduct</h1>
      <form className="add-product-form" onSubmit={Postdata} encType="multipart/form-data">
        <div>
        <Input
          name="title"
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e)=> setFormData({
            ...formData,
            title: e.target.value
          })}
        />
        </div>
        <div>
        <Input
          name="description"
          placeholder="Description"
          type="text"
          value={description}
          onChange={(e)=> setFormData({
            ...formData,
            description:  e.target.value
          })}
        />
        </div>
        <div>
        <Input
          name="url"
          placeholder="URL"
          type="text"
          value={url}
          onChange={(e)=> setFormData({
            ...formData,
            url: e.target.value
          })}
        />
        </div>
        <div>
        <Input
          name="vendor"
          placeholder="Vendor"
          type="text"
          value={vendor}
          onChange={(e)=> setFormData({
            ...formData,
            vendor: e.target.value
          })}
        />
        </div>
        <div>
        <Input
          name="price"
          placeholder="Price"
          type="text"
          value={price}
          onChange={(e)=> setFormData({
            ...formData,
            price: e.target.value
          })}
        />
        </div>
        <div>
        <Input className='glass-link' name="file" type="file" onChange={handleFileChange} />
        </div>

        <Button name="AddProduct" type="submit"/>
        {/* <button type='submit'>AddProduct</button> */}
        {/* <Button name="Already Login" onClick={() => history('/login')} /> */}
      </form>
    </div>
  );
}
