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
   getUser(()=>{
     router.replace("/home")
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
            await axios.post("https://desolate-sea-14156.herokuapp.com/userlogged",response.data)
            .then(res => {
              localStorage.setItem("token",res.data.token)
              router.replace("/home");
            })
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
  };
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
          <Link href="/home">
            <a>Continuar sin cuenta ...</a>
          </Link>
        </main>
      </div>
      <style jsx>{`
        main {
          display: grid;
          place-content: center;
          place-items: center;
          border: 1px solid #eee;
          border-radius: 5px;
          padding: 20px;
        }
        a {
          margin-top: 10px;
          color: #09f;
          border-bottom:1px solid #09f;
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
          background-color: white;
          border: 1px solid #09f;
          border-radius: 5px;
          margin-top: 20px;
          transition: all ease-in 0.7s;
        }
        button:hover {
          background-color: #09f;
        }
      `}</style>
    </>
  );
}
