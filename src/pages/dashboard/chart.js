import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer,Tooltip,CartesianGrid} from 'recharts';
import Title from './Title';
import api from '../../services/api';




export default function Chart() {
  const theme = useTheme();
  const [despesas,setDespesas] = React.useState([]);
  const [receitas,setReceitas] = React.useState([]);

  React.useEffect(()=>{
    async function loadDes(){
      const response = await api.get('/entrada/sumdes');
     setDespesas(response.data);
    }
    loadDes();
    async function loadRec(){
      const response = await api.get('/entrada/sumrec');
     setReceitas(response.data);
    }
    loadRec();
  },[])

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
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Despesa
            </Label>
          </YAxis>
          <Line type="monotone" dataKey= "soma" stroke={theme.palette.primary.main} dot={true} />
          
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}