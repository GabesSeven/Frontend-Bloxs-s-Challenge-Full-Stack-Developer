import "./styles.css";
import { clear } from "../../store";
import { useNavigate } from "react-router-dom";
import Logo from "../../Assets/logo.png";
import Profile from "../../Assets/profile.svg";
import Exit from "../../Assets/exit-page.svg";

export default function Header({ modal, setEdit, User }) {

  const navigate = useNavigate();

  return (
    <header>
      <div className="header-logo">
        <img
          src={Logo}
          alt="Logo Dindin"
        ></img>
      </div>
      <div className="header-nav">
        <img
          className="header-nav__perfil-btn"
          src={Profile}
          alt="Ícone Profile"
          onClick={() => setEdit(!modal)}
        ></img>
        <span>{User.nome}</span>
        <img
          className="header-nav__exit-btn"
          src={Exit}
          alt="Ícone de Saída"
          onClick={() => {
            clear();
            navigate("/login");
          }}
        ></img>
      </div>
    </header>
  );
}
