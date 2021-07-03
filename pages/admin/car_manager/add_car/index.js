import axios from 'axios';
import { useState } from 'react';
import "react-notifications/lib/notifications.css";

import { NotificationManager,NotificationContainer } from 'react-notifications';
import AdminNav from '../../../../components/AdminNav'
export default function AddCar() {

    const [carData, setcarData] = useState({brand:'',model:'',description:'',imageUrl:'',price_per_day:0,ports:0})
    const [loading, setloading] = useState(null)


    const onWrite = (e) =>{
        setcarData({...carData,[e.target.name]:e.target.value})
    }

    function onAddImage(e) {
        e.preventDefault();
        var file = e.target.files[0];
        var formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          'u45m9vyq'
        );
        setloading(1);
        axios
          .post(
            `https://api.cloudinary.com/v1_1/dxyv7aypq/image/upload`,
            formData
          )
          .then((response) => {
            setloading(null);
    
            setcarData({ ...carData, imageUrl: response.data.secure_url });
          })
          .catch((error) => {console.log(error)})
          ;
          
      }
      const resetData =()=>{
          setcarData({brand:'',model:'',description:'',imageUrl:'',price_per_day:0})
      }

      const addNewCar = async() => {
          console.log(carData)

          await axios.post("https://desolate-sea-14156.herokuapp.com/car",carData)
          .then(response=> {
            resetData()  
            NotificationManager.success("Se ha añadido el auto al sistema","Éxito",2000)
            
        })
        .catch((error) => {NotificationManager.error(
            "A veces ocurre este error",
            "Error",
            3000
          )})
      }


    return (
        <div>
               <NotificationContainer />
            <AdminNav/>
            <main>
               <header>
               <h2>Agregar nuevo auto al sistema</h2>
                <p>Ingrese todos los datos del nuevo auto .Verifique bien antes de enviar</p>
               </header>
                <section>

                    <form action="submit">

                        <input type="text" name="brand" value={carData.brand} onChange={(e)=>onWrite(e)} placeholder="Marca"/>
                        <input type="text" name="model" value={carData.model} onChange={(e)=>onWrite(e)} placeholder="Modelo"/>
                        <h4>Descripción :</h4>
                        <textarea name="description" value={carData.description} onChange={(e)=>onWrite(e)} id="" cols="30" rows="10"></textarea>
                        <div className="form-group">
                        <div >
                        <h5>Precio por día</h5>
                        <input className="margin" type="number" name="price_per_day" value={carData.price_per_day} onChange={(e)=>onWrite(e)} placeholder="Precio por dia"/>
                        </div>
                        <div>
                        <h5>Cant de puertas</h5>
                        <input className="margin" type="number" name="ports" value={carData.ports} onChange={(e)=>onWrite(e)} placeholder="Cantidad de puertas"/>

                        </div>
                        </div>

                        <label  htmlFor="upload">Escoger imagen</label>
                        <input id="upload" type="file" accept="image/*" onChange={(e)=>onAddImage(e)} placeholder="imagen"/>
                    </form>
                    
                   <div className="example">
                       {
                           loading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>

                       }
                   <div className="card">
                           <h3>{carData.brand=== '' ? "Marca y Modelo " : `${carData.brand}  ${carData.model}`}</h3>

                          
                             {carData.imageUrl !== "" &&  <button className="remove" onClick={()=>setcarData({...carData, imageUrl:''})}><p>X</p>  </button>}  
                          
                           <img src={carData.imageUrl} alt="" />
                           
                           <span>{carData.price_per_day} $ Por dia</span>
                           
                        </div>

                        <button onClick={()=>addNewCar()}>
                            Agregar auto
                        </button>
                   </div>
                </section>
            </main>

            <style jsx>{`
            input {
  margin-top: 7px;
  margin-bottom: 7px;
  padding: 10px 20px;
  border: 1px solid #eee;
  border-radius: 5px;
}
p{
    margin:0;
}
.form-group{
    display:flex;
    justify-content: center;
    text-align:center;
}
header{
    text-align:center;
}
.example{
    display:grid;
    place-content: center;
    place-items:center;
}
.margin{
    margin:0 10px;
}
img{
    width:320px;
    height:200px;
    margin: 10px 10px;
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
form{
    display:flex;
    flex-direction:column;
    padding:0 30%;
}
.image-control{
    display:grid;
    place-content:center;
    place-items:center
}
h4{
    margin:0
}
button{
     margin: 10px 10px;
    padding:10px 15px;
     border: 1px solid #333;
     border-radius: 4px;
     background-color: #0009;
    color: #fff;
    transition:all ease-in 0.3s;
  }

button:hover{
background-color: #000;
    }

::placeholder{
    text-align:center;

}
input[type="file"] {
     display: none;
 }

.remove{
    margin: 0;
    background-color: #eee;
    color:#000;
    border-radius:999px;
}
.remove:hover{
    color:#fff;
}
label {
    text-align:center;
    margin:12px 20%;
  padding: 12px 18px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #000;
  font-size: 16px;
  color: #fff;
}

            `}</style>
        </div>
    );
}