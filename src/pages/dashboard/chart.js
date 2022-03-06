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
  Legend
} from "recharts";
import Title from "./Title";
import api from "../../services/api";

export default function Chart() {
  const theme = useTheme();
  const [results, setResults] = React.useState([]);
  
  

  const dados = async () => {
    const storage = localStorage.getItem("SistemaUser");
    const usu = JSON.parse(storage);
    const desp = await api.get(`/entrada/sumdes/${usu.id}`);
    const rece = await api.get(`/entrada/sumrec/${usu.id}`); 
    let newList = [];
    for (let i in desp.data) {
      for (let c in rece.data) {
        if (rece.data[c].mes == desp.data[i].mes) {
          newList.push({
            mes: desp.data[i].mes,
            despesa: desp.data[i].soma,
            receita:rece.data[c].soma
          });      
      
        }
      }
    }
    setResults(newList);
        return newList;
  };

  React.useEffect(() => {
   dados();
  }, []);

  return (
    <React.Fragment>
      <Title>Projeção</Title>
      <ResponsiveContainer>
        <LineChart
          data={results}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="mes" stroke={theme.palette.text.secondary} />
          <Legend/>
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >             
            </Label>
          </YAxis>
          <Line
            type="monotone"
            dataKey="despesa"
            stroke={theme.palette.secondary.main}
            dot={true}
          />
          <Line
            type="monotone"
            dataKey= "receita"
            stroke={theme.palette.primary.main}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
