import React from "react";
import { TextField, Grid } from "@material-ui/core";

export default function Input(props) {
  const {grid, name, label, value, error = null, onChange, ...other } = props;
  return (
    <Grid item xs={grid} >   
      <TextField
        variant="outlined"
        color="primary"
        size="small"
        margin="dense"   
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        fullWidth
        autoComplete="family-name"        
        InputProps={{
          color: "primary",            
        }}  
        {...other}
        {...(error && { error: true, helperText: error })}
      />
    </Grid>
  );
}
