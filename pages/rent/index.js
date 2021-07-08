import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/router";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import {useUser} from '../../hooks/UserContext'


export default function index() {
  const router = useRouter();
  const [loading, setloading] = useState(false)
  const [carList, setcarList] = useState([])
  const [rentData, setrentData] = useState({location:null,pickUp:null,dropOff:null,pickHour:null,dropHour:null})
  const {user} = useUser()

  useEffect(() => {
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
   setloading(true)
   await axios.post("https://desolate-sea-14156.herokuapp.com/rent",rentData)
   .then(response=> router.push(`/rent/available_cars/${response.data._id}`))
   .catch(error=>setloading(false))
 }

  return (
    <>
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
  <option value="Havana">Havana</option>
  <option value="Havana Aeopuerto Terminal 2">Havana Aeopuerto Terminal 2</option>
  <option value="Havana AeropuertoTerminal 3">Havana AeropuertoTerminal 3</option>
</select>
        </div>
        <div className="inp">
        <span>
          Fecha de recogida :
        </span>
        <input type="date" name="pickUp" onChange={(e)=> onchangeSelect(e)}/>
        </div>
        <div className="inp">
        <span>
         Fecha de entrega :
        </span>
        <input type="date" name="dropOff" onChange={(e)=> onchangeSelect(e)}/>
        </div>
        <div className="inp">
        <label htmlFor="cars">Hora de recogida :</label>

        <select name="pickHour" onChange={(e)=>onchangeSelect(e)}>
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

      <style jsx>{`
      h3{
        color: red;
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
      border-radius: 10px;
      border:1px solid #eee;
      box-shadow: 0 1px #0004;
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
      }

   
      select{
        padding:10px 0px;
        width: 248px;
        border-radius:5px;
        border:1px solid #eee;
        margin-top:10px;

      }
      .lab{
        position:absolute;
        bottom:0;
        width:100%;
        background-color: #0008;
        color:#fff;
        border-radius:0 0 10px 10px;
        padding:10px 10px;
      }
        .card{
          position:relative;
          border:1px solid #eee;
          border-radius:10px;
          margin:12px 12px;
          box-shadow: 0px 4px #eee;
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
          background-color:#000;
          padding: 15px 25px;
          margin:0;
          border-radius:4px;
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
        input{
          margin:5px 6px;
          padding:10px 48px;
        border-radius:5px;
        border:1px solid #eee;
        margin-top:10px;
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
