import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Copyright from "../../components/Copyright";
import AppBar from "../../components/AppBar";
import { useEffect, useState, useContext } from "react";
import * as C from "./styles";
import api from "../../services/api";
import { Tabela } from "../../components/tabela";
import { AuthContext } from "../../contexts/auth";
import { InfoArea } from "../../components/infoArea";
import Popup from "../../components/entrada/Popup";
import { getCurrentMonth, filtroPorMes,carregaUser } from "../../util/data.ts";
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
    height: 240,
  },
}));

export default function Entrada() {
  const classes = useStyles();
  const { atual, setAtual,user } = useContext(AuthContext); 
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


  
 
  useEffect(() => {    

    async function loadData() {
      const response = await api.get(`/entrada/${carregaUser(user)[0]}}`);
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

  //ENSERIR E EDITAR
  async function handleAddEvent(valores) {
    console.log(valores);

    let errors = [];
    let mensagem = "";
    if (isNaN(new Date(valores.data).getTime())) {
      errors.push("Data inválida!");
    }
    if (valores.descricao === "") {
      errors.push("Descrição esta vazia!");
    }
    if (parseFloat(valores.valor) <= 0) {
      errors.push("Valor inválido!");
    }
    if (errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      if (valores.repetir > 0) {
        let [ano, mes, dia] = valores.data.toString().split("-");

        for (var i = 0; i < valores.repetir; i++) {
          var m = parseInt(mes) + i;
          let newMes = "";

          if (m > 12) {
            newMes = m - 12;
            ano = parseInt(ano) + 1;
          } else {
            newMes = m;
          }
          newMes = ("00" + newMes).slice(-2);

          var dados = {
            data: `${ano}-${newMes}-${dia}`,
            categoria: valores.categoria,
            descricao: valores.descricao,
            tipo: valores.tipo,
            estatus: valores.estatus,
            valor: parseFloat(valores.valor.toString().replace(",", ".")),
            mes: valores.mes,
            usuario: user[0].id,
          };

          const response = await api.post("/entrada", dados);
          mensagem = response.data;
        }
      } else {
        var dado = {
          data: valores.data,
          categoria: valores.categoria,
          descricao: valores.descricao,
          tipo: valores.tipo,
          estatus: valores.estatus,
          valor: parseFloat(valores.valor.toString().replace(",", ".")),
          mes: valores.mes,
          usuario: user[0].id,
        };

        const response = await api.post("/entrada", dado);
        mensagem = response.data;
      }

      setNotify({
        isOpen: true,
        message: mensagem,
        type: "success",
      });
      setAtual(!atual);
      setOpenPopup(false);
    }
  }

  return (
    <div className={classes.root}>
      <AppBar title="Entradas" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <C.Section>
              <div className="grid">
               <C.Body>
                  <InfoArea
                    currentMonth={mesAtual}
                    onMonthChange={handleMonthChange}
                    income={renda}
                    expense={despesa}
                    onOpenEnt={onOpenEnt}
                    onOpenCat={onOpenCat}
                  />
                  <Tabela lista={filtro} />
                </C.Body>

                {/* Inicio do Popup */}
                <Popup
                  title="Nova Entrada"
                  openPopup={openPopup}
                  setOpenPopup={setOpenPopup}
                >
                  <ModalAdd handleAddEvent={handleAddEvent} />
                </Popup>

                {/* Inicio do Popup CATEGORIA */}
                <Popup
                  title="Nova Categoria"
                  openPopup={openPoupCat}
                  setOpenPopup={setOpenPoupCat}
                >
                  <ModalCategoria setOpenPoupCat={setOpenPoupCat} />
                </Popup>

                <Notification notify={notify} setNotify={setNotify} />
              </div>
            </C.Section>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
