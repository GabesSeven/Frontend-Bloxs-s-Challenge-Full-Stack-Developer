import "./style.css";
import X from "../../Assets/x.svg";

export default function AddModal({ setModal, setReg }) {

  return (
    <div className="container-add-modal">
      <div className="add-modal">
        <strong className="add">Editar Registro</strong>
        <div className="buttons">
          <button 
            className="entry-btn" 
            onClick={() => setReg(true)}
          >
            Entrada
          </button>
          <button className="out-btn">Saída</button>
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

      </div>
    </div>
  )
}
