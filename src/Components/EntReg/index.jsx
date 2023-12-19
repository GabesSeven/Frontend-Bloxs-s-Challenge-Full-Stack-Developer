import "./style.css";
import { useState } from "react";
import { getItem } from "../../store";
import X from "../../Assets/x.svg";
import api from "../../Api";

export default function AddModal({ setModal }) {

  const [form, setForm] = useState({
    valor: "",
    categoria_id: "",
    data: "",
    descricao: "",
    tipo: "entrada",
  });

  function setEntrada() {
    setForm({ ...form, tipo: "entrada" });
  }

  function setSaida() {
    setForm({ ...form, tipo: "saida" });
  }

  function handlerInputChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      await api.post("/transacao", form, { headers });
    } catch (error) {
      return
    }
  };

  return (

    <div className="container-add-modal">
      <div className="add-modal">
        <strong className="add">Adicionar Registro</strong>
        <div className="buttons">
          <button
            className="entry"
            style={
              form.tipo == "entrada"
                ?
                { backgroundColor: " #3A9FF1" }
                :
                { backgroundColor: "#B9B9B9" }}
            onClick={(e) => setEntrada()}
          >
            Entrada
          </button>
          <button
            className="out"
            style={form.tipo == "saida"
              ?
              { backgroundColor: "#FF576B" }
              :
              { backgroundColor: "#B9B9B9" }}
            onClick={(e) => setSaida()}
          >
            Saida
          </button>
        </div>

        <form
          className="form"
          onSubmit={(e) => handlerSubmit(e)}
        >
          <div className="inputs">
            <img
              className="x"
              src={X}
              alt="x"
              onClick={() => setModal(false)}
            />
            <div className="input-valor">
              <label for="valor">Valor</label>
              <input
                name="valor"
                type="number"
                id="valor"
                value={form.valor}
                onChange={(e) => handlerInputChange(e)}
              />
            </div>
            <div className="input-categoria">
              <label for="categoria">Categoria</label>
              <input
                type="selected"
                name="categoria_id"
                id="categoria"
                value={form.categoria}
                onChange={(e) => handlerInputChange(e)}
              />
            </div>
            <div className="input-data">
              <label for="data">Data</label>
              <input
                type="text"
                name="data"
                id="data"
                value={form.data}
                onChange={(e) => handlerInputChange(e)}
              />
            </div>
            <div className="input-desc">
              <label for="descricao">Descrição</label>
              <input
                type="text"
                name="descricao"
                id="descricao"
                value={form.descricao}
                onChange={(e) => handlerInputChange(e)}
              />
            </div>
          </div>
          <button
            className="btn-form"
            type="submit"
            onClick={() => setModal(false)}
          >
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
}
