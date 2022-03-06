import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "./chart";
import Copyright from "../../components/Copyright";
import AppBar from "../../components/AppBar";
import { Total } from "../../components/Dashboard/Total";
import { getCurrentMonth, balanco,formatCurrentMonth } from "../../util/data.ts";

import api from "../../services/api";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  uttonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
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

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
  <AppBar title={`${formatCurrentMonth(getCurrentMonth())}`} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Receita */}
            <Grid item xs={12} md={4} lg={4}>
              <Total
                total={saldo.receita.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
                titulo={"RECEITA"}
                cor={'green'}
              />
            </Grid>

            {/* Despesa*/}
            <Grid item xs={12} md={4} lg={4}>
              <Total
                total={saldo.despesa.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
                titulo={"DESPESA"}
                cor={'pink'}
              />
            </Grid>
               {/* Balanco*/}
               <Grid item xs={12} md={4} lg={4}>
              <Total
                total={saldo.saldo.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
                titulo={"BALANÇO"}
                cor={saldo.saldo < 0 ? "red" : "green"}
              />
            </Grid>

            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
