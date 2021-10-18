import Link from "next/link";
import "react-notifications/lib/notifications.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoginImage from '../../svgs/img/Login'
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import axios from "axios";
import {useUser} from '../../hooks/UserContext'

export default function Home() {
  const {user,getUser} = useUser();
  const router = useRouter();
  const [form, setform] = useState({
    username: "",
    password: "",
  });
  const [loading, setloading] = useState(false);


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
 
    
  }, [])

  const onChangeInput = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
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
            if(!response.data.confirmed){
              NotificationManager.warning(
                "Su cuenta no está confirmada",
                "Error",
                3000
              );
              setloading(false);
            }else{
              await axios.post("https://desolate-sea-14156.herokuapp.com/userlogged",response.data)
              .then(res => {
                localStorage.setItem("token",res.data.token)
                if(response.data.role=="admin"){
                  router.replace("/admin/user/manager");
                }
                else if(response.data.role=="comercial"){
                  router.replace("/admin/car_manager");
                }
                else{
                  router.replace("/rent");
  
                }
              })
            }
           
          }
          else{
            setloading(false);

            NotificationManager.error(
              "No existe ninguna cuenta con esos datos",
              "Error",
              3000
            );
          }
        })

       
    }
  }
  
  return (
    <>
      <div>
        <main>
          <NotificationContainer />
          <h2>Login</h2>
          <LoginImage/>
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

            <button onClick={(e) => onSubmit()}>Entrar</button>
          </section>
          {loading && <div className="spinner"></div>}

          <Link href="/register">
            <a>Crear Cuenta ...</a>
          </Link>
          <Link href="/rent">
            <a>Continuar sin cuenta ...</a>
          </Link>
        </main>
      </div>
      <style jsx>{`
        main {
          display: grid;
          place-content: center;
          place-items: center;
          box-shadow: 0px 0px 10px rgba(0, 0, 0,.8);
          padding: 20px;
        }
        a {
          margin-top: 10px;
          color: #000;
          border-bottom:2px solid #eee;
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

        div {
          display: grid;
          place-content: center;
          place-items: center;
          height: 100vh;
        }
        h2 {
          font-style: italic;
          margin-bottom: 20px;
          text-shadow: 0px 0px 2px rgba(0, 0, 0,1);

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
          box-shadow: 0px 0px 5px rgba(0, 0, 0,1);
        }
        button {
          padding: 14px 20px;
          color:#fff;
          background-color: #000;
          border: none;
          box-shadow: 0px 0px 10px rgba(0, 0, 0,.8);

          border-radius: 5px;
          margin-top: 20px;
          transition: all ease-in 0.7s;
        }
        button:hover {
          background-color: #0009;
        }
      `}</style>
    </>
  );
}
