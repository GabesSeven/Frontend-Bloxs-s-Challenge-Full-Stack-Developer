import "./style.css";
import { useState } from "react";
import X from "../../Assets/x.svg";
import OutReg from "../OutReg";

export default function AddModal({ setModal }) {
  const [reg, setReg] = useState(true);

  return (
    <div className="container-add-modal">
      {reg 
      ? 
      (<div className="add-modal">
          <strong className="add">Editar Registro</strong>
          <div className="buttons">
            <button className="entry">Entrada</button>
            <button 
              className="out"
              onClick={() => setReg(false)}>
              Saída
            </button>
          </div>

          <form className="form">
            <div className="inputs">
              <img 
                className="x" 
                src={X} 
                alt="x"
                onClick={() => setModal(false)}
              />
              <div className="input-valor">
                <label for="valor">Valor</label>
                <input name="valor" type="text" />
              </div>
              <div className="input-categoria">
                <label for="categoria">Categoria</label>
                <input type="selected" name="categoria" />
              </div>
              <div className="input-data">
                <label for="data">Data</label>
                <input type="text" name="data" />
              </div>
              <div className="input-desc">
                <label for="descricao">Descrição</label>
                <input type="text" name="descricao" />
              </div>
            </div>
            <button className="btn-form">Confirmar</button>
          </form>

        </div>) 
      :
      (<OutReg setReg={setReg} setModal={setModal} />)}
    </div>
  );
}
