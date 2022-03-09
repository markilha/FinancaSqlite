import React, { useState, useEffect, useContext } from "react";
import { Grid, TextField, Select, FormControl, InputLabel, MenuItem,
         InputAdornment, Button,Dialog,DialogTitle,Typography,DialogContent } from "@material-ui/core";
import * as C from "./styles";
import api from "../../services/api";
import { retornaMes } from '../../util/data.ts';
import { AuthContext } from '../../contexts/auth'
import { makeStyles } from "@material-ui/core/styles";
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import Controls from "../controls/Controls";
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      height: 550,
      width: 400,

    },
  },
  fixedHeight: {
    height: 550,
    width: 400
  },
  control: {
    minWidth: 400,
  },
  selectEmpty: {
  },

}));

export default function ModalAdd(props) {
  const {openPopup, setOpenPopup, initialValures} = props;
  const classes = useStyles(); 
  const { atual, setAtual } = useContext(AuthContext);
  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState([]);



  const contagem = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
  ];

  useEffect(() => {
    if (initialValures != null)
      setValues({
        ...initialValures,
      });
  }, [initialValures]);


  useEffect(() => {
    async function loadCategorias() {
      const response = await api.get("/categoria");
      if (response.status === 200) {
        setCategorias(response.data);
      }
    }
    loadCategorias();
  }, []);

  function onChange(event) {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  // async function handleChangeCategoria(item) {
  //   setCategoria(item);
  //   const response = await api.get(`/categoria/tipo/${item}`)
  //   setTipo(response.data.tipo);
  // }
  async function handleEntrada() {

    if(values.id == 0){

      let errors = [];
      let mensagem = "";
      if (isNaN(new Date(values.data).getTime())) {
        errors.push("Data inválida!");
      }
      if (values.descricao === "") {
        errors.push("Descrição esta vazia!");
      }
      if (parseFloat(values.valor) <= 0) {
        errors.push("Valor inválido!");
      }
      if (errors.length > 0) {
        alert(errors.join("\n"));
      } else {
        if (values.repetir > 0) {
          let [ano, mes, dia] = values.data.toString().split("-");
  
          for (var i = 0; i < values.repetir; i++) {
            
            var m = parseInt(mes) + i;
            let newMes = "";
  
            if (m > 12) {
              newMes = m - 12;
              ano = parseInt(ano) + 1;
            } else {
              newMes = m;
            }
            newMes = ("00" + newMes).slice(-2);
  
            let newDada =`${ano}-${newMes}-${dia}`;
  
            var dados = {
              data: `${ano}-${newMes}-${dia}`,
              categoria: values.categoria,
              descricao: `(${i+1} de ${values.repetir}) -${values.descricao}` ,
              tipo: values.tipo,
              estatus: values.estatus,
              valor: parseFloat(values.valor.toString().replace(",", ".")),
              mes: retornaMes(newDada),
              usuario: 1,
            };
  
            const response = await api.post("/entrada", dados);
            mensagem = response.data;
               
          setAtual(!atual)    
          setOpenPopup(false);
  
          }
        } else {
          var dado = {
            id:values.id,
            data: values.data,
            categoria: values.categoria,
            descricao: values.descricao,
            tipo: values.tipo,
            estatus: values.estatus,
            valor: parseFloat(values.valor.toString().replace(",", ".")),
            mes: values.mes,
            usuario: 1,
          };
  
          const response = await api.post("/entrada", dado);
          mensagem = response.data;
  
          setAtual(!atual)    
          setOpenPopup(false);
          
        } 
      }
    }else{

      var items = {     
        data: values.data,
        categoria: values.categoria,
        descricao: values.descricao,
        tipo: values.tipo,
        estatus: values.estatus,
        valor: parseFloat(values.valor.toString().replace(",", ".")),
        mes: values.mes,
        usuario: 1,
      };

      const response = await api.put(`/entrada/${values.id}`, items);     

      setAtual(!atual)    
      setOpenPopup(false);      
      
    }
   
 
  }

  return (

    <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            Entradas
          </Typography>
          <Controls.ActionButton
            color="secondary"
            onClick={() => { setOpenPopup(false) }}>
            <CloseIcon />
          </Controls.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container spacing={1}>

            <Grid item xs={12} >
              <TextField
                type={"text"}
                label='Valor'
                placeholder='Insira o valor'
                name="valor"
                value={values.valor}
                onChange={onChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalAtmIcon />
                    </InputAdornment>
                  ),
                }}
                className={classes.control}
              />

            </Grid>


            <Grid item xs={12}>
              <TextField
                type='date'
                placeholder='Insira a data'
                name="data"
                value={values.data}
                onChange={onChange}
                className={classes.control}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type='text'
                label='Descrição'
                placeholder='Descrição'
                name="descricao"
                value={values.descricao}
                onChange={onChange}
                className={classes.control}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SpeakerNotesIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl className={classes.control}>
                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="categoria"
                  value={values.categoria}
                  onChange={onChange}
                >
                  {categorias.map((item) => (
                    <MenuItem key={item.id} value={item.nome}>
                      {item.nome}
                    </MenuItem>
                  ))}


                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl className={classes.control}>
                <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="tipo"
                  value={values.tipo}
                  onChange={onChange}
                >
                  <MenuItem key={'Despesa'} value={'Despesa'}>
                    Despesa
                  </MenuItem>
                  <MenuItem key={'Receita'} value={'Receita'}>
                    Receita
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl className={classes.control}>
                <InputLabel id="demo-simple-select-label">Repetir</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="repetir"
                  value={values.repetir}
                  onChange={onChange}
                >
                  {contagem.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.id}
                    </MenuItem>
                  ))}


                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl className={classes.control}>
                <InputLabel id="demo-simple-select-label">Estatus</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="estatus"
                  value={values.estatus}
                  onChange={onChange}
                >
                  <MenuItem key={'Pendente'} value={'Pendente'}>
                    Pendente
                  </MenuItem>
                  <MenuItem key={'Pago'} value={'Pago'}>
                    Pago
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} >
              <Button
                variant="outlined"
                color="primary"
                onClick={handleEntrada}
              >
                Salvar
              </Button>
              {/* <C.InputLabel>
            <C.InputTitle>&nbsp;</C.InputTitle>
            <C.Button onClick={handleEntrada}>Adicionar</C.Button>
          </C.InputLabel> */}
            </Grid>

          </Grid>
        </form>
      </DialogContent>
    </Dialog>


  );
}
