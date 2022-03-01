import * as C from "./styles";
import { useState, useContext } from "react";
import { FiDelete, FiEdit2 } from "react-icons/fi";
import api from "../../services/api";
import Popup from "../../components/entrada/Popup";
import Notification from "../../components/entrada/Notification";
import ConfirmDialog from "../../components/entrada/ConfirmDialog";
import ModelEntrada from "../../components/modal/modalEntrada";
import {formatDate} from "../../util/data.ts"



import { AuthContext } from "../../contexts/auth";

export const Tabela = ({ lista }) => {
  const { atual, setAtual } = useContext(AuthContext);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);

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
  }


  const addOrEdit = (item, resetForm) => {

    const dados = {
      data: item.data,
      categoria: item.categoria,
      descricao: item.descricao,
      tipo: item.tipo,
      estatus: item.estatus,
      valor: parseFloat(item.valor.replace(",", ".")),
    };
    if (item.id === 0) {
      async function insertEntrada() {
        const response = await api.post('/entrada', dados);
        resultado(response, "Entrada inserida com sucesso!!!")
      }
      insertEntrada();
    } else {
      async function updateEntrada() {
        try {

          const response = await api.put(`/entrada/${item.id}`, dados);
          resultado(response, "Entrada Atualizada com sucesso!!")
          setAtual(!atual);
        } catch (err) {
          console.log(err);
        }
      }
      updateEntrada();
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };



  return (<>

    <C.Table>
      <thead>
        <tr>
          <C.TableHeadColumn align="left" width={100}>
            Data
          </C.TableHeadColumn>
          <C.TableHeadColumn align="left" width={150}>
            Categoria
          </C.TableHeadColumn>
          <C.TableHeadColumn align="left" width={130}>
            Tipo
          </C.TableHeadColumn>
          <C.TableHeadColumn align="left" width={300}>
            Descrição
          </C.TableHeadColumn>
          <C.TableHeadColumn align="center" width={100}>
            Valor
          </C.TableHeadColumn>
          <C.TableHeadColumn align="center" width={100}>
            Estatus
          </C.TableHeadColumn>
          <C.TableHeadColumn align="center" width={150}>
            
          </C.TableHeadColumn>
        </tr>
      </thead>
      <tbody>
        {lista.map((item, index) => (
          <C.TableLine key={index}>
            <C.TableColumn> {formatDate(item.data)}</C.TableColumn>
            <C.TableColumn>
              <C.Category >
                {item.categoria}
              </C.Category>
            </C.TableColumn>
            <C.TableColumn style={{ color: item.tipo === "Despesa" ? "red" : "blue" }}> {item.tipo}</C.TableColumn>
            <C.TableColumn> {item.descricao}</C.TableColumn>
            <C.TableColumn align="right"
              style={{ color: item.tipo === "Despesa" ? "red" : "blue" }}
            >             
              {item.valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
            </C.TableColumn>
            <C.TableColumn align="right" >
            <C.Category >
                {item.estatus}
              </C.Category>


            </C.TableColumn>
           
            {/* BOTÃO ATUALIZAR */}
            <C.TableColumn align="right">
              <C.Action >
                <button
                  onClick={() => {
                    openInPopup(item);
                  }}
                >
                  {" "}
                  <FiEdit2 size={20} />
                </button>
              </C.Action>
              {/* BOTÃO DELETAR*/}
              <C.Action  >
                <button
                  onClick={() => {
                    setConfirmDialog({
                      isOpen: true,
                      title: "Deseja realmente deletar esta entrada?",
                      subTitle: "Você pode voltar da operação",
                      onConfirm: () => {
                        onDelete(item.id);
                      },
                    });
                  }}
                >
                  {" "}
                  <FiDelete size={20} />
                </button>
              </C.Action>
            </C.TableColumn>
          </C.TableLine>
        ))}
      </tbody>
    </C.Table>
    <Popup
      title="Edição da Entrada"
      openPopup={openPopup}
      setOpenPopup={setOpenPopup}
    >
      <ModelEntrada recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
    </Popup>

    <Notification notify={notify} setNotify={setNotify} />
    <ConfirmDialog
      confirmDialog={confirmDialog}
      setConfirmDialog={setConfirmDialog}
    />
  </>
  );
};
