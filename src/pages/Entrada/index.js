import React, { useEffect, useState,useContext } from "react"
import * as C from './styles'
import api from '../../services/api';
import {Tabela} from '../../components/tabela'
import {AuthContext} from '../../contexts/auth';


export default function Entrada() {
    const {atual,setAtual} = useContext(AuthContext);
    const [data, setData] = useState("")
    const [categoria, setCategoria] = useState("")
    const [tipo, setTipo] = useState("")
    const [descricao, setDescricao] = useState("")
    const [valor, setValor] = useState(0)
    const [dados, setDados] = useState([])
    const [filtro, setFiltro] = useState([]) 

    useEffect(()=>{
        async function loadData(){
            const response = await api.get('/entrada');
            if(response.status === 200){
                setDados(response.data);
                setFiltro(response.data);
            }
        }
        loadData();
    },[atual])

    function handleChangeCategoria(item) {

        setCategoria(item);
    }

    function limpaCampos(){
        setData('');
        setCategoria('');
        setDescricao('');
        setTipo('');
        setValor(0);
    }

   async function handleAddEvent() {
        let errors = [];
        if (isNaN(new Date(data).getTime())) {
          errors.push("Data inválida!");
        }
        if (descricao === "") {
          errors.push("Descrição esta vazia!");
        }
        if (parseFloat(valor) <= 0) {
          errors.push("Valor inválido!");
        }
        if (errors.length > 0) {
          alert(errors.join("\n"));
        } else {

          var dados = {
            data: data,
            categoria: categoria,
            descricao: descricao,
            tipo: tipo,
            valor: parseFloat(valor.replace(",", ".")),
          };

          const response = await api.post('/entrada',dados);
          setAtual(!atual);
          limpaCampos();     
        }    
      };
 
    return (
        <C.Section>
            <div className="grid">
                <C.Body>
                    <C.ContainerArea>

                        <C.InputLabel>
                            <C.InputTitle>Data</C.InputTitle>
                            <C.Input
                                type={"date"}
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                            />

                        </C.InputLabel>

                        <C.InputLabel>
                            <C.InputTitle>Categoria</C.InputTitle>
                            <C.Select
                                value={categoria}
                                onChange={(e) => handleChangeCategoria(e.target.value)}
                            >
                                <option></option>
                                <option key={"Alimentação"} value={"Alimentação"}>
                                    Alimentação
                                </option>
                                <option key={"Saúde"} value={"Saúde"}>
                                    Saúde
                                </option>
                                <option key={"Educação"} value={"Educação"}>
                                    Educação
                                </option>
                                <option key={"Combustível"} value={"Combustível"}>
                                    Combustível
                                </option>
                                <option key={"Proventos"} value={"Proventos"}>
                                    Proventos
                                </option>
                                {/* {categorias.map((item, index) => (
                <>
                  <option key={index} value={item.categoria}>
                    {item.categoria}
                  </option>
                </>
              ))} */}
                            </C.Select>
                        </C.InputLabel>

                        <C.InputLabel>
                            <C.InputTitle>Tipo</C.InputTitle>
                            <C.Select
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                            >
                                <>
                                    <option></option>
                                    <option key={"despesa"} value={"Despesa"}>
                                        Despesa
                                    </option>
                                    <option key={"receita"} value={"Receita"}>
                                        Receita
                                    </option>
                                </>
                            </C.Select>
                        </C.InputLabel>

                        <C.InputLabel>
                            <C.InputTitle>Descrição</C.InputTitle>
                            <C.Input
                                type="text"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                        </C.InputLabel>

                        <C.InputLabel>
                            <C.InputTitle>Valor</C.InputTitle>
                            <C.Input
                                type="text"
                                value={valor}
                                onChange={(e) => setValor(e.target.value)}
                            />
                        </C.InputLabel>

                        <C.InputLabel>
                            <C.InputTitle>&nbsp;</C.InputTitle>
                            <C.Button onClick={handleAddEvent}>Adicionar</C.Button>
                        </C.InputLabel>
                    </C.ContainerArea>

                    <Tabela lista={filtro} />
                </C.Body>
            </div>
        </C.Section>
    )
}