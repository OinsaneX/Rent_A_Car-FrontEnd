import { useEffect, useState } from 'react'
import {useUser} from '../../hooks/UserContext'
import User from '../../svgs/img/User'
import {useRouter} from 'next/router'
import axios from 'axios';

export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState(null)
    const {getUser} = useUser()
    const [rents, setrents] = useState([])
  
    useEffect(() => {
      getUser(async(res)=>{
        if(!res){
            router.replace("/login")
        }  
        else{
            setUser(res)
            await await axios.get(`https://desolate-sea-14156.herokuapp.com/rent/user/${res._id}`)
            .then(res =>setrents(res.data))
        }
     })
    }, [])
  

    return (
        <>
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

        <main>
            <h2>
                Tus reservas : 
            </h2>

            <section>
            {rents.map((rent)=>(
               <div className="card">
                   <div className="close">
                       <h1>X</h1>
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
                </div>

                   </div>
               </div>
            ))}
            </section>
        </main>
           
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
                  color:red
              }
              .close{
                  position:absolute;
                  top:5px;
                  right:5px;
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