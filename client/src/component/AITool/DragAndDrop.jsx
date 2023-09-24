import { useEffect, useState, useRef } from 'react';
import React, { Component } from 'react';
import axios from 'axios';

// chua xong tinh nang drag anh vao

const API_ENDPOINT = 'https://greendots-aitool-server.onrender.com/upload';
// const API_ENDPOINT = process.env.REACT_APP_AITOOL_API_ENDPOINT ? process.env.REACT_APP_AITOOL_API_ENDPOINT : 'http://localhost:3002/upload'


class DragDropFile extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
          filename: '',
          prediction: '', 
          dragActive: false,
        };

        this.inputRef = React.createRef(null);
  
        this.handleUpload = this.handleUpload.bind(this);
    }

    // handle drag events
    // handleDrag = (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     if (e.type === "dragenter" || e.type === "dragover") {
    //         this.setState({
    //             dragActive: true 
    //         });
    //     } else if (e.type === "dragleave") {
    //         this.setState({
    //             dragActive: false
    //         });
    //     }
    // };


    // triggers when file is dropped
    // handleDrop = (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     this.setState({
    //         dragActive: false
    //     });
    //     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    //         handleFiles(e.dataTransfer.files);
    //         console.log(e)
    //     }
    // };

    // handleDragOver = (event) => {
    //     event.preventDefault();
    // };
  

    // // chua xong drop file
    // handleDrop = (event) => {
    //   event.preventDefault();
    //   console.log(event.target.files)
    // };
    
    // send files to the server
    handleUpload = (event) => {
        const data = new FormData();
        try {
            data.append('file', event.target.files[0]);
            axios.post(API_ENDPOINT, 
                data,)
            .then((res) => {
                this.sendData({
                    filename: res.data.filename,
                    prediction: res.data.prediction,
                })
                // console.log(res)
            });
        } catch (err) {
            alert(err);
        }
    };
  
    // send data to parent node via sendData callback
    sendData = (data) => {
        this.props.sendData({
            filename: data.filename,
            prediction: data.prediction
        });
    }

    // if (files) {
        // console.log(files)
        // const data = new FormData();
        // data.append('file', files[0]);
        // axios.post(API_ENDPOINT, data)
        // .then((res) => {
        //     this.setState({ 
        //     filename: res.data.filename
        //     });
        //     console.log(res)
        // });
    // }
    render() {
        return (
          <>
            <div 
                className="dropzone"
                onDragEnter={this.handleDrag} 
                onDragLeave={this.handleDrag} 
                onDragOver={this.handleDrag} 
                onDrop={this.handleDrop}
            ><div/>
                <h1>Drop an image</h1>
                <h1>Or</h1>
                <input type="file" 
                       name="file" 
                       onChange={this.handleUpload}
                       accept='image/png, image/jpeg, image.bmp'
                />
            </div>
          </>
        );
        }
  };
  

export default DragDropFile;
