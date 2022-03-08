export const getCurrentMonth = () => {
  let now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}`;
};

export const filtroPorMes = (list, date) => {
  let newList = [];
  let [year, month] = date.split("-");

  for (let i in list) {
    let [ano, mes, dia] = list[i].data.toString().split("-");
    if (parseInt(ano) === parseInt(year) && parseInt(mes) === parseInt(month)) {
      newList.push(list[i]);
    }
  }

  return newList;
};

export const carregaUser = (list) => {
  let newList = [];
  for (let i in list) {
    newList.push(list[i]);
  }
  return newList;
};

export const balanco = (list, date) => {
  let rendaCont = 0;
  let despesaCont = 0;
  let [year, month] = date.split("-");
  for (let i in list) {
    let [ano, mes] = list[i].data.toString().split("-");
    if (parseInt(ano) === parseInt(year) && parseInt(mes) === parseInt(month)) {
      if (list[i].tipo === "Despesa") {
        despesaCont += list[i].valor;
      } else {
        rendaCont += list[i].valor;
      }
    }
  }
  let result = rendaCont - despesaCont;

  return {
    receita: rendaCont,
    despesa: despesaCont,
    saldo: result,
  };
};

export const SomaStatus = (list, date) => {
  let pending = 0;
  let paidout = 0;
  let [year, month] = date.split("-");
  for (let i in list) {
    let [ano, mes] = list[i].data.toString().split("-");
    if (parseInt(ano) === parseInt(year) && parseInt(mes) === parseInt(month)) {

      if (list[i].estatus == "Pendente" && list[i].tipo == "Despesa") {
        pending += list[i].valor;
      } else {
        paidout += list[i].valor;
      }
    }
  }
  return {
    pendente: pending,
    pago: paidout   
  };
};

export const SomaCategoria = (list, date) => { 
  let [year, month] = date.split("-");
  let newArray = [];

  for (let i in list) {
    let [ano, mes] = list[i].data.toString().split("-");
    if (parseInt(ano) === parseInt(year) && parseInt(mes) === parseInt(month)) {
      newArray.push({
        categoria: list[i].categoria,
        soma: parseFloat(list[i].soma.toFixed(2)),
      })       
    }
  }
  return newArray;
};  

export const formatDate = (date) => {
  let [ano, mes, dia] = date.toString().split("-");

  return `${addZeroToDate(parseInt(dia))}/${addZeroToDate(
    parseInt(mes)
  )}/${ano}`;
};
const addZeroToDate = (n) => (n < 10 ? `0${n}` : `${n}`);

export const formatCurrentMonth = (currentMonth) => {
  let [year, month] = currentMonth.split("-");
  let months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  return `${months[parseInt(month) - 1]} de ${year}`;
};

export const retornaMes = (date) => {
  let [ano, mes, dia] = date.split("-");
  let months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  return `${months[parseInt(mes) - 1]}`;
};
