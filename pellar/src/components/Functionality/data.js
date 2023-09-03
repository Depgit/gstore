import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import FileUpload from './FileUpload';
import './data.css'
const voucher_path = 'https://res.cloudinary.com/depimage/raw/upload/v1678641893/Other_Entries.xlsx'
const bank_path = 'https://res.cloudinary.com/depimage/raw/upload/v1687890470/bank.xlsx'
const master_ledger = 'https://res.cloudinary.com/depimage/raw/upload/v1681822446/master_ledger.xlsx'
const purchase_path = 'https://res.cloudinary.com/depimage/raw/upload/v1687889468/purchase.xlsx'
const sale_path = 'https://res.cloudinary.com/depimage/raw/upload/v1687891337/sale.xlsx'
const bank_ledger = 'https://res.cloudinary.com/depimage/raw/upload/v1688150069/bank_ledger.xlsm'

function Data() {

  return (
    <>
      <Navbar />
      <div className='container_data'>
        <div >
          <FileUpload key="1" url="/v1/upload/ledger"  path={master_ledger} name="Master Ledger.xlsx   " />
          <FileUpload key="2" url="/v1/upload/bank"    path={bank_path}     name="bank Entries.xlsx    " />
          <FileUpload key="3" url="/v1/upload/voucher" path={purchase_path}  name="Purchase Entries.xlsx" />
          <FileUpload key="4" url="/v1/upload/voucher" path={sale_path}  name="Sales Entries.xlsx   " />
          <FileUpload key="5" url="/v1/upload/voucher" path={voucher_path}  name="Journal Entries.xlsx " />
          <FileUpload key="6" url="/v1/upload/bank_ledger"    path={bank_ledger}     name="bank Ledger.xlsx    " />
        </div>
        <div className='backgroundCenter'></div>
      </div>
    </>
  );
}

export default Data;