import * as C from './styles';
import { useState,useContext } from 'react';
import { FiDelete, FiEdit2 } from "react-icons/fi";
import api from '../../services/api'
import {AuthContext} from '../../contexts/auth';




export const Tabela = ({ lista}) => {
   

      const [showPostModal, setShowPostModal] = useState(false);
      const {atual,setAtual} = useContext(AuthContext);

     async function handleDelete(id){
          try{
            if (window.confirm("Deseja realmente excluir a entrada?")) {
                const response = await api.delete(`/entrada/${id}`); 
               setAtual(!atual);
            }
              
          }catch(err){
              console.log(err)
          }
      }
  

  

    return (
        <>
        <C.Table>
            <thead>
                <tr>
                    <C.TableHeadColumn align='center' width={100}>Data</C.TableHeadColumn>
                    <C.TableHeadColumn align='center'  width={130}>Categoria</C.TableHeadColumn>
                    <C.TableHeadColumn align='center'  width={130}>Tipo</C.TableHeadColumn>
                    <C.TableHeadColumn align='center' >Título</C.TableHeadColumn>
                    <C.TableHeadColumn align='left'  width={100}>Valor</C.TableHeadColumn>
                </tr>
            </thead>
            <tbody>
                {lista.map((item, index) => (
                    <C.TableLine key={index}>
                        <C.TableColumn> {item.data}</C.TableColumn>
                        <C.TableColumn>
                            {item.categoria}
                            {/* <C.Category color={item.tipo == "Despesa" ? 'red' : 'blue'}>
                                {item.categoria}
                            </C.Category> */}
                        </C.TableColumn>
                        <C.TableColumn> {item.tipo}</C.TableColumn>
                        <C.TableColumn> {item.descricao}</C.TableColumn>
                        <C.TableColumn style={{ color: item.tipo === 'Despesa' ? 'red' : 'blue' }}> {"R$ " + (item.valor).toLocaleString('pt-br', { minimumIntegerDigits: 2 })}</C.TableColumn>

                        <C.Action>
                            <button onClick={() => alert('togglePostModal(item)') }>
                                {" "}
                                <FiEdit2 />
                            </button>
                        </C.Action>
                        <C.Action>
                            <button onClick={() => handleDelete(item.id)}>
                                {" "}
                                <FiDelete />
                            </button>
                        </C.Action>
                    </C.TableLine>
                ))}
            </tbody>
        </C.Table>
         {/* {showPostModal && <Modal conteudo={detail} close={closeModal} />} */}
         </>
    )
}

