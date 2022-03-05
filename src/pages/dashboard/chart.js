import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import Title from "./Title";
import api from "../../services/api";

export default function Chart() {
  const theme = useTheme();
  const [despesas, setDespesas] = React.useState([]);
  


  const dados = async (list) => {
    const storage = localStorage.getItem("SistemaUser");
    const usu = JSON.parse(storage);
    const response = await api.get(`/entrada/sumrec/${usu.id}`);
    let newList = [];
    for (let i in list) {
      for (let c in response.data) {
        if (response.data[c].mes == list[i].mes) {
          newList.push({
            mes: list[i].mes,
            despesa: list[i].soma,
            receita:response.data[c].soma
          });
        }
      }
    }

    return newList;
  };

  React.useEffect(() => {
    const storage = localStorage.getItem("SistemaUser");
    const usu = JSON.parse(storage);

    async function loadDes() {
      const response = await api.get(`/entrada/sumdes/${usu.id}`);
      setDespesas(response.data);         
    }
    loadDes();  
   console.log(dados(despesas));  

   
  }, []);

  return (
    <React.Fragment>
      <Title>Projeção</Title>
      <ResponsiveContainer>
        <LineChart
          data={despesas}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="mes" stroke={theme.palette.text.secondary} />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              Despesa
            </Label>
          </YAxis>
          <Line
            type="monotone"
            dataKey="soma"
            stroke={theme.palette.secondary.main}
            dot={true}
          />
          <Line
            type="natural"
            dataKey= "soma"
            stroke={theme.palette.primary.main}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
