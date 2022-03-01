import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import api from "../../services/api";
import { getCurrentMonth, filtroPorMes } from "../../util/data.ts";
import {AuthContext} from '../../contexts/auth';



function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const [dados,setDados]= React.useState([]);
  const [filtro,setFiltro]= React.useState([]);
  const {user} = React.useContext(AuthContext)

 React.useEffect(() => {
    async function loadData() {
      const response = await api.get(`/entrada/${user.id}`);
      if (response.status === 200) {
        setDados(response.data);       
      }
    }
    loadData();
  }, []);

  React.useEffect(() => {
    setFiltro(filtroPorMes(dados, getCurrentMonth()));
  }, [dados]);


  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Entradas recentes  </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Estatus</TableCell>
            <TableCell align="right">valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtro.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.data}</TableCell>
              <TableCell>{row.tipo}</TableCell>
              <TableCell>{row.descricao}</TableCell>
              <TableCell  style={{ color: row.estatus === "Pendente" ? "purple" : "green" }}>{row.estatus}</TableCell>
              <TableCell align="right"  style={{ color: row.tipo === "Despesa" ? "red" : "blue" }}>{row.valor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
         Mais
        </Link>
      </div>
    </React.Fragment>
  );
}