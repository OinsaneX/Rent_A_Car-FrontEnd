import Link from "next/link";
import InputMask from "react-input-mask";
import { useEffect, useState } from "react";
import { useRouter} from 'next/router'
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import axios from "axios";


export default function PopUpRegister({close}) {

    const router = useRouter();
    const [form, setform] = useState({
      username: "",
      password: "",
    })
    const [formReg, setformReg] = useState({
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
    });
    const [loading, setloading] = useState(false);
  
  
    useEffect(() => {

      
    }, [])
  
    const onSubmitReg = async(e) => {
      e.preventDefault();
      if (formReg.name == "") {
        NotificationManager.error(
          "Introduzca el nombre de usuario",
          "Error",
          3000
        );
      } else if (formReg.email.indexOf("@") == -1) {
        NotificationManager.error("Introduzca un email válido", "Error", 3000);
      } else if (countDigits(formReg.identity) < 11) {
        NotificationManager.error("Introduzca un CI válido", "Error", 3000);
      } else if (countDigits(formReg.phone) < 8) {
        NotificationManager.error(
          "Introduzca un Número de celular válido",
          "Error",
          3000
        );
      } else if (formReg.password != formReg.conf) {
        NotificationManager.error("La contraseña no coincide", "Error", 3000);
      }
      else if (formReg.nacionality == "") {
        NotificationManager.error(
          "Introduzca su nacionalidad",
          "Error",
          3000
        )}
      else if (formReg.country == "") {
        NotificationManager.error(
          "Introduzca su pais de residencia",
          "Error",
          3000
        )}
        else if (formReg.address == "") {
          NotificationManager.error(
            "Introduzca su direccion",
            "Error",
            3000
          )}
      else {
          await axios.post("https://desolate-sea-14156.herokuapp.com/user",formReg)
          .then(async response=>{
            await axios.post("https://desolate-sea-14156.herokuapp.com/sendMail",{
              username: formReg.username,
              email:formReg.email,
              asunto:"Bienvenido a Rent_A_Car Cuba",
              mensaje:"No responda a este correo"
            })
            NotificationManager.success("Su cuenta fue creada", "Sucesso", 2000);
            await axios.post("https://desolate-sea-14156.herokuapp.com/user/login",formReg)
            .then(async response => {
              if(response.data){
                await axios.post("https://desolate-sea-14156.herokuapp.com/userlogged",response.data)
                .then(res => {
                  localStorage.setItem("token",res.data.token)
                  close()
                })
              }})
          })
       
       
         
       
      }
    };
    const onChangeInputReg = (e) => {
      setformReg({ ...formReg, [e.target.name]: e.target.value });
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
    };

    const onSubmit = async() => {
      if (form.username == "") {
        NotificationManager.error(
          "Introduzca un nombre de usuario",
          "Error",
          3000
        );
      } else if (form.password == "") {
        NotificationManager.error("Introduzca la contrasenha", "Error", 3000);
      } else {
        setloading(true);
          await axios.post("https://desolate-sea-14156.herokuapp.com/user/login",form)
          .then(async response => {
            if(response.data){
              await axios.post("https://desolate-sea-14156.herokuapp.com/userlogged",response.data)
              .then(res => {
                localStorage.setItem("token",res.data.token)
                close()
              })
            }
            else{
              setloading(false);
  
              NotificationManager.warning(
                "No existe ninguna cuenta con esos datos",
                "Error",
                3000
              );
            }
          })
  
         
      }
    }

    return (
        <div>
            <NotificationContainer />

         <div className="register">
        <div className="close" onClick={() =>close()}>
           X
        </div>
        <div className="login">
            <h4>Para reservar un auto necesitas estar registrado</h4>
        <main>
          <h2>Inicia sesion</h2>
          <section>
            <input
              type="text"
              placeholder="Usuario"
              name="username"
              onChange={(e) => onChangeInput(e)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              onChange={(e) => onChangeInput(e)}
            />

            <button onClick={(e) => onSubmit()}><p>Entrar</p></button>
          </section>
          {loading && <div className="spinner"></div>}

         
        </main>
                </div>
        <div className="reg">
        <main className="windowreg">
            <form>
                <h2>O Registrate</h2>
              <section>
                <p>Nombre :</p>
                <input
                  name="name"
                  value={formReg.name}
                  onChange={(e) => onChangeInputReg(e)}
                  type="text"
                  placeholder="Ej. Jorge Labrador"
                />
              </section>
              <section>
                <p>Usuario :</p>
                <input
                  name="username"
                  value={formReg.username}
                  onChange={(e) => onChangeInputReg(e)}
                  type="text"
                  placeholder="Ej. Jorgito99"
                />
              </section>
              <section>
                <p>Email :</p>
                <input
                  name="email"
                  value={formReg.email}
                  onChange={(e) => onChangeInputReg(e)}
                  type="email"
                  placeholder="Ej. fulano@gmail.com"
                />
              </section>
              <section>
                <p>CI :</p>
                <InputMask
                  mask="99999999999"
                  name="identity"
                  value={formReg.identity}
                  onChange={(e) => onChangeInputReg(e)}
                  placeholder="XXXXXXXXXXX"
                />
              </section>
              <section>
                <p>Teléfono :</p>
                <InputMask
                  name="phone"
                  value={formReg.phone}
                  onChange={(e) => onChangeInputReg(e)}
                  mask="99999999"
                  placeholder="Fone  Ex: xx-xx-xx-xx"
                />
              </section>
              <section>
                <p>Contraseña :</p>
                <input
                  name="password"
                  value={formReg.password}
                  onChange={(e) => onChangeInputReg(e)}
                  type="password"
                  placeholder="Contraseña"
                />
              </section>
              <section>
                <p>Confirmar :</p>
                <input
                  name="conf"
                  value={formReg.conf}
                  onChange={(e) => onChangeInputReg(e)}
                  type="password"
                  placeholder="Confirmar Contraseña"
                />
              </section>
              <section>
                <p>Nacionalidad :</p>
                <input
                  name="nacionality"
                  value={formReg.nacionality}
                  onChange={(e) => onChangeInputReg(e)}
                  type="text"
                  placeholder="Nacionalidad"
                />
              </section>
              <section>
                <p>Pais :</p>
                <input
                  name="country"
                  value={formReg.country}
                  onChange={(e) => onChangeInputReg(e)}
                  type="text"
                  placeholder="Pais"
                />
              </section>
              <section>
                <p>Direccion :</p>
                <input
                  name="address"
                  value={formReg.address}
                  onChange={(e) => onChangeInputReg(e)}
                  type="text"
                  placeholder="Direccion"
                />
              </section>
            </form>
            <button onClick={(e) => onSubmitReg(e)}><p>Registrar</p></button>

          </main>
        </div>
        </div>     
            <style jsx>{`
             section {
                display: flex;
                align-items: center;
                align-content: center;
              }
              p{
                  margin:0;
              }
               .register{
                   top:0;
                position:fixed;
                width:100vw;
                height:100vh;
                
                display:flex;
                flex-wrap: wrap;
                color:#fff;
                overflow-y: scroll;
            }
         
            .login{
                width:100%;
                background-color: #000000F7;
                min-width:300px;
                height:400px;
            }
            .close{
                position:absolute;
                top:40px;
                color:#000;
                right:10px;
                box-shadow: 0px 0px 12px rgba(255, 0, 0,.8);
                background-color: red;
                border-radius:999px;
                padding: 10px 15px;
                cursor: pointer;
                
            }
          
            .reg{
                width:100%;
                min-width:300px;
                background-color: #000000F0 ;

            }

            main {
                display: grid;
                height:100%;
                place-content: center;
                place-items: center;
                border-radius: 5px;
                padding: 0;
              }
           
              a {
                margin-top: 10px;
                color: #000;
                border-bottom:1px solid #eee;
              }
              .spinner {
                margin-top: 5px;
                border: 4px solid rgba(0, 0, 0, 0.1);
                width: 36px;
                height: 36px;
                border-radius: 50%;
                border-left-color: #09f;
      
                animation: spin 1s ease infinite;
              }
      
              @keyframes spin {
                0% {
                  transform: rotate(0deg);
                }
      
                100% {
                  transform: rotate(360deg);
                }
              }
         h2 {
                font-style: italic;
                margin-bottom: 20px;
              }
              section {
                display: flex;
                flex-direction: column;
              }
              img {
                margin-bottom: 20px;
              }
              input {
                margin-top: 15px;
                padding: 10px 20px;
                border: 1px solid #eee;
                border-radius: 5px;
              }
              button {
                padding: 14px 20px;
                color:#fff;
                background-color: #000;
                border-radius: 5px;
                box-shadow: 0px 0px 10px rgba(255, 255, 255,1);
                margin: 10px 0;
                border:none;
                transition: all ease-in 0.7s;
              }
              button:hover {
                background-color: #0006;
              }

             @media only screen and (min-width: 800px){
                .login{
                    width:40%;
                    height:auto;
                }
                h4{
                    text-align: center;
                }
                main{
                  height:100vh;
                }
                .reg{
                    width:60%;
    
                }
             }

            `}</style>
           </div>
    );
}