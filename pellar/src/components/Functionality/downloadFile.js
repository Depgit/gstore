import React from 'react';
import Input from '../ExtraTabs/Input'
import Button from '../ExtraTabs/Button'

function DownloadButton(props) {
  const handleDownload = (e) => {
    e.preventDefault();
    const url = props.path; // Replace with the URL of the file you want to download
    const a = document.createElement('a');
    a.href = url;
    a.download = props.name; // Replace with the desired name for the downloaded file
    a.click();
  };

  return (
    <Button name={props.name} onClick={handleDownload}/>
  );
}

export default DownloadButton;
