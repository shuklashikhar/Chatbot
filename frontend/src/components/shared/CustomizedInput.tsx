import React from 'react'
import {TextField} from "@mui/material"
type Props = {
  name: string
  type: string
  label: string
}

const CustomizedInput = (props: Props) => {
  return <TextField 
  margin='normal'
  name={props.name} 
  label={props.label} 
  type={props.label}
  sx={{
    '& .MuiInputLabel-root': { color: 'white' }, // Adjust InputLabel color
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'white' }, // Adjust TextField border color
    },
  }}
  InputProps={{style:{width: "400px", borderRadius: 10, fontSize: 20, color: "white"}}}
  />
}

export default CustomizedInput