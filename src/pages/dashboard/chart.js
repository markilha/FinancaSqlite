import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Pie,
  PieChart,
  BarChart,
  Bar,
  LabelList,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import Title from "./Title";
import api from "../../services/api";

export const ChartLine = () => {
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
            receita: rece.data[c].soma,
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
          <Legend />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            ></Label>
          </YAxis>
          <Line
            type="monotone"
            dataKey="despesa"
            stroke={theme.palette.secondary.main}
            dot={true}
          />
          <Line
            type="monotone"
            dataKey="receita"
            stroke={theme.palette.primary.main}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export const ChartPie = () => {
  const [results, setResults] = React.useState([]);
  const dados = async () => {
    const storage = localStorage.getItem("SistemaUser");
    const usu = JSON.parse(storage);
    const categorias = await api.get(`/entrada/${usu.id}/concat`);
    setResults(categorias.data);
   
  };

  React.useEffect(() => {
    dados();
  }, []);

  return (
    <React.Fragment>
      <Title>Categoria</Title>
      <ResponsiveContainer>
        <PieChart width={900} height={900}>
          <Tooltip />
          <Pie
            data={results}
            dataKey="soma"
            nameKey="categoria"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#82ca9d"
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export const ChartBar = (props) => {

  return (
    <React.Fragment>
      <Title>Categoria</Title>
      <ResponsiveContainer>
        <BarChart
          width={730}
          height={250}
          data={props.dados}
          margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="categoria">
            <Label
              value=""
              angle={0}             
              offset={0}
              position="insideBottom"
            />
          </XAxis>
          <YAxis
            label={{ value: "", angle: -90, position: "insideLeft" }}
          />
          <Bar dataKey="soma" fill="#8884d8">
            <LabelList dataKey="soma" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};
