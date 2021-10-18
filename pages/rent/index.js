import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/router";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import {useUser} from '../../hooks/UserContext'
import "react-notifications/lib/notifications.css";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Footer from "../../components/Footer";

export default function index() {
  const hoursArray = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"]
  const today = `${new Date().getFullYear()}-${String(new Date().getMonth()+1).padStart(2,0)}-${String(new Date().getDate()).padStart(2,0)}`

  const router = useRouter();
  const [loading, setloading] = useState(false)
  const [carList, setcarList] = useState([])
  const [rentData, setrentData] = useState({location:null,pickUp:today,dropOff:today,pickHour:null,dropHour:null,driverReq:false,driver_Id:null,driver_name:null})
 const {getUser} =  useUser()
  useEffect(() => {
    getUser((response)=>{
      if(response){
        if(response.role == 'admin'){
          router.replace('/admin/user/manager')
        }
        else if(response.role == 'comercial'){
          router.replace('/admin/car_manager')
  
        }
        else if(response.role == 'client' || response.role == 'driver'){
          router.replace('/rent')
  
        }
      }
    })
    getCars()
  }, [])


  const getCars = async()=>{
    await axios.get("https://desolate-sea-14156.herokuapp.com/car")
    .then((res)=>{
      setcarList(res.data)

    })
    
  }

  const onchangeSelect = (e) => {
    console.log(e.target.name ,e.target.value)
   setrentData({...rentData, [e.target.name]: e.target.value})
  }



 const onSubmit =async ()=>{
   if(!rentData.location){
    NotificationManager.error(
    "Introduzca el lugar de Recogida",
    "Error",
    2000
   )
   }
   else if(!rentData.pickHour){
    NotificationManager.error(
    "Introduzca la hora de Recogida",
    "Error",
    2000
     )
   }
   else if(!rentData.dropHour){
    NotificationManager.error(
    "Introduzca la hora de Entrega",
    "Error",
    2000
     )
   }
   else if((new Date(rentData.dropOff).getTime()-new Date(rentData.pickUp).getTime())/ (1000 * 60 * 60 * 24)<1){
    NotificationManager.error(
    "La fecha de entrega debe ser como minimo 1 dia despues de la fecha de recogida",
    "Error",
    4000
     )
   }
   else{



    setloading(true)

    if(rentData.driverReq)
   {
    await axios.post("https://desolate-sea-14156.herokuapp.com/rent/searchDriversAvailable",rentData)
    .then(async(res)=>{
      if(res.data._id){
        await axios.post("https://desolate-sea-14156.herokuapp.com/rent",{...rentData,driver_Id:res.data._id,driver_name:res.data.name})
        .then(response=> router.push(`/rent/available_cars/${response.data._id}`))
        .catch(error=>{setloading(false)
          NotificationManager.error("Error en la conexion",
          "Error",
          4000)})
      }
      else{
        NotificationManager.error("No hay choferes disponibles para esa fecha",
        "Error",
        4000)

        setloading(false)
      }
    })
 .catch(err=>console.log(err))
   }
   else{
    await axios.post("https://desolate-sea-14156.herokuapp.com/rent",rentData)
    .then(response=> router.push(`/rent/available_cars/${response.data._id}`))
    .catch(error=>setloading(false))
   }
   }
  
 }


  const checkHandler = (e)=>{
    setrentData({...rentData, [e.target.name]: e.target.checked})
  }

  return (
    <>
    <NotificationContainer/>
      <NavBar/>
      <main>
     {loading &&  <div className="loader"></div>}

          <h3>Rente ahora!</h3>
          <h5>...y consiga el mejor precio</h5>
        
        <section>
        <h4>Renta de autos Cuba :</h4>
        <div className="form">
        <div className="inp">
        <label htmlFor="cars">Lugar de recogida :</label>

<select name="location" onChange={(e)=> onchangeSelect(e)}>
  <option value=""></option>
  <option value="Camaguey Aeropuerto">Camaguey Aeropuerto</option>
  <option value="Artemisa">Artemisa</option>
  <option value="Baracoa Airport">Baracoa Airport</option>
  <option value="Camaguey">Camaguey</option>
  <option value="Habana">Havana</option>
  <option value="Habana Aeopuerto Terminal 2">Havana Aeopuerto Terminal 2</option>
  <option value="Habana AeropuertoTerminal 3">Havana AeropuertoTerminal 3</option>
</select>
        </div>
        <div className="inp">
        <span>
          Fecha de recogida :
        </span>
        <input type="date" value={rentData.pickUp} name="pickUp" min={today} onChange={(e)=> onchangeSelect(e)}/>
        </div>
        <div className="inp">
        <span>
         Fecha de entrega :
        </span>
        <input type="date" value={rentData.dropOff} name="dropOff" min={rentData.pickUp} onChange={(e)=> onchangeSelect(e)}/>
        </div>
        <div className="inp">
        <label htmlFor="cars">Hora de recogida :</label>

        <select name="pickHour" onChange={(e)=>onchangeSelect(e)}>
  <option value={null}></option>
  {rentData.pickUp == today ? hoursArray.map(hour=>(
    new Date().getHours()<hour && <option key={hour} value={hour}>{`${hour}:00 ${hour <12 ? "AM" : "PM"}`}</option>
   
  ))
:hoursArray.map(hour=>(
  <option key={hour} value={hour}>{`${hour}:00 ${hour <12 ? "AM" : "PM"}`}</option>
))
}
</select>
        </div>
        <div className="inp">
        <label htmlFor="cars">Hora de entrega :</label>

        <select name="dropHour" onChange={(e)=>onchangeSelect(e)}>
  <option value={null}></option>
  <option value="0">12 AM</option>
  <option value="1">1 AM</option>
  <option value="2">2 AM</option>
  <option value="3">3 AM</option>
  <option value="4">4 AM</option>
  <option value="5">5 AM</option>
  <option value="6">6 AM</option>
  <option value="7">7 AM</option>
  <option value="8">8 AM</option>
  <option value="9">9 AM</option>
  <option value="10">10 AM</option>
  <option value="11">11 AM</option>
  <option value="12">12 PM</option>
  <option value="13">1 PM</option>
  <option value="14">2 PM</option>
  <option value="15">3 PM</option>
  <option value="16">4 PM</option>
  <option value="17">5 PM</option>
  <option value="18">6 PM</option>
  <option value="19">7 PM</option>
  <option value="20">8 PM</option>
  <option value="21">9 PM</option>
  <option value="22">10 PM</option>
  <option value="23">11 PM</option>
</select>
        </div>
        <div className="inp">
        <span>
         Requiere Chofer :
        </span>
        <input type="checkbox" name="driverReq"  onChange={(e)=> checkHandler(e)}/>
        </div>

        </div>
        <div className="search">
        <button onClick={()=>onSubmit()}>
          <p>Buscar</p>
        </button>
        </div>
       
        </section>
        <h4>
          Autos disponibles en la empresa :
        </h4>
       <div className="list">
        {carList.length==0 ?
         <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        :  carList.map(car=>(
           <div className="card" key={car._id}>
           <img src={car.imageUrl} width="270" height="180"/>
            
            <div className="lab">
            <span className="block">{car.brand + car.model}</span>
            <span  className="block">4x4</span>
            <span className="block">Precio por dia a partir de ...</span>
            <p className="price">$ {car.price_per_day}</p>
            </div>
           </div>
        ))}
       
        
       </div>
      </main>

      <Footer></Footer>

      <style jsx>{`
      h3{
        color: red;
        text-shadow: 0px 0px 10px rgba(255, 0, 0,1);

        margin:0;
        margin-top:10px;
    font-size: 4em;
    line-height: .7em;
    cursor: default;
      }
      .loader {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background: url('imgs/load.gif') 50% 50% no-repeat rgb(249,249,249);
        opacity: .8;
    }
     section{
      padding:20px 20px;
      width:80vw;
      background-color: #fff;
      border:1px solid #eee;
      box-shadow: 0px 0px 10px rgba(0, 0, 0,1);
      

    }
     .form{
       display:flex;
       justify-content:center;
       align-items: center;
       align-content: center;
       flex-wrap: wrap;
     }
    
     .search{
       display:flex;
       flex-direction: row-reverse;
       margin:10px 10px;
     }
      h5{
        color: #000;
    font-size: 1.42em;
    line-height: 2vw;
    cursor: default;
    margin:0;
    margin-bottom:10px;
    text-shadow: 0px 0px 10px rgba(0, 0, 0,1);

      }

   
      select{
        padding:10px 0px;
        width: 248px;
        border:1px solid #eee;
        margin-top:10px;
        box-shadow: 0px 0px 4px rgba(0, 0, 0,1);


      }
      .lab{
        position:absolute;
        bottom:0;
        width:100%;
        background-color: #0008;
        color:#fff;
        padding:10px 10px;
      }
        .card{
          box-shadow: 0px 0px 10px rgba(0,0,0,.8);
          position:relative;
          margin:12px 12px;
        }
        p{
          text-align:center;
          margin:0;
          font-size:18px;
        }
        label,span{
          text-align:center;
        }
        .list{
          display:flex;
          margin:0 ;
          align-content:center;
          flex-wrap:wrap;
          justify-content:center;

        }
        .inp{
          display:flex;
          flex-direction:column;
          align-items: center;
          width:240px;
          margin:10px 20px;
        }
        .price{
          position: absolute;
    bottom: 2px;
    right: 8px;
        }
        h4{
          font-style:italic;
          font-size:22px;
          
        }
        button{
          box-shadow: 0px 0px 10px rgba(0, 0, 0,1);
          background-color:#000;
          padding: 15px 25px;
          margin:0;
          border:none;
          color:#fff;
        }
        img{
          margin:30px 10px;
          padding-bottom:10px;
        }
        .block{
          display:block;
        }
     
        main {
          display:grid;
          place-content:center;
          place-items:center;
          
        }
        input[type=text],input[type=date]{
          margin:5px 6px;
          width:248px;
        border:1px solid #eee;
        margin-top:10px;
        box-shadow: 0px 0px 4px rgba(0, 0, 0,1);

        }
       
        @media only screen and (max-width: 800px) {
          .search{
       display:flex;
       justify-content:center;
       align-items: center;
       align-content: center;
     }
    
    
                  }
                
                  @media only screen and (min-width: 1200px) {
                    section{
       width:90%;
     }
     .list{
      margin:0 5%;
     }
                  }
      `}</style>
    </>
  );
}
