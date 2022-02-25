import React from "react";
import InputMask from 'react-input-mask'
import { Grid,TextField } from "@material-ui/core";

export default function Input(props) {
  const {grid, label, value, onChange } = props;
  return (
    <Grid item xs={grid} >   
     <InputMask
            mask="R$ 99.999,99"
            value={value}
            onChange={onChange}           
          >
            {() => <TextField              
              label= {label}
              name="valor"            
              type="text"
              />}
          </InputMask>
    </Grid>
  );
}
