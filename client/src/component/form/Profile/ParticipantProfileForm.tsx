// src/components/Form.tsx
import React, { useState } from 'react';
import '../Profile/css/styles.css'
import { Input, Button , Space, ConfigProvider, Divider} from 'antd';

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
        value={props.value}
        readOnly={props.isReadOnly}
        onChange={(e) => props.setValue(e.target.value)}
      />
      </div>
    </div>
  }
  </>
  )
}




const ParticipantProfileForm: React.FC<{ canEdit: boolean, user: any, classNames?:string }> 
                    = ({ canEdit, user, classNames }) => {
  const [username, setUsername] = useState('Test username');
  const [email, setEmail] = useState('Test email');
  const [phoneNumber, setPhoneNumber] = useState('Test phone');
  const [bio, setBio] = useState('Test bio');
  const [address, setAddress] = useState('Test address');
  const [password, setPassword] = useState('Test password');
  const [readOnly, setReadOnly] = useState(true);
  const [passwordType, setPasswordType] = useState('password');
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
  }
  

  const handleCancelEditing = () => {
    if(window.confirm('Don\'t save the information? All information will be discarded.')) {
      setReadOnly(true);
      window.location.reload();
    }
  }
  
  const showPassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      setIsChecked(true)
    } 
    else {
      setPasswordType('password');
      setIsChecked(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        
        
        <InputForm 
          htmlFor='username'
          labelValue='UserName'
          placeholder= 'Type new username'
          isHidden={false}
          inputType='text'
          value={username}
          setValue={setUsername}
          isReadOnly={readOnly}
          
        />
        
        
          <InputForm 
            htmlFor='password'
            labelValue='Password'
            placeholder= 'Password'
            isHidden={false}
            inputType={passwordType}
            value={password}
            setValue={setPassword}
            isReadOnly={readOnly}
          />        
         
          <div className="align-right">
          <input type="checkbox" onChange={showPassword} checked={isChecked}/>
          <label class="text-sm ..."htmlFor='showPass' onClick={showPassword}>Show your password</label>         
          </div>

        <InputForm 
            htmlFor='email'
            labelValue='Email'
            placeholder= 'Type your email'
            isHidden={false}
            inputType='email'
            value={email}
            setValue={setEmail}
            isReadOnly={readOnly}
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
                <Button className="custom-button-color" shape='round' type="text" onClick={handleEditing}> Edit</Button>                  
                : (
                  <div className='row'>
                    <Button className="custom-button-color" shape='round' type="text" onClick={handleSave}> Save</Button>
                    <Space> <Space ><Space></Space></Space></Space>
                    <Button className="custom-button-color" shape='round' type="text" onClick={handleCancelEditing}> Cancle</Button>
                    
                  </div>
                )
        }</>)}

      
        
      </div>
    </div>
  );
};

export default ParticipantProfileForm;
