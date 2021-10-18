import Link from "next/link";
import "react-notifications/lib/notifications.css";
import InputMask from "react-input-mask";
import { useRouter } from "next/router";
import RegisterImage from '../../svgs/img/Register'
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useState } from "react";
import axios from "axios";
import SelectCountry from "../../components/SelectCountry";
import {ValidateCI} from '../../utils/Validation'

export default function Home() {
  const router = useRouter();
  const [passConfirm, setpassConfirm] = useState(null)
  const [form, setform] = useState({
    name: "",
    username:"",
    email:"",
    identity: "",
    nacionality: "",
    phone: "",
    password: "",
    conf: "",
    address:"",
    country: "",
    pasport:""
  });
  const onSubmit = async(e) => {
    e.preventDefault();
    if (form.name == "") {
      NotificationManager.error(
        "Introduzca el nombre de usuario",
        "Error",
        3000
      );
    } else if (form.email.indexOf("@") == -1) {
      NotificationManager.error("Introduzca un email válido", "Error", 3000);
    }
    else if(form.nacionality == "Cuba" && (countDigits(form.identity) < 11 || !ValidateCI(form.identity))){
      
        NotificationManager.error("Introduzca un CI válido", "Error", 3000);
    }
     else if(form.nacionality != "Cuba" && form.pasport.includes("_")){
       
          NotificationManager.error("Introduzca un pasaporte válido", "Error", 3000);

        
    }

     else if (countDigits(form.phone) < 8) {
      NotificationManager.error(
        "Introduzca un Número de celular válido",
        "Error",
        3000
      );
    } else if (form.password != form.conf) {
      NotificationManager.error("La contraseña no coincide", "Error", 3000);
    }
    else if (form.nacionality == "") {
      NotificationManager.error(
        "Introduzca su nacionalidad",
        "Error",
        3000
      )}
    else if (form.country == "") {
      NotificationManager.error(
        "Introduzca su pais de residencia",
        "Error",
        3000
      )}
      else if (form.address == "") {
        NotificationManager.error(
          "Introduzca su direccion",
          "Error",
          3000
        )}
    else {
        await axios.post("https://desolate-sea-14156.herokuapp.com/user",form)
        .then(async response=>{
        if(response.data.errUser){
            NotificationManager.error(
              "Ya existe una cuenta con ese nombre de usuario",
              "Error",
              3000
            )
          }
          else if(response.data.errIdentity){
            NotificationManager.error(
              "Ya existe una cuenta con ese documento de identidad",
              "Error",
              3000
            )
          }
          else{
            await axios.post("https://desolate-sea-14156.herokuapp.com/sendMail",{
              username: form.username,
              email:form.email,
              id:response.data._id,
              asunto:"Bienvenido a Rent_A_Car Cuba",
              mensaje:"No responda a este correo"
            })
            setform( {name: "",
            username:"",
            email:"",
            identity: "",
            nacionality: "",
            phone: "",
            password: "",
            conf: "",
            address:"",
            country: "",
            pasport:""})
            NotificationManager.success("Correo con link de confirmación enviado a su correo", "Sucesso", 2000);
            setTimeout(()=>{
              router.replace("/login");
            },2000
             
            )
          }
        
        })
     
     
       
     
    }
  };

  function countDigits(str) {
    var acu = 0;

    Array.prototype.forEach.call(str, function (val) {
      acu += val.charCodeAt(0) > 47 && val.charCodeAt(0) < 58 ? 1 : 0;
    });

    return acu;
  }

  const onChangeInput = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });

    
      if(e.target.name == "password"){
        
        form.conf == e.target.value && setpassConfirm(1)
        form.conf != e.target.value && setpassConfirm(2)
        form.conf.length == 0 && e.target.value == "" && setpassConfirm(null)
      }    
      else if(e.target.name == "conf"){
        form.password == e.target.value && setpassConfirm(1)
        form.password != e.target.value && setpassConfirm(2)
        form.password.length == 0 && e.target.value == "" && setpassConfirm(null)

      }
    

  }
  return (
    <>
      <div>
        <main>
          <NotificationContainer />
          <h2>Registro</h2>
          <RegisterImage/>
          <form>
            <section>
              <p>Nombre :</p>
              <input
                name="name"
                value={form.name}
                onChange={(e) => onChangeInput(e)}
                type="text"
                placeholder="Ej. Jorge Labrador"
              />
            </section>
            <section>
              <p>Usuario :</p>
              <input
                name="username"
                value={form.username}
                onChange={(e) => onChangeInput(e)}
                type="text"
                placeholder="Ej. Jorgito99"
              />
            </section>
            <section>
              <p>Email :</p>
              <input
                name="email"
                value={form.email}
                onChange={(e) => onChangeInput(e)}
                type="email"
                placeholder="Ej. fulano@gmail.com"
              />
            </section>
           
            <section>
              <p>Teléfono :</p>
              <InputMask
                name="phone"
                value={form.phone}
                onChange={(e) => onChangeInput(e)}
                mask="99999999"
                placeholder="Fone  Ex: xx-xx-xx-xx"
              />
            </section>
            <section>
              <p>Contraseña :</p>
              <input
                name="password"
                value={form.password}
                onChange={(e) => onChangeInput(e)}
                type="password"
                placeholder="Contraseña"
              />
            </section>
            <section>
              <p>Confirmar :</p>
              <input className="passConf"
                name="conf"
                value={form.conf}
                onChange={(e) => onChangeInput(e)}
                type="password"
                placeholder="Confirmar Contraseña"
              />
            </section>
            <section>
              <p>Nacionalidad :</p>
              <SelectCountry name="nacionality" country={form.nacionality} onChangeInput={onChangeInput}/>

            </section>
            <section>
              <p>Residencia :</p>
            <SelectCountry name="country" country={form.country} onChangeInput={onChangeInput}/>
      
            </section>
            {form.nacionality !=""&& (form.nacionality == "Cuba" ?  <section>
              <p>CI :</p>
              <InputMask
                mask="99999999999"
                name="identity"
                value={form.identity}
                onChange={(e) => onChangeInput(e)}
                placeholder="XXXXXXXXXXX"
              />
            </section>  
            :  
            <section>
            <p>Pasaporte :</p>
            <InputMask
              mask="aa999999"
              name="pasport"
              value={form.pasport}
              onChange={(e) => onChangeInput(e)}
              placeholder="AA123456"
            />
          </section>)}
            <section>
              <p>Direccion :</p>
              <input
                name="address"
                value={form.address}
                onChange={(e) => onChangeInput(e)}
                type="text"
                placeholder="Direccion"
              />
            </section>
            <button onClick={(e) => onSubmit(e)}>Registrar</button>
          </form>
          <Link href="/login">
            <a>Login ...</a>
          </Link>
        </main>
      </div>
      <style jsx>{`
        main {
          
          display: grid;
          place-content: center;
          place-items: center;
          box-shadow: 0px 0px 10px rgba(0, 0, 0,.8);
          padding:20px;
          margin:10px 0px;
        }
        a {
          margin-top: 10px;
          color: #000;
        }

        div {
          display: grid;
          place-content: center;
          place-items: center;
         
        }
        h2 {
          font-style: italic;
          margin-bottom: 20px;
          text-shadow: 0px 0px 2px rgba(0, 0, 0,1);


        }
        form {
          display: flex;
          flex-direction: column;
        }
        img {
          margin-bottom: 20px;
        }
        p {
          width: 88px;
        }
        input {
          margin-top: 7px;
          margin-bottom: 7px;
          padding: 10px 20px;
          border: 1px solid #eee;
          box-shadow: 0px 0px 5px rgba(0, 0, 0,1);
        }
       
        button {
          padding: 14px 20px;
          background-color: #000;
          color: #fff;
          border: none;
          margin-top: 20px;
          transition: all ease-in 0.7s;
          box-shadow: 0px 0px 10px rgba(0, 0, 0,1);

        }
        button:hover {
          background-color: #0009;
        }
        section {
          display: flex;
          align-items: center;
          align-content: center;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield;
        }

.passConf{
  ${passConfirm == 1 && 'box-shadow: 0px 0px 12px #1CFE37;'};
  ${passConfirm == 2 && 'box-shadow: 0px 0px 12px #FE1C1C;'}
}

      `}</style>
    </>
  );
}
