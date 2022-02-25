import * as C from './styles';
import { formatCurrentMonth } from '../../util/data.ts';
import { ResumoItem } from '../resumoItem';
import {useState,useEffect} from 'react';
import { FaCashRegister } from "react-icons/fa";
import CategoryIcon from '@material-ui/icons/Category';



export const InfoArea = ({ currentMonth, onMonthChange, income, expense,onOpenEnt,onOpenCat}) => {
    const[ShowConta,setShowConta] = useState(false)
    const[Saldo, setSaldo]= useState('1000');
   
    let strExpense = expense.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    let strIncome = income.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    let result = (income - expense).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  
    
    useEffect(() => {
        // db.findOne({ _id: id }, function (err, doc) {
        //     if (err) return console.log(err);           
        //     if(doc.Saldo != null){
        //         return setSaldo(doc.Saldo.toLocaleString('pt-br', { minimumIntegerDigits: 2 }));
        //     }           
        //   });
      }, []);

    const handlePrevMonth = () => {
        let [year, month] = currentMonth.split('-');
        let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
        currentDate.setMonth(currentDate.getMonth() - 1);
        onMonthChange(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`);
    }

    const handleNextMonth = () => {
        let [year, month] = currentMonth.split('-');
        let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
        currentDate.setMonth(currentDate.getMonth() + 1);
        onMonthChange(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`);
    }

    function closeConta() {
        setShowConta(!ShowConta);
        window.location.reload();
      }
      function toggleConta() {
        setShowConta(!ShowConta);
      }

  
    return (
        <C.Container>
            <C.MonthArea>
                <C.MonthArrow onClick={handlePrevMonth}>⬅️</C.MonthArrow>
                <C.MonthTitle>{formatCurrentMonth(currentMonth)}</C.MonthTitle>
                <C.MonthArrow onClick={handleNextMonth}>➡️</C.MonthArrow>
            </C.MonthArea>
            <C.ResumeArea>
                <ResumoItem title="Receitas" value={strIncome} />
                <ResumoItem title="Despesas" value={strExpense} color={'red'} />
                <ResumoItem
                    title="Balanço"
                    value={result}
                    color={(income - expense) < 0 ? 'red' : 'green'}
                />
                 </C.ResumeArea>

                 <C.Action>
                    <button onClick={onOpenCat}>                    
                        <CategoryIcon                        
                         size={40} />
                    </button>
                </C.Action>  
                 <C.Action>
                    <button onClick={onOpenEnt}>                    
                        <FaCashRegister size={40} />
                    </button>
                </C.Action>           
         
        </C.Container>
    );
}