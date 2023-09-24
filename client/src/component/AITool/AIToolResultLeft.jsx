import { useEffect, useState, useRef } from 'react';
import React, { Component } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';


class AIToolResultLeft extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isInfo: true,
        }
    }

    refreshPage = () => {
        window.location.reload(false);
    }

    // send data to parent node  
    changeToInfo = (event) => { 
        // event.preventDefault();
        this.props.readState({
            isInfo: true
        });
    };

    changeToRecommendations = (event) => { 
        // event.preventDefault();
        this.props.readState({
            isInfo: false
        });
    };


    render() {
        return (
            <div className='AITool-result-left'>
                <div className='AITool-result-refresh' onClick={this.refreshPage}>
                    <img src='https://greendots-aitool-server.onrender.com/image/AI_Tool_refresh.svg'/>
                    <p>Use another image</p>
                </div>
                <h1 className='AITool-result-left-title'>
                    result: {this.props.label ? this.props.label : 'undefined'}
                </h1>
                <div className='AITool-result-buttons'>
                    <button className='AITool-result-button' 
                            onClick={this.changeToInfo}
                    >
                        More Information
                    </button>
                    <button className='AITool-result-button'
                            onClick={this.changeToRecommendations}
                    >
                        Find Campaigns
                    </button>
                </div>
                <div className='AITool-result-image'>
                    <img src={`https://greendots-aitool-server.onrender.com/image/${this.props.filename}`}/>
                    {/* <img src={`http://localhost:3002/image/${this.props.filename}`}/> */}
                </div>
            </div>
        )
    }
};


export default AIToolResultLeft;