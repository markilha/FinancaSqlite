import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import {
  getCurrentMonth,
  balanco,
  formatCurrentMonth,
} from "../../util/data.ts";
import api from "../../services/api";
import {Total} from '../../components/Dashboard/Total';


const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
    color: 'blue'
  },
  mes:{
    fontSize: 12,
    color: 'green'
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Deposits() {
  const classes = useStyles();
  const [saldo, setSaldo] = React.useState({
    despesa: 0,
    receita: 0,
    saldo: 0,
  });

  React.useEffect(() => {
    const storage = localStorage.getItem("SistemaUser");
    const usu = JSON.parse(storage);

    async function loadData() {
      const response = await api.get(`/entrada/${usu.id}`);
      if (response.status === 200) {
        setSaldo(balanco(response.data, getCurrentMonth()));
        console.log(saldo.despesa);
      }
    }
    loadData();
  }, []);

  return (
    <React.Fragment>    

      {/* <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Receita:
          </Typography>
          <Typography variant="h9" component="h9">
            {saldo.receita.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Typography>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Despesa:
          </Typography>
          <Typography
           variant="h9"
            component="h9"
            >
            {saldo.despesa.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Typography>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Balanço:
          </Typography>

          <Typography
            variant="h9"
            component="h9"
            style={{color:saldo.saldo < 0 ? "red" : "green"}}>          
            {saldo.saldo.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Typography>

          <Typography
            className={classes.mes}            
            gutterBottom
          >
            <Button size="small">             
              {formatCurrentMonth(getCurrentMonth())}
            </Button>
          </Typography>
        </CardContent>
      </Card> */}
    </React.Fragment>
  );
}
