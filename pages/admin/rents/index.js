import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import AdminNav from '../../../components/AdminNav'
export default function Rents() {
const [canceled, setcanceled] = useState([])
const [actives, setactives] = useState([])
const [noactive, setnoactive] = useState([])

  useEffect(() => {
   getRents()
  }, []);

  const getRents = async()=>{
      var canc =[]
      var act =[]
      var noact =[]
    await axios
    .get("https://desolate-sea-14156.herokuapp.com/rent")
    .then((response) =>{
        response.data.forEach(rent => {
            if (!rent.cancelated && rent.active && rent.confirmed){
                act.push(rent)
            }
            else if(rent.cancelated){
               canc.push(rent)
            }
            else if(!rent.active || !rent.confirmed){
                noact.push(rent)
            }
        });
        setactives(act)
        setcanceled(canc)
        setnoactive(noact)
    })
  }

  return (
    <>
    <AdminNav/>
      <header>
        <h2>Lista de rentas :</h2>
      </header>
      <main>
        <section>
          <h2>Rentas activas</h2>
          <hr />
          <div className="list">
              {actives.length < 1 ? <h3>No existe ninguna renta activa en el sistema</h3> :actives.map(rent=>(
                  <div className="card">
                      <div className="col">
                          <img src={rent.imageCar} alt="" />
                      </div>
                  <div className="col">
                <h3>{`Precio total : ${rent.price} $`}</h3>
                <h3>{`Dias de reserva : ${rent.days} `}</h3>

                </div>
                <div className="col">
                <h3>{`Lugar de recogida : ${rent.location}`}</h3>
                <h3>{`Fecha de recogida : ${new Date(rent.pickUp).getUTCDate()}/${new Date(rent.pickUp).getMonth()+1}/${new Date(rent.pickUp).getFullYear()}`}</h3>
                <h3>{`Fecha de entrega : ${new Date(rent.dropOff).getUTCDate()}/${new Date(rent.dropOff).getMonth()+1}/${new Date(rent.dropOff).getFullYear()}`}</h3>
                </div>
                <div className="col">
                <h3>{`Cliente : ${rent.user_name}`}</h3>
               </div>

                  <div className="buttons">
                  <Link href={`/admin/rents/${rent._id}`}><a>Ver Detalles</a></Link>
                  </div>
                  </div>
              ))}
          </div>
        </section>
        <section>
          <h2>Rentas canceladas</h2>
<hr />
          <div className="list">
          {canceled.length < 1 ? <h3>No existe ninguna renta cancelada en el sistema</h3> : canceled.map(rent=>(
                  <div className="card">
                      <div className="col">
                          <img src={rent.imageCar} alt="" />
                      </div>
                  <div className="col">
                <h3>{`Precio total : ${rent.price} $`}</h3>
                <h3>{`Dias de reserva : ${rent.days} `}</h3>

                </div>
                <div className="col">
                <h3>{`Lugar de recogida : ${rent.location}`}</h3>
                <h3>{`Fecha de recogida : ${new Date(rent.pickUp).getUTCDate()}/${new Date(rent.pickUp).getMonth()+1}/${new Date(rent.pickUp).getFullYear()}`}</h3>
                <h3>{`Fecha de entrega : ${new Date(rent.dropOff).getUTCDate()}/${new Date(rent.dropOff).getMonth()+1}/${new Date(rent.dropOff).getFullYear()}`}</h3>
                </div>
                <div className="col">
                <h3>{`Cliente : ${rent.user_name}`}</h3>
               </div>
                <div className="buttons">
                <Link href={`/admin/rents/${rent._id}`}><a>Ver Detalles</a></Link>
                  </div>
                  </div>
              ))}
          </div>
        </section>
        <section>
          <h2>Rentas inactivas</h2>
<hr />
          <div className="list">
          {noactive.length < 1 ? <h3>No existe ninguna renta inactiva en el sistema</h3> : noactive.map(rent=>(
                  <div className="card">
                      <div className="col">
                          <img src={rent.imageCar} alt="" />
                      </div>
                  <div className="col">
                <h3>{`Precio total : ${rent.price} $`}</h3>
                <h3>{`Dias de reserva : ${rent.days} `}</h3>

                </div>
                <div className="col">
                <h3>{`Lugar de recogida : ${rent.location}`}</h3>
                <h3>{`Fecha de recogida : ${new Date(rent.pickUp).getUTCDate()}/${new Date(rent.pickUp).getMonth()+1}/${new Date(rent.pickUp).getFullYear()}`}</h3>
                <h3>{`Fecha de entrega : ${new Date(rent.dropOff).getUTCDate()}/${new Date(rent.dropOff).getMonth()+1}/${new Date(rent.dropOff).getFullYear()}`}</h3>
                </div>
                <div className="col">
                <h3>{`Cliente : ${rent.user_name}`}</h3>
                <h3>{!rent.active ? 'El usuario borró su cuenta' : 'El usuario no confirmó la renta'}</h3>
               </div>
                <div className="buttons">
                    <Link href={`/admin/rents/${rent._id}`}><a>Ver Detalles</a></Link>
                  </div>
                  </div>
              ))}
          </div>
        </section>
      </main>
      <style jsx>{`
      header{
          background:#000;
          color:#fff;
          padding:10px 0;
      }
      .col{
          display:flex;
          flex-wrap:wrap;
          flex-direction:column
      }
      main{
          display:flex;
          flex-direction:column
      }
      .list{
          display:flex;
          justify-content:center;
          flex-wrap:wrap

      }
      .buttons{
        position:absolute;
        bottom:20px;
        right:10px;
      }
      h3{
          margin:10px 10px;
      }
      h2{
        text-shadow: 0px 0px 2px rgba(0, 0, 0,1);

      }
      .card{
        margin:10px;
          display:flex;
          justify-content:center;
          flex-wrap:wrap;
          position:relative;
          box-shadow: 0px 0px 8px rgba(0, 0, 0,1);

      }
      img{
          width:250px;
          height:200px
      }
      a{
        padding:15px 20px;
        background-color:#0008;
        color:#fff;
        border:none
      }
      h2,h3{
          text-align:center
      }

      @media only screen and (max-width: 800px) {
        .buttons{
        position:absolute;
        top:20px;
        right:10px;
      }
      }
      `}</style>
    </>
  );
}
