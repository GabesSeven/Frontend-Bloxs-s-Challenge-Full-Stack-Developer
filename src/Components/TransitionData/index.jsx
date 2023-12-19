import "./styles.css";
import { useState } from "react";
import EditBtn from "../../Assets/edit-btn.svg";
import DeleteBtn from "../../Assets/delete-btn.svg";
import PopUpDeleteItem from "../../Components/DeleteItem-popup";
import separator from "../../utils";

export default function TransitionData({
  lineInfo,
  Transaction,
  setOpenUpdate,
  setForms
}) {

  const [pop, setPop] = useState(false);
  const { data, descricao, categoria_nome, valor, tipo, id } = lineInfo;
  const week = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  const dataTransaction = new Date(data);
  let newFormatWeek = dataTransaction.getMonth() + 1;
  if (newFormatWeek < 10) {
    newFormatWeek = `0${newFormatWeek}`;
  }
  let dataFormatada = `
    ${dataTransaction.getDate()}/${newFormatWeek}/${dataTransaction.getFullYear()}
    `;
  const weekDay = dataTransaction.getDay();

  return (

    <div className="line-data">
      <span className="day">{dataFormatada}</span>
      <span className="day-week">{week[weekDay]}</span>
      <span className="descript">{descricao}</span>
      <span className="category">{categoria_nome}</span>
      <span className={
        tipo === "entrada"
          ?
          "valor credit"
          :
          "valor debit"
      }
      >
        R$ {separator(valor)}
      </span>
      <div className="nav-line-data">
        <img
          className="btn-line-data"
          src={EditBtn}
          onClick={() => {
            setOpenUpdate(true);
            setForms({
              valor: lineInfo.valor,
              categoria_id: lineInfo.categoria_id,
              data: lineInfo.data,
              descricao: lineInfo.descricao,
              tipo: lineInfo.tipo,
              id: lineInfo.id,
            });
          }}
          alt="Editar"
        />
        <img
          className="btn-line-data"
          src={DeleteBtn}
          alt="Deletar"
          onClick={() => setPop(!pop)}
        />
        {pop && <PopUpDeleteItem id={id} setPop={setPop} Transaction={Transaction} />}
      </div>
    </div>
  );
}
