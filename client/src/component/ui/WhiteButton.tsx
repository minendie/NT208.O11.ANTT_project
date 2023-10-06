import React from 'react'
import { Button } from 'antd'

interface Props {
    title: string;
    onClick: () =>void; 
}


const WhiteButton:React.FC<Props> = ({title, onClick}) => {
    return (
       <Button shape ="round" style={{backgroundColor:'white', borderRadius:"12px" ,color:"black", padding:"4px" , margin:"4px"}} onClick={onClick}>{title}</Button>
    )
}

export default WhiteButton
