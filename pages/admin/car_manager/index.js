import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import "react-notifications/lib/notifications.css";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import AdminNav from "../../../components/AdminNav";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export default function Add_Car() {
  const [listCar, setListCar] = useState([]);

  useEffect(() => {
    getCars();
    return () => {};
  }, []);

  const getCars = async () => {
    await axios
      .get("https://desolate-sea-14156.herokuapp.com/car")
      .then((res) => setListCar(res.data));
  };

  const deleteCar = async (id) => {
    confirmAlert({
      title: "Confirmar",
      message: "Estas seguro que deseas eliminar ese usuario.",
      buttons: [
        {
          label: "Si",
          onClick: async () => {
            await axios
              .delete(`https://desolate-sea-14156.herokuapp.com/car/${id}`)
              .then((res) => {
                NotificationManager.success(
                  "Se ha eliminado del sistema el auto",
                  "Éxito",
                  2000
                );
                getCars();
              })
              .catch((err) =>
                NotificationManager.error(
                  "A veces ocurre este error",
                  "Error",
                  3000
                )
              );
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div>
      <NotificationContainer />

      <AdminNav />
      <main>
        <section>
          {listCar.map((car) => (
            <div key={car._id} className="card">
              <h3>{`${car.brand} ${car.model}`}</h3>
              <img src={car.imageUrl} alt="" />
              <span>{car.price_per_day} $ Por dia</span>
              <div className="buttons">
                <Link href={`/admin/car_manager/add_car/${car._id}`}>
                  <button>
                    <p>Actualizar datos</p>
                  </button>
                </Link>
                <button onClick={(e) => deleteCar(car._id)}>
                  <p>Borrar</p>
                </button>
              </div>
            </div>
          ))}
        </section>
        <div className="options">
          <Link href="/admin/car_manager/add_car">
            <a className="button">Adicionar nuevo auto al sistema</a>
          </Link>
        </div>
      </main>

      <style jsx>
        {`
          section {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            align-content: center;
            flex-wrap: wrap;
          }
          .buttons {
            display: flex;
          }
          header {
            background-color: #000;
            color: #fff;
            height: 200px;
            text-align: center;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
          }

          h2 {
            margin: 0;
            padding-top: 20px;
            padding-bottom: 20px;
          }
          button {
            margin: 10px 10px;
            padding: 10px 15px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
            border: none;
            background-color: #000;
            color: #fff;
            transition: all ease-in 0.3s;
          }
          button:hover {
            background-color: #0009;
          }
          h3 {
            text-shadow: 0px 0px 4px rgba(0, 0, 0, 1);
          }
          .button {
            margin: 10px 10px;
            padding: 10px 15px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);

            background-color: #000;
            color: #fff;
            cursor: default;
            transition: all ease-in 0.3s;
          }
          .button:hover {
            background-color: #0009;
          }
          img {
            width: 300px;
            height: 200px;
          }
          .card {
            display: grid;
            place-content: center;
            place-items: center;
            max-width: 350px;
            margin: 20px 20px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
          }
          p {
            margin: 0;
          }
          .options {
            display: grid;
            place-content: center;
            place-items: center;
          }
        `}{" "}
      </style>
    </div>
  );
}
