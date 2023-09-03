import React from 'react';
import Input from '../ExtraTabs/Input'
import Button from '../ExtraTabs/Button'

const XMLDownloadButton = ({ xmlString, fileName }) => {
  const handleDownload = (event) => {
    event.preventDefault();
    const blob = new Blob([xmlString], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Button name="download" onClick={handleDownload} />
  );
};

export default XMLDownloadButton;
