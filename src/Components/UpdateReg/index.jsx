import "./style.css";
import { getItem } from "../../store";
import { useEffect, useState } from "react";
import X from "../../Assets/x.svg";
import api from "../../Api";

export default function AddModal({
  setOpenUpdate,
  setForms,
  forms,
  Transaction,
  setAlertMsg,
  alert
}) {

  const [update, setUpdate] = useState(false);
  const [firstvalue, setFirstValue] = useState(true)

  useEffect(() => {
    Transaction();
  }, [update]);

  function setEntrada() {
    setForms({ ...forms, tipo: "entrada" });
  }

  function setSaida() {
    setForms({ ...forms, tipo: "saida" });
  }

  function handlerInputChange(e) {
    if (e.target.name === 'valor') {
      setFirstValue(false)
    }
    setForms({ ...forms, [e.target.name]: e.target.value });
  }

  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (forms.valor === '' || forms.data === '' || forms.descricao === '') {
      setAlertMsg("Todos os campos são obrigatórios")
      alert()
      return
    }
    try {
      let localForms = forms
      if (!firstvalue) localForms.valor = String(localForms.valor * 100)
      const token = getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      await api.put(`/transacao/${forms.id}`, localForms, { headers });
      window.location.reload(false)
    } catch (error) {
      return
    }
  };

  function handlerData(data) {
    const dataTransaction = new Date(data);
    let newFormatWeek = dataTransaction.getMonth() + 1;
    if (newFormatWeek < 10) {
      newFormatWeek = `0${newFormatWeek}`;
    }
    let dataFormatada = `
      ${dataTransaction.getDate()}/${newFormatWeek}/${dataTransaction.getFullYear()}
      `;
    return dataFormatada;
  }

  return (

    <div className="container-add-modal">
      <div className="add-modal">
        <strong className="add">Atualizar Registro</strong>
        <div className="buttons">
          <button
            className={
              forms.tipo === "entrada"
                ?
                "entry"
                :
                "entry off"}
            style={
              forms.tipo === "entrada"
                ?
                { backgroundColor: " #3A9FF1" }
                :
                { backgroundColor: "#B9B9B9" }}
            onClick={(e) => setEntrada()}
          >
            Entrada
          </button>
          <button
            className={
              forms.tipo === "saida"
                ?
                "out"
                :
                "out off"
            }
            style={
              forms.tipo === "saida"
                ?
                { backgroundColor: "#FF576B" }
                :
                { backgroundColor: "#B9B9B9" }}
            onClick={(e) => setSaida()}
          >
            Saida
          </button>
        </div>

        <form className="form">
          <div className="inputs">
            <img
              className="x"
              src={X}
              alt="x"
              onClick={() => setOpenUpdate(false)}
            />
            <div className="input-valor">
              <label>Valor</label>
              <input
                name="valor"
                type="number"
                value={
                  firstvalue
                    ?
                    forms.valor / 100
                    :
                    forms.valor
                }
                onChange={(e) => handlerInputChange(e)}
              />
            </div>
            <div className="input-categoria">
              <label>Categoria</label>
              <select
                name="categoria_id"
                value={forms.categoria_id}
                onChange={(e) => handlerInputChange(e)}
              >
                <option value="1">Alimentação</option>
                <option value="2">Assinatura e Serviços</option>
                <option value="3">Casa</option>
                <option value="4">Mercado</option>
                <option value="5">Cuidados Pessoais</option>
                <option value="6">Educação</option>
                <option value="7">Família</option>
                <option value="8">Lazer</option>
                <option value="9">Pets</option>
                <option value="10">Presentes</option>
                <option value="11">Roupas</option>
                <option value="12">Saúde</option>
                <option value="13">Transporte</option>
                <option value="14">Salário</option>
                <option value="15">Vendas</option>
                <option value="16">Outras receitas</option>
                <option value="17"> Outras despesas</option>
              </select>
            </div>
            <div className="input-data">
              <label>Data</label>
              <input
                type="text"
                name="data"
                value={handlerData(forms.data)}
                onChange={(e) => handlerInputChange(e)}
              />
            </div>
            <div className="input-desc">
              <label>Descrição</label>
              <input
                type="text"
                name="descricao"
                value={forms.descricao}
                onChange={(e) => handlerInputChange(e)}
              />
            </div>
          </div>
          <button
            className="btn-form purple-btn"
            type="submit"
            onClick={(e) => {
              handlerSubmit(e);
              setUpdate(!update);
              setOpenUpdate(false);
            }}
          >
            Confirmar
          </button>
        </form>

      </div>
    </div>
  );
}
