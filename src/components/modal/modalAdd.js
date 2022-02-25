import React, {useState,useEffect}from "react";
import { Grid } from "@material-ui/core";
import * as C from "./styles";
import api from "../../services/api";

export default function ModalAdd(props) {
  const {value, handleAddEvent} = props;
  const [data, setData] = useState("");  
  const [categoria, setCategoria] = useState("");  
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [categorias, setCategorias] = useState([]);
  const [repetir, setRepetir] = useState(0);
  const [values, setValues] = useState();

  const contagem = [
    { id: 0},
    { id: 1},
    { id: 2},
    { id: 3},
    { id: 4},
    { id: 5},
    { id: 6},
    { id: 7},
    { id: 8},
    { id: 9},
    { id: 10},
    { id: 11}, 
    { id: 12},    
  ];

  useEffect(() => { 
    async function loadCategorias() {
      const response = await api.get("/categoria");
      if (response.status === 200) {
        setCategorias(response.data);
      }
    }
    loadCategorias();
  }, []);

 

  function handleChangeCategoria(item) {
    setCategoria(item);
  }
  function handleEntrada() {  

    const dados = {
      data: data,
      categoria: categoria,
      descricao: descricao,
      tipo: tipo,
      repetir: repetir,
      valor: parseFloat(valor.toString().replace(",", ".")),
      
    }; 

    setValues(dados);
    handleAddEvent(dados);

  }

  return (
    <Grid container spacing={1}> 
    <Grid item xs={3} >
      <C.InputLabel>
        <C.InputTitle>Data</C.InputTitle>
        <C.Input
          type={"date"}
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </C.InputLabel>
    </Grid>
    <Grid item xs={3} >
      <C.InputLabel>
        <C.InputTitle>Categoria</C.InputTitle>
        <C.Select
          value={categoria}
          onChange={(e) => handleChangeCategoria(e.target.value)}
        >
          {categorias.map((item, index) => (
            <>
              <option key={index} value={item.nome}>
                {item.nome}
              </option>
            </>
          ))}
        </C.Select>
      </C.InputLabel>
    </Grid>

    <Grid item xs={3} >
      <C.InputLabel>
        <C.InputTitle>Tipo</C.InputTitle>
        <C.Select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <>
            <option></option>
            <option key={"despesa"} value={"Despesa"}>
              Despesa
            </option>
            <option key={"receita"} value={"Receita"}>
              Receita
            </option>
          </>
        </C.Select>
      </C.InputLabel>
    </Grid>

    <Grid item xs={3} >
    <C.InputLabel>
      <C.InputTitle>Valor</C.InputTitle>
      <C.Input
        type="text"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />
    </C.InputLabel>
    </Grid>             


    <Grid item xs={10} >
      <C.InputLabel>
        <C.InputTitle>Descrição</C.InputTitle>
        <C.Input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </C.InputLabel>
    </Grid>
    
    <Grid item xs={2} >
      <C.InputLabel>
        <C.InputTitle>Repetir</C.InputTitle>
        <C.Select value={repetir} onChange={(e) => setRepetir(e.target.value)}>
        {contagem.map((item, index) => (
            <>
              <option key={index} value={item.id}>
                {item.id}
              </option>
            </>
          ))}                      
        </C.Select>
      </C.InputLabel>
    </Grid>

    <Grid item xs={3} >
    <C.InputLabel>
      <C.InputTitle>&nbsp;</C.InputTitle>
      <C.Button onClick={handleEntrada}>Adicionar</C.Button>
    </C.InputLabel>
    </Grid>            

</Grid>
   
  );
}
