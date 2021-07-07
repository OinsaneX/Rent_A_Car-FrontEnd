import Link from "next/link";
import "react-notifications/lib/notifications.css";
import InputMask from "react-input-mask";
import { useRouter } from "next/router";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useState } from "react";
import axios from "axios";

export default function Add_User() {

    const [form, setform] = useState({
        name: "",
        username:"",
        identity: "",
        nacionality: "",
        phone: "",
        password: "",
        conf: "",
        address:"",
        country: "",
        role:"admin"
      });

      const onChangeInput = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
      };

    return (
        <>
        <div>
          <main>
            <NotificationContainer />
            <h2>Nuevo Administrador</h2>
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
                <p>CI :</p>
                <InputMask
                  mask="99999999999"
                  name="identity"
                  value={form.identity}
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
                  name="password"
                  value={form.password}
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
              <section>
                <p>Nacionalidad :</p>
                <input
                  name="nacionality"
                  value={form.nacionality}
                  onChange={(e) => onChangeInput(e)}
                  type="password"
                  placeholder="Nacionalidad"
                />
              </section>
              <section>
                <p>Pais :</p>
                <input
                  name="country"
                  value={form.country}
                  onChange={(e) => onChangeInput(e)}
                  type="password"
                  placeholder="Pais"
                />
              </section>
              <section>
                <p>Direccion :</p>
                <input
                  name="address"
                  value={form.address}
                  onChange={(e) => onChangeInput(e)}
                  type="password"
                  placeholder="Direccion"
                />
              </section>
              <button onClick={(e) => onSubmit(e)}>Crear</button>
            </form>
        
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
            color: #000;
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
            background-color: #000;
            color: #fff;
            border: 1px solid #eee;
            border-radius: 5px;
            margin-top: 20px;
            transition: all ease-in 0.7s;
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
        `}</style>
      </>
    );
}