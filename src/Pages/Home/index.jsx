import "./styles.css";
import { getItem } from "../../store";
import { useEffect, useState } from "react";
import TransitionData from "../../Components/TransitionData";
import FilterActive from "../../Components/FilterActive";
import EditPerfil from "../../Components/EditPerfil";
import UpdateReg from "../../Components/UpdateReg";
import Alert from "../../Components/Alert";
import Header from "../../Components/Header";
import Resume from "../../Components/Resume";
import AddReg from "../../Components/AddReg";
import Arrowdown from "../../Assets/arrowdown.svg";
import IconAsc from '../../Assets/asc-img.svg'
import Filter from '../../Assets/filter.svg'
import api from "../../Api";

export default function Home() {
  const token = getItem("token");
  const headers = { Authorization: `Bearer ${token}` };
  const [modal, setModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [arrow, setArrow] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [infoUser, setInfoUser] = useState([])
  const [alert, setAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")
  const [forms, setForms] = useState({
    valor: "",
    categoria_id: "",
    data: "",
    descricao: "",
    tipo: "entrada",
  });

  // hook, invocado a cada modicação das variáveis "openUpdate" e "modal".  
  useEffect(() => {
    Transaction();
  }, [openUpdate, modal]);

  const handlerDate = () => {
    if (arrow) {
      transaction.sort((a, b) => {
        return new Date(a.data) - new Date(b.data);
      });
      setArrow(!arrow);
    } else {
      transaction.sort((a, b) => {
        return new Date(b.data) - new Date(a.data);
      });
      setArrow(!arrow);
    }
  };

  async function Transaction() {
    try {
      let localTransaction = transaction
      let localInfoUser = infoUser

      const respost = await api.get("/transacao", { headers })
      const respostUser = await api.get("/usuario", { headers })

      localTransaction = [...respost.data]
      localInfoUser = [respostUser.data]

      setTransaction(localTransaction)
      setInfoUser(localInfoUser[0])
    } catch (error) {
      return
    }
  }

  function msgAlert() {
    setAlert(true)
    setTimeout(() => {
      setAlert(false)
      clearTimeout()
    }, 2000)
  }

  return (

    <div className="container-home">
      <Header modal={editModal} setEdit={setEditModal} User={infoUser} />
      <div className="home-main">
        <div className="home-main-nav">
          <button
            className="btn-filtro"
            onClick={() => { setFilterOpen(!filterOpen) }}
          >
            <img src={Filter} alt="Filtro" />
            Filtrar
          </button>
          <div className="box-main__filter-transaction">
            <div className="filter">
              {filterOpen &&
                <FilterActive
                  key='FiltroATV'
                  token={token}
                  transactions={transaction}
                  setTransactions={setTransaction}
                />}
              <div className="table-info">
                <div className="table-info-categories">
                  <div className="data__asc-dsc">
                    <h3>Data</h3>

                    <img
                      src={arrow ? IconAsc : Arrowdown}
                      onClick={() => {
                        handlerDate();
                      }}
                      alt="setas"
                    />
                  </div>
                  <h3>Dia da semana</h3>
                  <h3>Descrição</h3>
                  <h3>Categoria</h3>
                  <h3>Valor</h3>
                </div>
                <div className="transaction-box-data">
                  {transaction.map((transactionLine) => (
                    <TransitionData
                      key={transactionLine.id}
                      lineInfo={transactionLine}
                      Transaction={Transaction}
                      setOpenUpdate={setOpenUpdate}
                      setForms={setForms}
                    />))}
                </div>
              </div>
            </div>
            <Resume setModal={setModal} transaction={transaction} />
          </div>
        </div>
      </div>
      {modal &&
        <AddReg
          setModal={setModal}
          Transaction={Transaction}
          alert={msgAlert}
          setAlertMsg={setAlertMsg}
        />
      }
      {openUpdate &&
        <UpdateReg
          setOpenUpdate={setOpenUpdate}
          setForms={setForms}
          forms={forms}
          Transaction={Transaction}
          setAlertMsg={setAlertMsg}
          alert={msgAlert}
        />
      }
      {editModal &&
        <EditPerfil
          setEdit={setEditModal}
          edit={editModal}
          token={token}
          setAlertMsg={setAlertMsg}
          alert={msgAlert}
        />
      }
      {alert && <Alert msgAlert={alertMsg} />}
    </div>
  );
}
