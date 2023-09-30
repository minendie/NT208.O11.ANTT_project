import React from 'react'
import { Button } from 'antd'

interface Props {
    title: string
    
}

const CustomButton:React.FC<Props> = ({title}) => {
    return (
       <Button shape ="round" style={{backgroundColor:'#33BBC5', borderRadius:"12px" ,color:"black", padding:"4px"}}>{title}</Button>
    )
}

export default CustomButton
