import * as C from "./styles";
import { useState, useContext } from "react";
import { FiDelete, FiEdit2 } from "react-icons/fi";
import api from "../../services/api";
import Popup from "../../components/Popup";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import ModelEntrada from "../../components/modal/modalEntrada"



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


  const addOrEdit = (item, resetForm) => {
    if (item.id === 0) {
    } else {
      async function updateLote() {
        try {
          var dados = {
            data: item.data,
            categoria: item.categoria,
            descricao: item.descricao,
            tipo: item.tipo,
            valor: parseFloat(item.valor.replace(",", ".")),
          };

          const response = await api.put(`/entrada/${item.id}`, dados);

          if (response.status === 200) {
            setNotify({
              isOpen: true,
              message: "Registro atualizado com sucesso!!!",
              type: "success",
            });
          } else {
            setNotify({
              isOpen: true,
              message: "Ops! Ocorreu um erro ao tentar atualizar",
              type: "error",
            });
          }

          setAtual(!atual);
        } catch (err) {
          console.log(err);
        }
      }
      updateLote();
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  return (
    <>
      <C.Table>
        <thead>
          <tr>
            <C.TableHeadColumn align="left" width={100}>
              Data
            </C.TableHeadColumn>
            <C.TableHeadColumn align="left" width={130}>
              Categoria
            </C.TableHeadColumn>
            <C.TableHeadColumn align="left" width={130}>
              Tipo
            </C.TableHeadColumn>
            <C.TableHeadColumn align="left">
              Descrição
            </C.TableHeadColumn>
            <C.TableHeadColumn align="left" width={100}>
              Valor
            </C.TableHeadColumn>
            <C.TableHeadColumn align="left" width={100}>
              Ação
            </C.TableHeadColumn>
          </tr>
        </thead>
        <tbody>
          {lista.map((item, index) => (
            <C.TableLine key={index}>
              <C.TableColumn> {item.data}</C.TableColumn>
              <C.TableColumn>
                <C.Category color={item.tipo == "Despesa" ? '#CCC' : 'secundary'}>
                  {item.categoria}
                </C.Category>
              </C.TableColumn>
              <C.TableColumn> {item.tipo}</C.TableColumn>
              <C.TableColumn> {item.descricao}</C.TableColumn>
              <C.TableColumn
                style={{ color: item.tipo === "Despesa" ? "red" : "blue" }}
              >
                {" "}
                {"R$ " +
                  item.valor.toLocaleString("pt-br", {
                    minimumIntegerDigits: 2,
                  })}
              </C.TableColumn>
              {/* BOTÃO ATUALIZAR */}
              <C.Action>
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
              <C.Action>
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
