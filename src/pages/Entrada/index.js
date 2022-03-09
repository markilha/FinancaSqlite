import React, { useContext, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import { InfoArea } from "../../components/infoArea";

import Copyright from "../../components/Copyright";
import AppBar from "../../components/AppBar";
import { AuthContext } from "../../contexts/auth";
import { getCurrentMonth, filtroPorMes, retornaMes} from "../../util/data.ts";
import api from "../../services/api";
import { Tabela } from "../../components/tabela";
import Popup from "../../components/entrada/Popup";
import Notification from "../../components/entrada/Notification";
import ModalAdd from "../../components/modal/modalAdd";
import ModalCategoria from "../../components/modal/modalCategoria";

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
    height: 600,
  },
}));

export default function Entrada() {
  const classes = useStyles();

  const { atual, setAtual } = useContext(AuthContext);
  const [dados, setDados] = useState([]);
  const [filtro, setFiltro] = useState([]);
  const [mesAtual, setMesAtual] = useState(getCurrentMonth());
  const [renda, setRenda] = useState(0);
  const [despesa, setDespesa] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPoupCat, setOpenPoupCat] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });


   function initialValures() {
    return {
      id:0,
      valor: 0,
      data: '',
      descricao: '',
      categoria: '',
      tipo: 'Despesa',
      repetir: 0,
      estatus: 'Pendente'
    }

  }

  useEffect(() => {
    const storage = localStorage.getItem("SistemaUser");
    const usu = JSON.parse(storage);

    async function loadData() {
      const response = await api.get(`/entrada/${usu.id}`);
      if (response.status === 200) {
        setDados(response.data);
        setFiltro(response.data);
      }
    }
    loadData();
  }, [atual]);

  useEffect(() => {
    let rendaCont = 0;
    let despesaCont = 0;

    for (let i in filtro) {
      if (filtro[i].tipo === "Despesa") {
        despesaCont += filtro[i].valor;
      } else {
        rendaCont += filtro[i].valor;
      }
    }
    setRenda(rendaCont);
    setDespesa(despesaCont);
  }, [filtro]);

  useEffect(() => {
    setFiltro(filtroPorMes(dados, mesAtual));
  }, [dados, mesAtual, atual]);

  const handleMonthChange = (newMonth) => {
    setMesAtual(newMonth);
  };
  const onOpenEnt = () => {
    setOpenPopup(!openPopup);
  };

  const onOpenCat = () => {
    setOpenPoupCat(!openPoupCat);
  }; 

  return (
    <div className={classes.root}>
      <AppBar title="Entradas" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        <Container className={classes.container}>
          <Grid container spacing={3}>
            {/* tabela */}
            <Grid item xs={12} md={12} lg={12}>
              <InfoArea
                currentMonth={mesAtual}
                onMonthChange={handleMonthChange}
                income={renda}
                expense={despesa}
                onOpenEnt={onOpenEnt}
                onOpenCat={onOpenCat}
              />

              <Tabela lista={filtro} />
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>

          {/* Inicio do Popup */}
        
            <ModalAdd
                 openPopup={openPopup}
                 setOpenPopup={setOpenPopup}
                 initialValures={initialValures()} 
                                        
             />
         

          {/* Inicio do Popup CATEGORIA */}
          <Popup
            title="Nova Categoria"
            openPopup={openPoupCat}
            setOpenPopup={setOpenPoupCat}   
            atual      
          >
            <ModalCategoria setOpenPoupCat={setOpenPoupCat} />
          </Popup>

          <Notification notify={notify} setNotify={setNotify} />
        </Container>
      </main>
    </div>
  );
}
