import React, {useState}from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import useHttp from './../../hooks/http.hook'

export default function AutocompleteDeliveryAddress(props) {
    const {request} = useHttp()
    const [inputValue, setInputValue] = useState("")
    const [options, SetOptions] = useState([])

    const AddressDeliveryHandler = async(newInputValue)=>{
        try{
          setInputValue(newInputValue)
          const data = await request(
            'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', 
            'POST',
            {
              query: inputValue,  
            },
            {Authorization: "Token b25e6c1674f11682db8e104209bcf90a9b09c946" }
          )
          SetOptions([])
          data.suggestions.map((option)=>SetOptions((prev)=>[...prev, option.value]))
        }catch(e){console.log('CheckoutDialog AddressDeliveryHandler',e)}
    }

    return(
        <Autocomplete
            onChange={(event, newValue) => {
              props.setValue(newValue)
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              AddressDeliveryHandler(newInputValue);
            }}
            options={options}
            sx={{  m:'20px 0px' }}
            renderInput={(params) => <TextField {...params} label="Адрес доставки" />}
        />
    );
}