import "./styles.css";
import { useNavigate } from "react-router-dom";
import { getItem, setItem } from "../../store";
import { useEffect, useState } from "react";
import Logo from "../../Assets/logo.png";
import Alert from "../../Components/Alert";
import api from "../../Api/index";

export default function Login() {

  const navigate = useNavigate();
  // [alert, setAlert] = [<variavel_aramzena_valor>, <função_usada_para_alterar_valor>]: descontrução de array
  const [alert, setAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  // hook, invocado a cada modicação das variáveis dentro do array / []. Caso array / [] esteja vazio, execurá somente como carrega o componete "Login".  
  useEffect(() => {
    const token = getItem('token')
    if (token) navigate('/home')
  }, [])

  // ... ou spread operator, para não modificar todos atributos do objeto, o spread permite modificar somente valores de atributos especificados, mantedo os valores anteriores do restante dos atributos
  const handlerChangeInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlerSubmit = async (e) => {
    // "preventDefault", não dá "F5" / recarrega no formulário ao submeter
    e.preventDefault();

    // Se formulário correto, redireciona para "home"
    try { 
      // Requisição para o Backend com credênciais e verificação do token de resposta
      // const respost = await api.post("/login", form);
      // const { token } = respost.data;

      // setItem("token", token);
      setItem("token", "umtokenvalido")
      navigate("/home");

    } catch (error) {
      // Se formulário errado, exibe mensagem"
      // Função descontruída que modifica estado da variável "alertMsg" com o valor "Todos os campos são obrigatórios"
      setAlertMsg("Todos os campos são obrigatórios")
      msgAlert()
    }
  };

  // Exibe mensagem de alerta
  function msgAlert() {
    // iniciou "false" e mudou para "true"
    setAlert(true)
    // depois de 2 segundos, retorna valor para "false"
    setTimeout(() => {
      setAlert(false)
      clearTimeout()
    }, 2000)
  }

  return (
    <div className="container-start">
      <img className="logo" src={Logo} alt="Logo Dindin"></img>
      <div className="login-main">
        <div className="login-main__info">
          <h1>
            Controle suas
            <span style={{ color: "#FFDB00" }}> finanças</span>,
            sem planilha chata.
          </h1>
          <p>
            Organizar as suas finanças nunca foi tão fácil,
            com o DINDIN, você tem tudo num único lugar e
            em um clique de distância.
          </p>
          <button
            className="purple-btn"
            onClick={() => navigate("/sign-up")}
          >
            Cadastre-se
          </button>
        </div>
        <div className="login-main__card">
          <h3>Login</h3>

          <form onSubmit={(e) => handlerSubmit(e)}>
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={(e) => handlerChangeInput(e)}
            />
            <label>Password</label>
            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={(e) => handlerChangeInput(e)}
            />
            <button type="submit" className="purple-btn">
              Entrar
            </button>
          </form>

        </div>
        {/* "alert"=true, renderiza componente Alert */}
        {alert && <Alert style={{ top: "20%" }} msgAlert={alertMsg} />}
      </div>
    </div>
  );
}
