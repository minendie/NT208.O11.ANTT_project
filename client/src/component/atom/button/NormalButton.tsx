import { Button } from 'antd'
import React, { FC } from 'react'

interface NormalButtonProps {
    title:string
}

const NormalButton: FC<NormalButtonProps> = ({ title }) => {
    return (
        <div className="rounded-2xl">

            <Button className = "" type = "primary">{title}</Button>
        </div>
    )
}

export default NormalButton
