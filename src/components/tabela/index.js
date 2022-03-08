import * as C from "./styles";
import { useState, useContext, Fragment } from "react";
import { FiDelete, FiEdit2 } from "react-icons/fi";
import api from "../../services/api";
import Popup from "../entrada/Popup";
import Notification from "../entrada/Notification";
import ConfirmDialog from "../entrada/ConfirmDialog";
import ModalAdd from "../modal/modalAdd";
import { Estatus } from "../estatus";
import { AuthContext } from "../../contexts/auth";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import { formatDate } from '../../util/data.ts'



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const Tabela = ({ lista }) => {
  const { atual, setAtual } = useContext(AuthContext);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState({       
        id:0,
        valor: 0,
        data: '',
        descricao: 'descrição',
        categoria: '',
        tipo: '',
        repetir: '',
        estatus: ''   

  });
  const classes = useStyles();



  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    async function dellLote() {
      await api.delete(`/entrada/${id}`);
    }
    dellLote();
    setNotify({
      isOpen: true,
      message: "Deletado com sucesso",
      type: "error",
    });
    setAtual(!atual);
  };

  const resultado = (response, mensagem) => {
    if (response.status === 200) {
      setNotify({
        isOpen: true,
        message: mensagem,
        type: "success",
      });
    } else {
      setNotify({
        isOpen: true,
        message: "Ops! Ocorreu um erro ao tentar atualizar",
        type: "error",
      });
    }
  };

  const addOrEdit = (item, resetForm) => {
    const dados = {
      data: item.data,
      categoria: item.categoria,
      descricao: item.descricao,
      tipo: item.tipo,
      estatus: item.estatus,
      valor: parseFloat(item.valor.toString().replace(",", ".")),
      usuario: 1,
    };  

    async function updateEntrada() {
      try {
        const response = await api.put(`/entrada/${item.id}`, dados);
        resultado(response, "Entrada Atualizada com sucesso!!");
        setAtual(!atual);
      } catch (err) {
        console.log(err);
      }
    }
    updateEntrada();
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
  };

 function openInPopup (item) {

    setRecordForEdit({
      ...recordForEdit,      
       item
    });
    console.log(item)
    
    setOpenPopup(true);
  
  };

  return (
    <Fragment>

      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell align="center">Estatus</TableCell>
              <TableCell align="right">valor</TableCell>
              <TableCell>Ação</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {lista.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{formatDate(row.data)}</TableCell>
                <TableCell>{row.tipo}</TableCell>
                <TableCell>{row.descricao}</TableCell>
                <TableCell align="center" > <Estatus estatus={row.estatus} /></TableCell>
                <TableCell align="right" style={{ color: row.tipo === "Despesa" ? "red" : "blue" }}>{row.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</TableCell>
                <TableCell>
                  {/* BOTÃO ATUALIZAR */}

                  <C.Action>
                    <button
                      onClick={() => {
                        openInPopup(row);
                      }}
                    >
                      {" "}
                      <FiEdit2 size={20} />
                    </button>
                  </C.Action>
                  {/* BOTÃO DELETAR*/}
                  <C.Action>
                    <button
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: "Deseja realmente deletar esta entrada?",
                          subTitle: "Você pode voltar da operação",
                          onConfirm: () => {
                            onDelete(row.id);
                          },
                        });
                      }}
                    >
                      {" "}
                      <FiDelete size={20} />
                    </button>
                  </C.Action>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      {/* <Popup
        title="Edição da Entrada"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ModelEntrada recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup> */}

      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />

      <ModalAdd
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        initialValures={recordForEdit}
      />


    </Fragment>
  );
};
