// src/components/Form.tsx
import React, { useState } from 'react';
import './css/styles.css'
import axios from 'axios';
import { Button , Space} from 'antd';

interface FormProps {
    htmlFor: string,
    labelValue: string,
    placeholder?: string,
    isHidden: boolean,
    inputType: string,
    value: string,
    setValue: (params?: any) => any,
    isReadOnly: boolean,
}


const InputForm = (props: FormProps) => {
  return ( 
  <>
  {
    !props.isHidden && 
    <div className="mb-4 align-left">
      <div className="align-left" > 
      <label htmlFor={props.htmlFor}>{props.labelValue}</label>
      <input
        type={props.inputType}
        placeholder={props.placeholder ? props.placeholder : 'Type in'}
        className="w-full p-2 border rounded"
        value={props.value || ''}
        readOnly={props.isReadOnly}
        onChange={(e) => props.setValue(e.target.value)}
      />
      </div>
    </div>
  }
  </>
  )
}

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;


function validatePhoneNumber(phoneNumber: string) {
  const phoneNumberPattern = /^(\+\d{1,3}\s?)?(\(\d{1,3}\)\s?)?\d{10,14}$/

  // test phone number
  if (!phoneNumberPattern.test(phoneNumber)) {
    alert('Please check your phone number again.')
    return false;
  }

  return true;
}


const OrganizerProfileForm: React.FC<{ canEdit: boolean, organizer: any, classNames?:string }> 
                                        = ({ canEdit, organizer, classNames }) => {
  const [orgName, setOrgName] = useState(organizer?.Name  );
  const [email, setEmail] = useState(organizer?.Email );
  const [phoneNumber, setPhoneNumber] = useState(organizer?.PhoneNumber );
  const [address, setAddress] = useState(organizer?.Address);
  const [description, setDescription] = useState(organizer?.Description);
  const [fbLink, setFbLink] = useState(organizer?.fbLink )
  const [linkedInLink, setLinkedInLink] = useState(organizer?.linkedInLink )
  const [websiteLink, setWebsiteLink] = useState(organizer?.websiteLink )
  const [readOnly, setReadOnly] = useState(true);

 
  const handleEditing = () => {
    // Add your editing logic here
    if (canEdit) {
      setReadOnly(false)
    }
  };

  const handleSave = () => {
    setReadOnly(true)
    // PUT data to database
    if (canEdit) {
      setPhoneNumber(phoneNumber.trim());
      setOrgName(orgName.trim());
      setDescription(description.trim());
      setAddress(address.trim());
      setEmail(email.trim())
      setFbLink(fbLink.trim())
      setLinkedInLink(linkedInLink.trim())
      setWebsiteLink(websiteLink.trim())
      
      // validate password, phone number, email
      var data = {
        'phoneNumber' : '',

        
        organizerID: localStorage.getItem('organizerID'),
        description: description.replaceAll("'", "''"),
        address: address.replaceAll("'", "''"),
      }
      // validate phone number
      if (phoneNumber !== '' && validatePhoneNumber(phoneNumber)) {
        data['phoneNumber'] = phoneNumber;
      } 
      
      

      axios.put(`${API_ENDPOINT}/update-organizer`, data)
        .then((res) => {
          alert('Your information is editted successfully.')
        })
        .catch()
    }
  }

  const handleCancelEditing = () => {
    if(window.confirm('Don\'t save the information? All information will be discarded.')) {
      setReadOnly(true);
      window.location.reload();
    }

  }
  console.log({organizer});
  // console.log({org})


  return (
         
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md w-96"> 
    <h2 className="text-2xl font-semibold mb-4">Profile</h2>
    
      <InputForm 
        htmlFor="orgName"
        labelValue='Organization Name'
        placeholder= 'Type new organizer name'
        isHidden={false}
        inputType="text"
        value={orgName}
        setValue={setOrgName}
        isReadOnly={true}
        /> 
        
          <InputForm 
            htmlFor="description"
            labelValue='Description'
            placeholder= "Email"
            isHidden={false}
            inputType="text"
            value={description}
            setValue={setDescription}
            isReadOnly={readOnly}
          />
              
       
        <InputForm 
            htmlFor="email"
            labelValue='Email'
            placeholder= "Email"
            isHidden={false}
            inputType="email"
            value={email}
            setValue={setEmail}
            isReadOnly={readOnly}
          />
          <InputForm 
            htmlFor="phone"
            labelValue='Phone number'
            placeholder= "Phone number"
            isHidden={false}
            inputType="text"
            value={phoneNumber}
            setValue={setPhoneNumber}
            isReadOnly={readOnly}
          />
        
          <InputForm 
            htmlFor="fb-link"
            labelValue='Facebook'
            placeholder= "Type in your Facebook link"
            isHidden={!canEdit}
            inputType="text"
            value={fbLink}
            setValue={setFbLink}
            isReadOnly={readOnly}
          />
       
        
          <InputForm 
            htmlFor="linked-in-link"
            labelValue='Linked In'
            placeholder= "Type your Linked In link"
            isHidden={!canEdit}
            inputType="text"
            value={linkedInLink}
            setValue={setLinkedInLink}
            isReadOnly={readOnly}
          />
        
          <InputForm 
            htmlFor="website-link"
            labelValue="Website"
            placeholder= "Type your website link"
            isHidden={!canEdit}
            inputType="text"
            value={websiteLink}
            setValue={setWebsiteLink}
            isReadOnly={readOnly}
          /> 
          
       
          { canEdit && (<>{
            readOnly  ?
            <Button className="custom-button-color" shape='round' type="text" onClick={handleEditing}>Edit</Button>                  
            : (
              <div className='row'>
                <Button className="custom-button-color" shape='round' type="text" onClick={handleSave}>Save</Button>
                <Space> <Space ><Space></Space></Space></Space>
                <Button className="custom-button-color" shape='round' type="text" onClick={handleCancelEditing}>Cancel</Button>
              </div>
            )
        }</>)}
        </div>
        </div> 
   
        
        
  );
};

export default OrganizerProfileForm;
