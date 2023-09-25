import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const API_ENDPOINT = 'https://greendots-aitool-server.onrender.com/upload';

const DropZone = ({ sendData }) => {

    let [hasFile, setHasFile] = useState(false);
    let [filename, setFilename] = useState('');

    // send files to the server
    function handleUpload(event) {

        const file = event[0];
        
        // guard
        if ( typeof file === 'undefined' ) {
            alert('Invalid file. Please try again');
            return;
        };

        setFilename(file.name);
        setHasFile(true);

        const data = new FormData();
        
        data.append('file', file);
        axios.post(API_ENDPOINT, data,)
        .then((res) => {
            sendData({
                filename: res.data.filename,
                prediction: res.data.prediction,
            })
        })
        .catch((err) => {
            alert(err);
            window.location.reload(false);
        });
    };

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        accept: {
            'image/png': ['.png', '.PNG'],
            'image/jpeg': ['.jpg', '.jpeg', '.JPG', '.JPEG']
        },
        onDrop: handleUpload,
        onChange: handleUpload,
        multiple: false, // not allow multiple files 
    });

    return (
        <div className='dropzone' {...getRootProps()}>
        {
            hasFile
            ? (<h1>Processing {filename} .............</h1>) 
            : (
                <>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                        <p>Drop your image here ...</p> :
                        <p>Drag and drop your image here, or click to select an image</p>
                    }
                </>
            )
        }
        </div>
    )
};

export default DropZone;