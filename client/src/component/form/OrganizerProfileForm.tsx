// src/components/Form.tsx
import React, { useState } from 'react';
import Autocomplete from "react-google-autocomplete";



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
    <div className="mb-4">
      <label htmlFor={props.htmlFor}>{props.labelValue}</label>
      <input
        type={props.inputType}
        placeholder={props.placeholder ? props.placeholder : 'Type in'}
        className="w-full p-2 border rounded"
        value={props.value}
        readOnly={props.isReadOnly}
        onChange={(e) => props.setValue(e.target.value)}
      />
    </div>
  }
  </>
  )
}


const OrganizerProfileForm: React.FC<{ canEdit: boolean, organizer: any, classNames?:string }> 
                                        = ({ canEdit, organizer, classNames }) => {
  const [orgName, setOrgName] = useState('Test organizer\'s name');
  const [email, setEmail] = useState('Test email');
  const [phoneNumber, setPhoneNumber] = useState('Test phone');
  const [address, setAddress] = useState('Test address');
  const [description, setDescription] = useState('Test description');
  const [fbLink, setFbLink] = useState('')
  const [linkedInLink, setLinkedInLink] = useState('')
  const [websiteLink, setWebsiteLink] = useState('')
  const [readOnly, setReadOnly] = useState(true);

 
  const handleEditing = () => {
    // Add your editing logic here
    if (canEdit) {
      setReadOnly(false)
    }
  };

  // const handleEditingAddress = () => {
  //   if (canEdit) {
  //     setAddress()
  //   }
  // }

  const handleSave = () => {
    setReadOnly(true)
    // PUT data to database
  }

  const handleCancelEditing = () => {
    if(window.confirm('Don\'t save the information? All information will be discarded.')) {
      setReadOnly(true);
      window.location.reload();
    }

  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <InputForm 
            htmlFor="orgName"
            labelValue='Organization Name'
            placeholder= 'Type new organizer name'
            isHidden={false}
            inputType="text"
            value={orgName}
            setValue={setOrgName}
            isReadOnly={readOnly}
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
        { canEdit && <Autocomplete
            apiKey={'AIzaSyAfWVFE0GMfRMDIElEooMkUttGWCt-pPS4'}
            onPlaceSelected={(place) => place.adr_address ? setAddress(place.adr_address) : console.log()}
          />}
        <InputForm 
            htmlFor="address"
            labelValue='Address'
            placeholder= "Address"
            isHidden={false}
            inputType="text"
            value= {address}
            setValue={setAddress}
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
            isHidden={fbLink === '' && readOnly ? true : false}
            inputType="text"
            value={fbLink}
            setValue={setFbLink}
            isReadOnly={readOnly}
          />
        <InputForm 
            htmlFor="linked-in-link"
            labelValue='Linked In'
            placeholder= "Type your Linked In link"
            isHidden={linkedInLink === '' && readOnly ? true : false}
            inputType="text"
            value={linkedInLink}
            setValue={setLinkedInLink}
            isReadOnly={readOnly}
          />
        <InputForm 
            htmlFor="website-link"
            labelValue="Website"
            placeholder= "Type your website link"
            isHidden={websiteLink === '' && readOnly ? true : false}
            inputType="text"
            value={websiteLink}
            setValue={setWebsiteLink}
            isReadOnly={readOnly}
          />        
        { canEdit && (<>{
              readOnly ?
                <button
                  className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  onClick={handleEditing}
                >
                  Edit Profile
                </button>
              : (
                <div className='row'>
                  <button
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    onClick={handleCancelEditing}
                  >
                    Cancel
                  </button>
                </div>
              )
        } </>)}
      </div>
    </div>
  );
};

export default OrganizerProfileForm;
