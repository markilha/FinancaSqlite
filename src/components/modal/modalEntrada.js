import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../controls/Controls";
import { useForm } from "../entrada/useForm";
import * as C from "./styles";
import api from "../../services/api";

const initialFValues = {
  id: 0,
  data: "01/01/2022",
  categoria: "",
  tipo: "",
  valor: 0,
  descricao: "",
  estatus: "",
  usuario: 1,
};

// var result = item.replace(/D/g,"");//Remove tudo o que não é digito

export default function ModelEntrada(props) {
  const { addOrEdit, recordForEdit } = props;

  const [categorias, setCategorias] = useState("");

  useEffect(() => {
    async function loadCategorias() {
      const response = await api.get("/categoria");
      if (response.status === 200) {
        setCategorias(response.data);
      }
    }
    loadCategorias();
  }, []);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("da" in fieldValues)
      temp.data = fieldValues.data ? "" : "Campo é obrigatório";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <C.InputLabel>
          <C.InputTitle>Data</C.InputTitle>
          <C.Input
            type={"date"}
            name={"data"}
            value={values.data}
            onChange={handleInputChange}
          />
        </C.InputLabel>
      </Grid>

      <Grid item xs={4}>
        <C.InputLabel>
          <C.InputTitle>Tipo</C.InputTitle>
          <C.Select
            name="tipo"
            value={values.tipo}
            onChange={handleInputChange}
          >
            <>
              <option>Selecione</option>
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

      <Grid item xs={4}>
        <C.InputLabel>
          <C.InputTitle>Valor</C.InputTitle>
          <C.Input
            name="valor"
            type="text"
            value={values.valor}
            onChange={handleInputChange}
          />
        </C.InputLabel>
      </Grid>

      <Grid item xs={9}>
        <C.InputLabel>
          <C.InputTitle>Descrição</C.InputTitle>
          <C.Input
            name="descricao"
            type="text"
            value={values.descricao}
            onChange={handleInputChange}
          />
        </C.InputLabel>
      </Grid>

      <Grid item xs={3}>
        <C.InputLabel>
          <C.InputTitle>Estatus</C.InputTitle>
          <C.Select
            name="estatus"
            value={values.estatus}
            onChange={handleInputChange}
          >
            <>
              <option>Selecione</option>
              <option key={"Pago"} value={"Pago"}>
                Pago
              </option>
              <option key={"Pendente"} value={"Pendente"}>
                Pendente
              </option>
            </>
          </C.Select>
        </C.InputLabel>
      </Grid>
      <Grid item xs={12}>
        <div>
          <Controls.Button type="submit" text="Salvar" onClick={handleSubmit} />
          <Controls.Button text="Limpar" color="default" onClick={resetForm} />
        </div>
      </Grid>
    </Grid>
  );
}
