import React from 'react'
import { Button } from 'antd'

interface Props {
    title: string;
    onClick: () => void;
    
}

const CustomButton:React.FC<Props> = ({title,onClick}) => {
    return (
       <Button shape ="round" style={{backgroundColor:'#33BBC5', borderRadius:"12px" ,color:"black", padding:"4px", margin:"4px"}} onClick={onClick}>{title}</Button>
    )
}

export default CustomButton
