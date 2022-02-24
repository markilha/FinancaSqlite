import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.div`
    background-color: darkblue;
    height: 150px;
    text-align: center;
`;

export const HeaderText = styled.h1`
    margin: 0;
    padding: 0;
    color: #FFF;
    padding-top: 30px;
`;

export const Body = styled.div`
    margin: auto;
    max-width: 980px;
    margin-bottom: 50px;
`;

export const Table = styled.table`
    width: 100%;
    background-color: #FFF;
    padding: 20px;
    box-shadow: 0px 0px 5px #CCC;
    border-radius: 10px;
    margin-top: 20px;
`;

export const TableHeadColumn = styled.th`
    width: ${props => `${props.width}px`}
    padding: 10px 0;
    text-align: ${props => props.align};
`;

export const TableLine = styled.tr``;

export const TableColumn = styled.td`
    padding: 10px 0;
`;

export const Category = styled.div`
    display: inline-block;
    padding: 5px 10px;
    border-radius: 5px;
    color: ${props => props.color}
    background-color: #FFF;
`;

export const Value = styled.div`
    color: #FFF;
`;


export const ContainerArea = styled.div`
    background-color: #FFF;
    box-shadow: 0px 0px 5px #CCC;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    display: flex;
    align-items: center;
`;
export const InputLabel = styled.label`
    flex: 1;
    margin: 10px;
`;
export const InputTitle = styled.div`
    font-weight: bold;
    margin-bottom: 5px;
`;
export const Input = styled.input`
    width: 100%;
    height: 30px;
    padding: 0 5px;
    border: 1px solid lightblue;
    border-radius: 5px;
`;
export const Select = styled.select`
    width: 100%;
    height: 30px;
    padding: 0 5px;
    border: 1px solid lightblue;
    border-radius: 5px;
`;
export const Button = styled.button`
    width: 100%;
    height: 30px;
    padding: 0 5px;
    border: 1px solid lightblue;
    border-radius: 5px;
    background-color: lightblue;
    color: black;
    cursor: pointer;

    &:hover {
        background-color: blue;
        color: white;
    }
`;
export const Action = styled.td`
border: 0;
padding:5px;
align-items: center;
display: inline-block;
border-radius: 4px;
`;