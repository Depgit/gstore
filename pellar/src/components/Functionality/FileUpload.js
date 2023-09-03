import React, { useState } from 'react';
import XMLDownloadButton from './download';
import DownloadButton from './downloadFile';
import Input from '../ExtraTabs/Input'
import Button from '../ExtraTabs/Button'
import '../ExtraTabs/Extra.css'
import './data.css'

const FileUpload = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [Error, setError] = useState(null)
  const [loading, setLoading] = useState(null)
  const styles = {
    containerStyle: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }
  };


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleFileUpload = () => {
    setLoading('blah')
    const formData = new FormData();
    formData.append('file', selectedFile);
    console.log({formData})
    fetch(props.url, {
      method: 'POST',
      body: formData,
    }).then(res => res.json())
      .then(res => {
        if (res.Error != null) {
          setError(res.Error)
        } else
          setDownloadUrl(res.Response)

      })
      .catch(error => {
        // handle error

        console.error('Error uploading file', error);
        setError(error)
      });
  };

  return (
    <div style={styles.containerStyle}>
      <DownloadButton path={props.path} name={props.name} />
      {
        !loading ?
          <>
            <Input className='glass-link' name="file" type="file" onChange={handleFileChange} />
            <Button name="Upload" onClick={handleFileUpload}/>
          </>
          : downloadUrl ? (
            <XMLDownloadButton xmlString={downloadUrl} fileName={`${String(props.name).split(".")[0]}.xml`} />)
            : 'loading'

      }
      <div>{Error && alert(Error)}</div>
    </div>
  );
};

export default FileUpload;
