import React, { Component } from 'react';
import { PreviewCampaign } from './PreviewCampaign';
import { Button } from "./Button";
import './styles.css';

class AIToolResultRight extends Component {

    constructor(props) {
        super(props);
    };

    render(){
        return (
            <div className='AITool-result-right'>
                {
                    this.props.isInfo 
                    ? (
                      <>
                        <h1 className='AITool-result-right-title'>{this.props.prediction.name}'s Information</h1>
                        <hr style={{
                          color: 'grey',
                          backgroundColor: 'grey',
                          height: '3px',
                          width: '100%',
                        }}/>
                        <div className="AITool-result-right-info">
                          <div className="AITool-result-right-info-desc">
                            <h2 className='AITool-result-right-info-h2'>Description</h2>
                            <p>{this.props.prediction.description}</p>
                          </div>
                          <div className="AITool-result-right-info-recycling">
                            <h2 className='AITool-result-right-info-h2'>Recycling methods</h2>
                            {/* {
                              !this.props.prediction.recyclingMethods.isEmpty() 
                              ? (
                                <ul>
                                  {
                                    Object.entries(this.props.prediction.recyclingMethods)
                                          .map(([method, desc]) => <li><strong>{method}: </strong>{desc}</li>)
                                  }
                                </ul>
                              )
                              : (
                                <ul>
                                  <li><strong>Method: </strong>Lorem ipsum</li>
                                  <li><strong>Method: </strong>Lorem ipsum</li>
                                  <li><strong>Method: </strong>Lorem ipsum</li>
                                </ul>
                              )
                            } */}
                            <ul>
                              <li className='AITool-result-right-info-method'><strong>Method: </strong>Lorem ipsum</li>
                              <li className='AITool-result-right-info-method'><strong>Method: </strong>Lorem ipsum</li>
                              <li className='AITool-result-right-info-method'><strong>Method: </strong>Lorem ipsum</li>
                            </ul>
                          </div>
                          <div className="AITool-result-right-info-images">
                            <h2 className='AITool-result-right-info-h2'>Images</h2>
                            <div className="AITool-result-right-info-image-list">

                            </div>

                          </div>
                        </div>
                      </>
                    )
                    : (
                        <>
                          <h1 className='AITool-result-right-title'>
                              Recommended locations
                          </h1>
                          <div className='AITool-result-recommended-list'>
                            <PreviewCampaign data=''/>
                            <PreviewCampaign data=''/>
                            <PreviewCampaign data=''/>
                          </div>
                          <Button className='AITool-result-right-viewall-btn' text='View all on map'/>
                        </>
                    )
                }
            </div>
          )}

};

export default AIToolResultRight;