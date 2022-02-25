import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../controls/Controls";
import { useForm } from "../useForm";

const initialFValues = {
  id: 0,
  data: "01/01/2022",
  categoria: "",
  tipo: "",
  valor: 0,
  descricao: "",
};

export default function ModelEntrada(props) {
  const { addOrEdit, recordForEdit } = props;
  const [ativo, setAtivo] = useState(0);

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
      <Grid container spacing={3}>
        <Controls.Input
          grid={4}
          name="data"
          label="data"
          value={values.data}
          onChange={handleInputChange}
        />
        <Controls.Input
          grid={4}
          name="tipo"
          label="tipo"
          value={values.tipo}
          onChange={handleInputChange}
        />
        {/* <Controls.InputMask
          grid={4}
          label = "Valor"
          value={values.valor.toLocaleString("pt-br", {minimumIntegerDigits: 2})}
          onChange={handleInputChange}
        /> */}
        <Controls.Input 
          grid={4}
          name="valor"
          label="Valor"
          value={values.valor}
          onChange={handleInputChange}         
        /> 
      </Grid>
      <Grid container spacing={3}>
        <Controls.Input
          grid={6}
          name="categoria"
          label="Categoria"
          value={values.categoria}
          onChange={handleInputChange}
        />
        <Controls.Input
          grid={6}
          name="descricao"
          label="Descrição"
          value={values.descricao}
          onChange={handleInputChange}
        />
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
