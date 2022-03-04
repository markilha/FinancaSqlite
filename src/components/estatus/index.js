import * as C from "./styles";


export const Estatus = ({ estatus}) => {
    return (
        <C.Container>
             {estatus === 'Pago' ? <> 🟢🟢🟢</>  : <>🔴🔴🔴</>}
        </C.Container>              
    );
}