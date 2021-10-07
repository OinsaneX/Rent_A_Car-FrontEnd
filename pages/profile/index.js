import { useEffect, useState } from 'react'
import {useUser} from '../../hooks/UserContext'
import User from '../../svgs/img/User'
import {useRouter} from 'next/router'
import axios from 'axios';
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState(null)
    const {getUser} = useUser()
    const [rents, setrents] = useState([])
    const [works, setworks] = useState([])
  
    useEffect(() => {
      getUser(async(res)=>{
        if(!res){
            router.replace("/login")
        }  
        else{
            setUser(res)
            getRents(res._id)
            if(res.role=="driver"){
                await axios.get(`https://desolate-sea-14156.herokuapp.com/rent/getRentsByDriver/${res._id}`)
                .then(response=> setworks(response.data))
            }
        }
     })
    }, [])
  

    const getRents = async(res_id)=> {
         await axios.get(`https://desolate-sea-14156.herokuapp.com/rent/user/${res_id}`)
        .then(response =>setrents(response.data))
    }

    const cancelRent = async(id) =>{
        confirmAlert({
            title: 'Confirmar',
            message: 'Estas seguro que deseas cancelar la renta.',
            buttons: [
              {
                label: 'Si',
                onClick: async() => {
                    await axios.get(`https://desolate-sea-14156.herokuapp.com/rent/${id}/cancel`)
                    .then(() => {
                        NotificationManager.success("Renta cancelada con suceso", "Ok", 3000);
                        getRents()
                    })

                }
              },
              {
                label: 'No',
                onClick: () => {}
              }
            ]
          })
    }

    return (
        <>
        <NotificationContainer />
        <header>
           <div className="imgUser">
           <User/>
           </div>
           {user && <div className="dataUser">
            <h3>
            Usuario: {user.username}
            </h3>
            <h3>
                Email : {user.email}
            </h3>
            <h3>
                Nacionalidad : {user.nacionality}
            </h3>
            <h3>
                Nombre : {user.name}
            </h3>
            <h3>
                Rol : {user.role}
            </h3>
            <h3>
                País : {user.country}
            </h3>
            <h3>
                Teléfono : {user.phone}
            </h3>
           </div>}
        </header>

       {user && user.role=="client" &&  <main>
            <h2>
                Tus reservas : 
            </h2>

            <section> 
            {rents.map((rent)=>(
              !rent.cancelated && <div className="card">
                   <div className="close" onClick={() => cancelRent(rent._id)}>
                       <h1> Cancelar</h1>
                   </div>
                   <img src={rent.imageCar} alt="" />
                   <div className="info">
                   <div className="col">
                <h3>{`Precio total : ${rent.price} $`}</h3>
                <h3>{`Dias de reserva : ${rent.days} `}</h3>

                </div>
                <div className="col">
                <h3>{`Lugar de recogida : ${rent.location}`}</h3>
                <h3>{`Fecha de recogida : ${new Date(rent.pickUp).getDate()}/${new Date(rent.pickUp).getMonth()+1}/${new Date(rent.pickUp).getFullYear()}`}</h3>
                <h3>{`Fecha de entrega : ${new Date(rent.dropOff).getDate()}/${new Date(rent.dropOff).getMonth()+1}/${new Date(rent.dropOff).getFullYear()}`}</h3>
                </div>
                <div className="col flex1">
                <h3>{`Cliente : ${user.name}`}</h3>
                <h3>{`La renta ${!rent.confirmed ? "no" : ""} ha sido confirmada`}</h3>
                </div>

                   </div>
               </div>
            ))}
            </section>
        </main>}


        {user && user.role=="driver" && <main>
        <h2>
                Tus trabajos pendientes : 
            </h2>
            <section>
                {works.map((work)=>(
                   <div className="card">
                       <div className="info">
                   <div className="col">
                <h3>{`Precio total : ${work.price} $`}</h3>
                <h3>{`Dias de reserva : ${work.days} `}</h3>

                </div>
                <div className="col">
                <h3>{`Lugar de recogida : ${work.location}`}</h3>
                <h3>{`Fecha de recogida : ${new Date(work.pickUp).getDate()}/${new Date(work.pickUp).getMonth()+1}/${new Date(work.pickUp).getFullYear()} a las ${work.pickHour} ${work.pickHour < 12 ? 'AM' : 'PM'}`}</h3>
                <h3>{`Fecha de entrega : ${new Date(work.dropOff).getDate()}/${new Date(work.dropOff).getMonth()+1}/${new Date(work.dropOff).getFullYear()} a las ${work.dropHour} ${work.dropHour < 12 ? 'AM' : 'PM'}`}</h3>
                </div>
                <div className="col flex1">
                <h3>{`Cliente : ${user.name}`}</h3>
                <h3>{`La renta ${!work.confirmed ? "no" : ""} ha sido confirmada`}</h3>
                </div>

                   </div>
                        </div>
                ))}
            </section>
            </main>}
           
          <style jsx>
              {`
              header{
                  display:flex;
                  flex-direction: column;
                  align-items: center;
                  align-content: center;
                 
              }
              h1{
                  margin:0;
                  color:#fff;
              }
              .close{
                  position:absolute;
                  top:5px;
                  right:5px;
                  padding: 6px 8px;
                  background-color: red;
                  cursor:pointer;
                  box-shadow: 0px 0px 10px rgba(255, 0, 0,1);

              }
              .card{
                  position:relative;
                  width:95vw;
                  margin:10px 0;
                  display:flex;
                  flex-wrap: wrap;
                  justify-content:center;
                  background-color: #eee;
                  box-shadow: 0px 0px 10px rgba(0, 0, 0,1);

              }
              .col{
                  display:flex;
                  flex-direction: column;
              }
              .imgUser{
                  display:flex;
                  justify-content:center;
                  margin:30px 30px;
              }
              .dataUser{
                  margin:0 5px;
                display:flex;
                justify-content:center;
                flex-wrap: wrap;
                background-color: #eee;
                box-shadow: 0px 0px 10px rgba(0, 0, 0,1);

              }
              img{
               width:250px;
              }
              section{
                  display:flex;
                  flex-direction: column;
                  align-content: center;
                  align-items: center;

              }
              .info{
                  display:flex;
                  flex-wrap: wrap;
                  align-content: center;
                  align-items: center;
              }
              h3{
                  margin:5px 20px;
              }
              h2{
                  text-align: center;
              }

              @media only screen and (max-width: 940px) {
                .col{
                    width:100%;
                    text-align: center
                }
                }

              `}
          </style>
        </>
    );
}