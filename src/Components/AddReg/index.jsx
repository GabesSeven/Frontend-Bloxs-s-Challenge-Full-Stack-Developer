import "./style.css";
import { useState } from "react";
import { getItem } from "../../store";
import X from "../../Assets/x.svg";
import api from "../../Api";

export default function AddModal({
  setModal,
  Transaction,
  alert,
  setAlertMsg
}) {
  const [forms, setForms] = useState({
    valor: "",
    categoria_id: "",
    data: "",
    descricao: "",
    tipo: "entrada",
  });

  function setEntrada() {
    setForms({ ...forms, tipo: "entrada" });
  }

  function setSaida() {
    setForms({ ...forms, tipo: "saida" });
  }

  function handlerInputChange(e) {
    setForms({ ...forms, [e.target.name]: e.target.value });
  }

  const handlerSubmit = async (e) => {
    e.preventDefault();
    let localForms = forms
    if (!localForms.valor) {
      setAlertMsg("Registre um valor diferente de zero")
      alert()
      return
    }
    try {

      localForms.valor = String(localForms.valor * 100)
      const token = getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      await api.post("/transacao", localForms, { headers });
      window.location.reload(true)
    } catch (error) {
      setAlertMsg("Todos os campos são obrigatórios")
      alert()
    }
  };

  return (
    <div className="container-add-modal">
      <div className="add-modal">
        <strong className="add">Adicionar Registro</strong>
        <div className="buttons">
          <button
            className={
              forms.tipo === "entrada"
                ?
                "entry"
                :
                "entry off"
            }
            style={
              forms.tipo === "entrada"
                ?
                { backgroundColor: " #3A9FF1" }
                :
                { backgroundColor: "#B9B9B9" }
            }
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
                { backgroundColor: "#B9B9B9" }
            }
            onClick={(e) => setSaida()}
          >
            Saida
          </button>
        </div>

        <form className="form">
          <div className="inputs">
            <img className="x" src={X} alt="x" onClick={() => setModal(false)} />
            <div className="input-valor">
              <label>Valor</label>
              <input
                name="valor"
                type="number"
                value={forms.valor}
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
                <option value="0"></option>
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
                value={forms.data}
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
              setModal(false);
              Transaction();
            }}
          >
            Confirmar
          </button>
        </form>

      </div>
    </div>
  );
}
