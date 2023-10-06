// src/components/Form.tsx
import React, { useState } from 'react';
import './css/styles.css'
import axios from 'axios';
import {Button , Space} from 'antd';

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


function validatePassword(password: string) {
  
  // At least 3 characters, at least one uppercase letter, one lowercase letter, and one digit
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}$/;
  // test password
  if (!passwordPattern.test(password)) {
    alert('Password must be from 3-50 characters, having at least 1 digit, 1 uppercase character and 1 lowercase character.')
    return false;
  }
  return true;

}


const ParticipantProfileForm: React.FC<{ canEdit: boolean, user: any, classNames?:string }> 
                    = ({ canEdit, user, classNames }) => {
  const [username, setUsername] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);
  const [phoneNumber, setPhoneNumber] = useState(user?.PhoneNumber || '');
  const [bio, setBio] = useState(user?.Bio || '');
  const [address, setAddress] = useState(user?.Address || '');
  const [password, setPassword] = useState('');
  const [readOnly, setReadOnly] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

 
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
      setPhoneNumber(phoneNumber.trim())
      setPassword(password.trim())
      setBio(bio.trim())

      // validate password, phone number, email
      var data = {
        'phoneNumber' : '',
        'password' : '',
        userID: localStorage.getItem('userID'),
        bio: bio.replaceAll("'", "''"),
      }
      // validate phone number
      if (phoneNumber !== '' && validatePhoneNumber(phoneNumber)) {
        data['phoneNumber'] = phoneNumber;
      } 
      // confirm changing password from user
      if (password.length > 0 && validatePassword(password)) {
        if (!window.confirm('Are you sure you want to change your password?')) {
          return;
        } else {
          data['password'] = password;
        }
      }

      axios.put(`${API_ENDPOINT}/update-user`, data)
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
  
  const showPassword = () => {
      setIsChecked(!isChecked)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        <InputForm 
          htmlFor='username'
          labelValue='Username'
          placeholder= 'Type new username'
          isHidden={false}
          inputType='text'
          value={username}
          setValue={setUsername}
          isReadOnly={true}          
        />
        {canEdit && <div>
          <InputForm 
            htmlFor='password'
            labelValue='Password'
            placeholder= 'Change your password'
            isHidden={canEdit ? false : true}
            inputType={isChecked ? 'text' : 'password'}
            value={password}
            setValue={setPassword}
            isReadOnly={readOnly}
            />        
          <div className="align-right">
            <input type="checkbox" onChange={showPassword} checked={isChecked}/>
            <label className="text-sm"htmlFor='showPass' onClick={showPassword}>Show your password</label>         
          </div>
        </div>}
        <InputForm 
            htmlFor='email'
            labelValue='Email'
            placeholder= 'Type your email'
            isHidden={false}
            inputType='email'
            value={email}
            setValue={setEmail}
            isReadOnly={true}
          />
        <InputForm 
            htmlFor='address'
            labelValue='Address'
            placeholder= 'Type your address'
            isHidden={false}
            inputType='text'
            value={address}
            setValue={setAddress}
            isReadOnly={readOnly}
          />
        <InputForm 
            htmlFor='phone'
            labelValue='Phone number'
            placeholder= 'Type your phone number'
            isHidden={false}
            inputType='text'
            value={phoneNumber}
            setValue={setPhoneNumber}
            isReadOnly={readOnly}
          />
        <InputForm 
            htmlFor='bio'
            labelValue='Bio'
            placeholder= 'Write something about yourself'
            isHidden={false}
            inputType='text'
            value={bio}
            setValue={setBio}
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

export default ParticipantProfileForm;
