import Link from "next/link";
import NavBar from "../../components/NavBar";
export default function index() {
  return (
    <>
      <NavBar/>
      <main>
          <h3>Rente ahora!
          </h3>
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
        <input type="date" />
        </div>
        <div className="inp">
        <span>
         Fecha de entrega :
        </span>
        <input type="date" />
        </div>
        <div className="inp">
        <label for="cars">Hora de recogida :</label>

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
          Buscar
        </button>
        </div>
       
        </section>
       <div className="list">
         <div className="card">
         <img src="imgs/Cars/Cytroen.png" width="250" height="200"/>
          
          <div className="lab">
          <span className="block">Hyundai i10 o similar</span>
          <span  className="block">4x4</span>
          <span className="block">Precio por dia a partir de ...</span>
          <p className="price">$ 86</p>
          </div>
         </div>
       
        
       </div>
      </main>

      <style jsx>{`
      h3{
        color: #09f;
        margin:0;
    font-family: 'TodayShop-Ultra';
    font-size: 4em;
    line-height: .7em;
    cursor: default;
      }
     section{
      padding:20px 20px;
      width:70%;
      background-color: #eee;
      border-radius: 30px;
     }
     .form{
       display:flex;
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
    font-family: 'TodayShop-Bold';
    font-size: 1.42em;
    line-height: 2vw;
    cursor: default;
    margin:0;
    margin-bottom:10px;
      }
      select{
        padding:10px 48px;
        border-radius:5px;
        border:none;
        margin-top:10px;

      }
      .lab{
        position:absolute;
        bottom:0;
        width:100%;
        background-color: #eee;
      }
        .card{
          position:relative;
          border:1px solid #eee;
          border-radius:10px;
          margin:12px 12px;
        }
        p{
          text-align:center;
        }
        .list{
          display:flex;
          align-content:center;
          flex-wrap:wrap;
          justify-content:center;

        }
        .inp{
          width:50%;
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
          background-color:#0009;
          padding: 20px 30px;
          border-radius:8px;
          border:none;
          color:#fff;
        }
        img{
          margin:30px 30px;
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
        }
        @media only screen and (max-width: 800px) {
          .search{
       display:flex;
       justify-content:center;
       align-items: center;
       align-content: center;
     }
     .inp{
          width:90%;
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
