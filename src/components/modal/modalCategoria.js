import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import * as C from "./styles";
import api from "../../services/api";
import Notification from "../../components/Notification";

export default function ModalCategoria(props) {
  const { onOpenCat, onOpenPoupCat } = props;

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });


  async function handleEntrada() {
    const dados = {
      nome: nome,
      tipo: tipo
    }

    const response = await api.post("/categoria", dados);
    setNotify({
      isOpen: true,
      message: " Categoria inserida com sucesso",
      type: "success",
    });
    
    onOpenPoupCat(!onOpenCat)

  }

  return (
    <Grid container spacing={1}>

      <Grid item xs={9} >
        <C.InputLabel>
          <C.InputTitle>Nome</C.InputTitle>
          <C.Input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </C.InputLabel>
      </Grid>

      <Grid item xs={3} >
        <C.InputLabel>
          <C.InputTitle>Tipo</C.InputTitle>
          <C.Input
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />
        </C.InputLabel>
      </Grid>

      <Grid item xs={3} >
        <C.InputLabel>
          <C.InputTitle>&nbsp;</C.InputTitle>
          <C.Button onClick={handleEntrada}>Adicionar</C.Button>
        </C.InputLabel>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />

    </Grid>

  );
}
