import "./style.css";
import { useEffect, useState } from "react";
import X from "../../Assets/x.svg";
import api from "../../Api";


export default function AddModal({ setEdit, token, alert, setAlertMsg }) {

  const headers = { Authorization: `Bearer ${token}` }
  const [editPerfil, setEditPerfil] = useState([])
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmacao: ""
  });

  useEffect(() => {
    perfilEdit()
  }, [])

  async function perfilEdit() {
    try {
      let localPerfil = editPerfil
      const respost = await api.get("/usuario", {
        headers
      });
      localPerfil = respost.data
      setEditPerfil(localPerfil)
      setForm({
        nome: localPerfil.nome,
        email: localPerfil.email,
        senha: "",
        confirmacao: ""
      })
    } catch (error) {
      return
    }
  }

  const handlerChangeInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.email === '' || form.nome === '' || form.senha === '') {
        setAlertMsg("Todos os campos são obrigatórios")
        alert()
        return
      }
      if (form.senha !== form.confirmacao) {
        setAlertMsg("Digite a senha corretamente")
        alert()
        return
      }
      await api.put("/usuario", {
        nome: form.nome,
        email: form.email,
        senha: form.senha
      },
        { headers }
      )
      setEdit(false)
      window.location.reload(false)
    } catch (error) {
      setAlertMsg(error.message)
      alert()
    }
  };

  return (
    <div className="container-add-modal">
      <div className="add-modal">
        <strong className="add">Editar Perfil</strong>

        <form className="form">
          <div className="inputs">
            <img
              className="x"
              src={X}
              alt="x"
              onClick={() => setEdit(false)}
            />
            <div className="input-valor">
              <label>Nome</label>
              <input
                value={form.nome}
                name="nome"
                type="text"
                id="nome"
                onChange={(e) => handlerChangeInput(e)}
              />
            </div>
            <div className="input-categoria">
              <label>E-mail</label>
              <input
                value={form.email}
                type="text"
                name="email"
                id="email"
                onChange={(e) => handlerChangeInput(e)}
              />
            </div>
            <div className="input-data">
              <label>Senha</label>
              <input
                type="password"
                name="senha"
                id="senha"
                value={form.senha}
                onChange={(e) => handlerChangeInput(e)}
              />
            </div>
            <div className="input-desc">
              <label>Confirmação de senha</label>
              <input
                type="password"
                name="confirmacao"
                id="confirmacao"
                value={form.confirmacao}
                onChange={(e) => handlerChangeInput(e)}
              />
            </div>
          </div>
          <button
            className="btn-form purple-btn"
            onClick={handlerSubmit}
          >
            Confirmar
          </button>
        </form>

      </div>
    </div>
  )
}
