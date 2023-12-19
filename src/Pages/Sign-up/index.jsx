import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../../Assets/logo-dindin.svg";
import Alert from "../../Components/Alert";
import api from "../../Api";

export default function Signup() {

  const navigate = useNavigate();
  const [alert, setAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmacao: "",
  });

  const changeInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (form.senha !== form.confirmacao) {
      setAlertMsg("Digite a senha corretamente")
      msgAlert()
      return
    }
    try {
      await api.post("/usuario", form);
      navigate("/login");
    } catch (error) {
      setAlertMsg("Todos os campos são obrigatórios")
      msgAlert()
    }
  };

  const loginReturn = () => {
    navigate("/login")
  }

  function msgAlert() {
    setAlert(true)
    setTimeout(() => {
      setAlert(false)
      clearTimeout()
    }, 2000)
  }

  return (

    <div className="container-start">
      <img className="logo" src={Logo} alt="Logo Dindin" />
      <div className="signup-main__card">
        <h3>Cadastre-se</h3>

        <form onSubmit={(e) => handlerSubmit(e)}>
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={(e) => changeInput(e)}
          />
          <label>E-mail</label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={(e) => changeInput(e)}
          />
          <label>Senha</label>
          <input
            type="password"
            name="senha"
            value={form.senha}
            onChange={(e) => changeInput(e)}
          />
          <label>Confirmacão de senha</label>
          <input
            type="password"
            name="confirmacao"
            value={form.confirmacao}
            onChange={(e) => changeInput(e)}
          />
          <button
            type="submit"
            className="purple-btn"
            onClick={(e) => handlerSubmit(e)}
          >
            Cadastrar
          </button>
        </form>
        <span className="click-here" onClick={loginReturn}>
          Já tem cadastro? Clique aqui!
        </span>
      </div>
      {alert && <Alert msgAlert={alertMsg} />}
    </div>
  );
}
