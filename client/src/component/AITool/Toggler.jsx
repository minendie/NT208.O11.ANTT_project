import React, { useState, useEffect, useRef } from "react";
import { PreviewCampaign } from './PreviewCampaign';


const API_ENDPOINT = 'https://caring-moose-plainly.ngrok-free.app'
// const API_ENDPOINT = 'http://localhost:3002/upload';

const tempItems = [
    {
        id: 1,
        name: "Blister pack",
        description: "This is description 1",
    },
    {
        id: 2,
        name: "Blister pack 2",
        description: "This is description 2",
    },
    {
        id: 3,
        name: "Blister pack 3",
        description: "This is description 3",
    },
    {
        id: 4,
        name: "Blister pack 4",
        description: "This is description 4",
    },
  ];

function Toggler({ data, title, isInfo }) {

    const [isOpen, setIsOpen] = useState({});
    const [trashInfo, setTrashInfo] = useState({});
    const [trashLocations, setTrashLocations] = useState({});


    // set open state for each item
    const toggleOpen = (name) => {
      setIsOpen({
        ...isOpen,
        [name]: !isOpen[name],
      });
    };


    // fetch data from database
    function getInfo(tagID) {
        
        if (!isOpen[tagID]) {
            // useEffect(() => {
            //     axios.get(`${baseURL}/trash-info/`).then((response) => {
            //         setTrashInfo(response.data);
            //     });
            // }, [])
            setTrashInfo({
                ...trashInfo,
                [tagID]: tempItems[tagID%4]
            }) // end fetching data
        } // end if
    } // end getInfo


    function getLocations(tagID) {

        if (!trashLocations[tagID]){
            
            // useEffect(() => {
            //     axios.get(`${baseURL}/trash-locations/`).then((response) => {
            //         setTrashInfo(response.data);
            //     });
            // }, tempItems)
            setTrashLocations({
                ...trashLocations,
                [tagID]: [{
                        avatar: '',
                        name: 'Test campaign name',
                        address: 'Test address',
                    }, {
                        avatar: '',
                        name: 'Test campaign name',
                        address: 'Test address',
                    },
                ]
            }) // end fetching locations
        } // end if
        console.log(trashLocations)
    } // end getLocations


    return (
      <div className="Toggler">
        <h1 className='AITool-result-right-title'>{title}</h1>
        <ul className='AITool-result-recommended-list'>
          {data.map((d) => {
            return (
              <li key={d.id} className='AITool-result-right-toggle-item'>
                <button
                    className="AITool-result-toggle-title"
                    onClick={() => {
                    toggleOpen(d.id);
                    isInfo ? getInfo(d.id) : getLocations(d.id);
                  }}
                >
                  {d.name} {isOpen[d.id] ? '-' : '+'}
                </button>
                { 
                    isInfo 
                    ? <>{ isOpen[d.id] && <p>{trashInfo[d.id].description}</p> }</> 
                    :
                    <>
                        {isOpen[d.id] && (
                            <div>{
                                trashLocations[d.id].map((locData, index) => <PreviewCampaign data={locData}/>)
                            }</div>
                        )}
                    </>
                }
              </li>
            );
          })}
        </ul>
      </div>
    );
}


export default Toggler;