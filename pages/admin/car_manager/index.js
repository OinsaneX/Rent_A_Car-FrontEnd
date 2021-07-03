import axios from "axios";
import { useEffect, useState } from "react";
import Link from 'next/link'
import "react-notifications/lib/notifications.css";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import AdminNav from '../../../components/AdminNav'

export default function Add_Car() {

    const [listCar, setListCar] = useState([])

    useEffect(() => {
        getCars()
        return () => {
            
        }
    }, [])

    const getCars = async () =>{
      await axios.get("https://desolate-sea-14156.herokuapp.com/car")
       .then((res) =>setListCar(res.data))
    }

    const deleteCar = async (id) =>{
        await axios.delete(`https://desolate-sea-14156.herokuapp.com/car/${id}`)
        .then((res) => {NotificationManager.success("Se ha eliminado del sistema el auto","Éxito",2000)
        getCars()
    })
        .catch((err) =>  NotificationManager.error(
            "A veces ocurre este error",
            "Error",
            3000
          ))
    }

    return (
        <div>
                      <NotificationContainer />

        <AdminNav/>
            <main>
                <header>
                    <h2>Pagina de Administracion</h2>
                    <p>Aqui los administradores pueden controlar los autos de la empresa</p>
                    <p>Y tener acceso a informacion sobre los servicios prestados</p>
                </header>
                <section>
                    {listCar.map((car) =>(
                        <div key={car._id} className="card">
                           <h3>{car.brand + car.model}</h3>
                           <img src={car.imageUrl} alt="" />
                           <span>{car.price_per_day} $ Por dia</span>
                           <div className="buttons">
                               <button><p>Actualizar datos</p></button>
                               <button onClick={(e)=>deleteCar(car._id)}><p>Borrar</p></button>
                           </div>

                        </div>
                    ))}
                </section>
                <div className="options">
                   <Link href="/admin/car_manager/add_car">
                   <a className="button">
                        Adicionar nuevo auto al sistema
                    </a></Link>
                </div>
            </main>

            <style jsx>{`
            section {
                display: flex;
                flex-direction: row;
                justify-content:space-around;
                align-items: center;
                align-content: center;
                flex-wrap:wrap;

            }
            .buttons{
                display: flex;
            }
            header{
                background-color:#000;
                color: #fff;
                height:200px;
                text-align: center;
            }
          
           
           
       
            h2{
                margin:0;
                padding-top:20px;
                padding-bottom:20px
            }
            button{
                margin: 10px 10px;
                padding:10px 15px;
                border: 1px solid #333;
                border-radius: 4px;
                background-color: #000;
                color: #fff;
                transition:all ease-in 0.3s;
            }
            button:hover{
                background-color: #0009;

            }
            .button{
                margin: 10px 10px;
                padding:10px 15px;
                border: 1px solid #333;
                border-radius: 4px;
                background-color: #000;
                color: #fff;
                cursor:default;
                transition:all ease-in 0.3s;

            }
            .button:hover{
                background-color: #0009;

            }
            img{
                width:340px;
                height:200px;
            }
            .card{
                display:grid;
                place-content:center;
                place-items:center;
                border: 1px solid #eee;
                max-width:400px;
                border-radius:10px;
                margin:20px 20px;
            }
            p{
                margin:0;
            }
            .options{
                display:grid;
                place-content:center;
                place-items:center;
            }
           
            `} </style>
        </div>
    );
}