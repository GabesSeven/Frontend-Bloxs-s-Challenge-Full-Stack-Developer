import "./styles.css";
import { clear, getItem } from "../../store";
import { useNavigate } from "react-router-dom";
import Logo from "../../Assets/logo.png";
import Profile from "../../Assets/profile.svg";
import Exit from "../../Assets/exit-page.svg";
import api from "../../Api/index";

export default function Header({ modal, setEdit, User }) {

  const navigate = useNavigate();

  // const logout = async () => {
  //   const token = getItem('token')
  //   try { 
  //     const response = await api.post(
  //       "http://127.0.0.1:5000/logout",
  //       token,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       }
  //     );
  //     clear();
  //     navigate("/login");
  //   } catch (error) {
  //     console.log(error)
  //   }
  // };

  const logout = async () => {
    const token = getItem('token');
  
    try { 
      const response = await api.post(
        "http://127.0.0.1:5000/logout",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

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
            logout();
          }}
        ></img>
      </div>
    </header>
  );
}
