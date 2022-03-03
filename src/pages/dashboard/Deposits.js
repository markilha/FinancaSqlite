import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { getCurrentMonth, balanco,formatCurrentMonth,carregaUser } from "../../util/data.ts";
import api from "../../services/api";
import { ResumoItem } from "../../components/resumoItem";
import {AuthContext} from '../../contexts/auth';



const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  const [dados, setDados] = React.useState();
  const [saldo, setSaldo] = React.useState(0);
  const{user} = React.useContext(AuthContext);

  React.useEffect(() => {
    async function loadData() {
      const response = await api.get(`/entrada/${carregaUser()[0]}`);
      if (response.status === 200) {
        setDados(response.data);
        setSaldo(balanco(response.data, getCurrentMonth()));
      }
    }
    loadData();
  }, []);

  return (
    <React.Fragment>
      <Title>Balanço</Title>
      <Typography component="span" variant="h4">
        <ResumoItem
          value={`R$ ${saldo.toLocaleString("pt-br")}`}
          color={saldo < 0 ? "red" : "green"}
        />
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
      {formatCurrentMonth(getCurrentMonth())}
      </Typography>
      
    </React.Fragment>
  );
}
