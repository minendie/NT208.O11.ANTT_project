import React from 'react'
import { Button } from 'antd'

interface Props {
    title: string
 
}

const WhiteButton:React.FC<Props> = ({title}) => {
    return (
       <Button shape ="round" style={{backgroundColor:'white', borderRadius:"12px" ,color:"black", padding:"4px" , margin:"4px"}}>{title}</Button>
    )
}

export default WhiteButton
