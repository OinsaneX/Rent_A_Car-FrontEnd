import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
export default function index() {

  const [carList, setcarList] = useState([])


  useEffect(() => {
    getCars()
  }, [])


  const getCars = async()=>{
    await axios.get("https://desolate-sea-14156.herokuapp.com/car")
    .then((res)=>{
      setcarList(res.data)

    })
    
  }

  return (
    <>
      <NavBar/>
      <main>
          <h3>Rente ahora!</h3>
          <h5>...y consiga el mejor precio</h5>
        
        <section>
        <h4>Renta de autos Cuba :</h4>
        <div className="form">
        <div className="inp">
        <label for="cars">Lugar de recogida :</label>

<select name="cars" id="cars">
  <option value="volvo"></option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>
        </div>
        <div className="inp">
        <span>
          Fecha de recogida :
        </span>
        <input type="date"/>
        </div>
        <div className="inp">
        <span>
         Fecha de entrega :
        </span>
        <input type="date" />
        </div>
        <div className="inp">
        <label htmlFor="cars">Hora de recogida :</label>

        <select name="dater" id="cars">
  <option value="volvo"></option>
  <option value="saab">10:00 AM</option>
  <option value="mercedes">12:00PM</option>
  <option value="audi">18:00PM</option>
</select>
        </div>
        </div>
        <div className="search">
        <button>
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
           <div className="card">
           <img src={car.imageUrl} width="300" height="200"/>
            
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
        color: #09f;
        margin:0;
        margin-top:10px;
    font-size: 4em;
    line-height: .7em;
    cursor: default;
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
        padding:10px 80px;
        border-radius:5px;
        border:1px solid #eee;
        margin-top:10px;

      }
      .lab{
        position:absolute;
        bottom:0;
        width:100%;
        background-color: #000;
        color:#fff;
        border-radius:10px;
        padding:10px 10px;
      }
        .card{
          position:relative;
          border:1px solid #eee;
          border-radius:10px;
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
          margin:30px 30px;
          padding-bottom:40px;
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
                
                  @media only screen and (max-width: 1200px) {
                    section{
       width:90%;
     }
                  }
      `}</style>
    </>
  );
}
