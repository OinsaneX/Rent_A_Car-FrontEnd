import axios from "axios";
import { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import { useUser } from "../../../hooks/UserContext";
import "react-notifications/lib/notifications.css";
import router from "next/router";

export default function MyWork() {
  const [works, setworks] = useState([]);
  const { getUser } = useUser();
  useEffect(() => {
    getUser((response) => {
      if (response) {
        getWorks(response._id);
      } else {
        NotificationManager.warning("Seccion expirada", "Timeout", 2000);
        setTimeout(() => {
          router.replace("/login");
        });
      }
    });
    return () => {};
  }, []);

  const getWorks = async (id) => {
    await axios
      .get(
        `https://desolate-sea-14156.herokuapp.com/rent/getRentsByDriver/${id}`
      )
      .then((response) => setworks(response.data));
  };

  return (
    <main>
      <NotificationContainer />
      <h2>Tus trabajos pendientes :</h2>
      <section>
        {works.length == 0 && <h3>No tienes ningun trabajo por el momento</h3>}
        {works.map((work) => (
          <div className="card">
            <div className="info">
              <div className="col">
                <h3>{`Precio total : ${work.price} $`}</h3>
                <h3>{`Días de reserva : ${work.days} `}</h3>
              </div>
              <div className="col">
                <h3>{`Lugar de recogida : ${work.location}`}</h3>
                <h3>{`Fecha de recogida : ${new Date(
                  work.pickUp
                ).getUTCDate()}/${
                  new Date(work.pickUp).getMonth() + 1
                }/${new Date(work.pickUp).getFullYear()} a las ${
                  work.pickHour
                } ${work.pickHour < 12 ? "AM" : "PM"}`}</h3>
                <h3>{`Fecha de entrega : ${new Date(
                  work.dropOff
                ).getUTCDate()}/${
                  new Date(work.dropOff).getMonth() + 1
                }/${new Date(work.dropOff).getFullYear()} a las ${
                  work.dropHour
                } ${work.dropHour < 12 ? "AM" : "PM"}`}</h3>
              </div>
              <div className="col flex1">
                <h3>{`Cliente : ${work.user_name}`}</h3>
                <h3>{`La renta ${
                  !work.confirmed ? "no" : ""
                } ha sido confirmada`}</h3>
              </div>
            </div>
          </div>
        ))}
      </section>

      <style jsx>
        {`
          main {
            display: grid;
            place-items: center;
            place-content: center;
          }

          .card {
            position: relative;
            width: 95vw;
            margin: 10px 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            background-color: #eee;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
          }
          .col {
            display: flex;
            flex-direction: column;
            margin: 10px 30px;
          }
          .imgUser {
            display: flex;
            justify-content: center;
            margin: 30px 30px;
          }
          .dataUser {
            margin: 0 5px;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            background-color: #eee;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
          }
          img {
            width: 250px;
          }
          .info {
            display: flex;
            flex-wrap: wrap;
            align-content: center;
            align-items: center;
          }
          section {
            display: flex;
            flex-direction: column;
            align-content: center;
            align-items: center;
          }
        `}{" "}
      </style>
    </main>
  );
}
