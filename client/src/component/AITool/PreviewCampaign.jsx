import React from "react";
import { Button } from "./Button";
import { ElementTrashTag } from "./ElementTrashTag";
// import "./styles.css";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

export const PreviewCampaign = ({ data }) => {
    return (
        <div className="preview-campaign">
            <div className="preview-campaign-component">
                <div className="header">
                    <div className="div">
                        <div className="text-wrapper">{data['CampaignName'] ? data['CampaignName'] : 'Campaign name'}</div>
                    </div>
                    <div className="buttons">
                        <Button
                            className="button-primary-instance"
                            labelClassName="design-preview-campaign-component-instance-node"
                            text="↳"
                        />
                    </div>
                </div>
                <div className="frame">
                    <p className="p">
                        <span className="span">Address: </span>
                        <span className="text-wrapper-3">
                            {
                                data['Address'] 
                                ? data['Address'] 
                                : 'Street, Ward, District, Province, Country'
                            }
                        </span>
                    </p>
                </div>
                <div className="frame">
                    <p className="time">
                        <span className="span">Time: </span>
                        <span className="text-wrapper-3">
                            from {
                                data['StartDate'] 
                                ? data['StartDate'] 
                                : '17/6/2023'
                            } to {
                                data['EndDate'] 
                                ? data['EndDate'] 
                                : '17/10/2023'
                            }                            
                        </span>
                    </p>
                </div>
                <div className="frame">
                    <p className="p">
                        <span className="span">Working hour: </span>
                        <span className="text-wrapper-3">
                            {
                                data['WorkingHour'] 
                                ? data['WorkingHour'] 
                                : '13:00 - 15:00'
                            }
                        </span>
                    </p>
                </div>
                <div className="frame">
                    <p className="gift-s">
                        <span className="span">Gift(s): </span>
                        <span className="text-wrapper-3"> 
                            {
                                data['Description'] 
                                ? data['Description'].split('\n Gifts: ')[1]
                                : 'Notebooks and pen'
                            }
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

