import "./styles.css";
import { getItem } from "../../store";
import popup from "../../Assets/popup-ballon.svg";
import api from "../../Api";

export default function PopUpDeleteItem({ id, setPop, Transaction }) {
  const handlerDelete = async () => {
    try {
      const token = getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      await api.delete(`/transacao/${id}`, { headers });
      window.location.reload(false)
    } catch (error) {
      return
    }
  };

  return (
    <div className="container-popup">
      <img className="popupArrow" src={popup} alt="Arrow"></img>
      <div className="container-choise">
        <span className="choice">Apagar Item?</span>
        <div className="btns-choise">
          <button
            className="btn-Y"
            onClick={() => {
              handlerDelete();
              setPop(false);
              Transaction();
            }}
          >
            Sim
          </button>
          <button
            className="btn-N"
            onClick={() => setPop(false)}
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
}
