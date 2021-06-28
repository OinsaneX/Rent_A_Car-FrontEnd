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

export default function Home() {
  const router = useRouter();
  const [form, setform] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    pass: "",
    conf: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    if (form.name == "") {
      NotificationManager.error(
        "Introduzca el nombre de usuario",
        "Error",
        3000
      );
    } else if (form.email.indexOf("@") == -1) {
      NotificationManager.error("Introduzca un email válido", "Error", 3000);
    } else if (countDigits(form.cpf) < 11) {
      NotificationManager.error("Introduzca un CI válido", "Error", 3000);
    } else if (countDigits(form.phone) < 8) {
      NotificationManager.error(
        "Introduzca un Número de celular válido",
        "Error",
        3000
      );
    } else if (form.pass != form.conf) {
      NotificationManager.error("La contraseña no coincide", "Error", 3000);
    } else {
      NotificationManager.success("Su cuenta fue creada", "Sucesso", 3000);
      setTimeout(() => {
        router.replace("/login");
      }, 1500);
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
    console.log();
  };
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
                name="name"
                value={form.name}
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
              <p>CI :</p>
              <InputMask
                mask="99999999999"
                name="cpf"
                value={form.cpf}
                onChange={(e) => onChangeInput(e)}
                placeholder="XXXXXXXXXXX"
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
                name="pass"
                value={form.pass}
                onChange={(e) => onChangeInput(e)}
                type="password"
                placeholder="Contraseña"
              />
            </section>
            <section>
              <p>Confirmar :</p>
              <input
                name="conf"
                value={form.conf}
                onChange={(e) => onChangeInput(e)}
                type="password"
                placeholder="Confirmar Contraseña"
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
          border: 1px solid #eee;
          border-radius: 5px;
          padding: 20px;
        }
        a {
          margin-top: 10px;
          color: #09f;
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
      `}</style>
    </>
  );
}
