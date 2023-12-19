import "./style.css";
import { getItem } from "../../store";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../Api";

export default function Resume({ setModal, transaction }) {

  const [value, setValue] = useState({
    enter: 0,
    expense: 0,
    balance: 0,
  });

  useEffect(() => {
    home();
  }, [transaction]);

  const home = async () => {
    try {
      const token = getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await api.get("/transacao", { headers });

      const transaction = await response.data;
      const resultsEnter = transaction.filter((element) => {
        return element.tipo === "entrada";
      });

      const resultsExpense = transaction.filter((element) => {
        return element.tipo === "saida";
      });
      const enter = resultsEnter.reduce((acum, element) => {
        return Number(acum) + Number(element.valor);
      }, 0);
      const expense = resultsExpense.reduce((acum, element) => {
        return Number(acum) + Number(element.valor);
      }, 0);

      setValue({ enter, expense, balance: enter - expense });
    } catch (error) {
      return
    }
  };

  function formatCurrency(valor) {
    return new Intl.NumberFormat("pt-br", { style: "currency", currency: "BRL" }).format(valor / 100);
  }

  return (

    <div className="container-resume">
      <div className="resume">
        <strong className="resumo">Resumo</strong>
        <div className="entrada-saida">
          <div className="entrada">
            <p>Entrada</p>
            <span>{`${formatCurrency(value.enter)}`}</span>
          </div>
          <div className="saida">
            <p>Saídas</p>
            <span>{`${formatCurrency(value.expense)}`}</span>
          </div>
        </div>
        <div className="saldo">
          <strong>Saldo</strong>
          <span style={
            Number(value.balance) >= 0
              ?
              { color: '#3A9FF1' }
              :
              { color: 'rgb(255, 87, 107)' }
          }>
            {`${formatCurrency(value.balance)}`}</span>
        </div>
      </div>
      <button
        className="add-register purple-btn"
        onClick={() => setModal(true)}
      >
        Adicionar Registro
      </button>
    </div>
  );
}
