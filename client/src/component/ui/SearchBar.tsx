import { Combobox, ComboboxInput } from '@reach/combobox'
import { Input } from 'antd'
import React from 'react'

interface Props {
    
}

const SearchBar = (props: Props) => {
    return (
       <Combobox>
        <ComboboxInput type ="text" placeholder="Search"></ComboboxInput>
       </Combobox>
    )
}

export default SearchBar
