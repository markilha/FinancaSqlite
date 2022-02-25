import React, { useEffect, useState, useContext } from "react";
import * as C from "./styles";
import api from "../../services/api";
import { Tabela } from "../../components/tabela";
import { AuthContext } from "../../contexts/auth";
import { InfoArea } from "../../components/infoArea";
import Popup from "../../components/Popup";
import { getCurrentMonth, filtroPorMes } from "../../util/data.ts";
import Notification from "../../components/Notification";
import ModalAdd from "../../components/modal/modalAdd";
import ModalCategoria from "../../components/modal/modalCategoria";

export default function Entrada() {
  const { atual, setAtual } = useContext(AuthContext); 
  
  const [dados, setDados] = useState([]);
  const [filtro, setFiltro] = useState([]);
  const [mesAtual, setMesAtual] = useState(getCurrentMonth());
  const [renda, setRenda] = useState(0);
  const [despesa, setDespesa] = useState(0);
  const [openPopup, setOpenPopup] = useState(true);  
  const [onOpenCat, setOpenCat] = useState(true);  

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  }); 
 
  useEffect(() => {
    async function loadData() {
      const response = await api.get("/entrada");
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

  const onOpenPoupCat = () => {
    setOpenCat(!onOpenCat);
  };


  //ENSERIR E EDITAR
  async function handleAddEvent(valores) {    
    let errors = [];
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

      if(valores.repetir > 0){
        let [ano, mes, dia] = valores.data.toString().split("-");

        for(var i=0;i< valores.repetir;i++){  
          
          var m = parseInt(mes) + i;
          let newMes = "";

          if(m > 12){           
            newMes = m - 12;  
            ano = parseInt(ano) + 1;          
          }else{
            newMes = m;
          }
          newMes = ("00" + newMes).slice(-2); 

          var dados = {
            data: `${ano}-${newMes}-${dia}`,
            categoria: valores.categoria,
            descricao: valores.descricao,
            tipo: valores.tipo,
            valor: parseFloat(valores.valor.toString().replace(",", ".")),
          };    
          const response = await api.post("/entrada", dados);
        }
        
      }else{

        var dados = {
          data: valores.data,
          categoria: valores.categoria,
          descricao: valores.descricao,
          tipo: valores.tipo,
          valor: parseFloat(valores.valor.toString().replace(",", ".")),
        };     
        const response = await api.post("/entrada", dados);
      }
     

      setNotify({
        isOpen: true,
        message: "Inserido com sucesso",
        type: "success",
      });
      setAtual(!atual);
      setOpenPopup(!openPopup);
    }
  }

  return (
    <C.Section>
      <div className="grid">
        <C.Header>
          <C.HeaderText>Sistema Financeiro</C.HeaderText>
        </C.Header>
        <C.Body>
          <InfoArea
            currentMonth={mesAtual}
            onMonthChange={handleMonthChange}
            income={renda}
            expense={despesa}
            onOpenEnt={onOpenEnt}
          />
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
            openPopup={onOpenCat}
            setOpenPopup={setOpenCat}
          >
           <ModalCategoria onOpenCat onOpenPoupCat={onOpenPoupCat} />
          </Popup>

          <Notification notify={notify} setNotify={setNotify} />


          <Tabela lista={filtro} />
        </C.Body>
      </div>
    </C.Section>
  );
}
