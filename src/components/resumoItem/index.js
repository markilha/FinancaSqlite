import * as C from './styles';


export const ResumoItem = ({ title, value, color }) => {
    return (
        <C.Container>
            <C.Title>{title}</C.Title>
            <C.Info color={color}>R$ {value}</C.Info>
        </C.Container>
    );
}