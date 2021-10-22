import User from "../../../svgs/img/User";
import axios from "axios";
import "react-notifications/lib/notifications.css";

import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import AdminNav from "../../../components/AdminNav";

export default function Profile({ works, user }) {
  return (
    <>
      <AdminNav />
      <header>
        <div className="imgUser">
          <User />
        </div>
        {user && (
          <div className="dataUser">
            <h3>Usuario: {user.username}</h3>
            <h3>Email : {user.email}</h3>
            <h3>Nacionalidad : {user.nacionality}</h3>
            <h3>Nombre : {user.name}</h3>
            <h3>Rol : Chofer</h3>
            <h3>País : {user.country}</h3>
            <h3>Teléfono : {user.phone}</h3>
            <h3>Licencia : {user.license}</h3>
            <h3>Años de experiencia : {user.experience_years}</h3>
            <h3>Validación de Licencia: : {user.licenseValidation}</h3>
          </div>
        )}
      </header>

      <main>
        <h2>Rentas correspondientes :</h2>
        <section>
          {works.map((work) => (
            <div className="card">
              <div className="info">
                <div className="col">
                  <h3>{`Precio total : ${work.price} $`}</h3>
                  <h3>{`Dias de reserva : ${work.days} `}</h3>
                </div>
                <div className="col">
                  <h3>{`Lugar de recogida : ${work.location}`}</h3>
                  <h3>{`Fecha de recogida : ${new Date(
                    work.pickUp
                  ).getDate()}/${
                    new Date(work.pickUp).getMonth() + 1
                  }/${new Date(work.pickUp).getFullYear()} a las ${
                    work.pickHour
                  } ${work.pickHour < 12 ? "AM" : "PM"}`}</h3>
                  <h3>{`Fecha de entrega : ${new Date(
                    work.dropOff
                  ).getDate()}/${
                    new Date(work.dropOff).getMonth() + 1
                  }/${new Date(work.dropOff).getFullYear()} a las ${
                    work.dropHour
                  } ${work.dropHour < 12 ? "AM" : "PM"}`}</h3>
                </div>
                <div className="col flex1">
                  <h3>{`Cliente : ${user.name}`}</h3>
                  <h3>{`La renta ${
                    !work.confirmed ? "no" : ""
                  } ha sido confirmada`}</h3>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      <style jsx>
        {`
          header {
            display: flex;
            flex-direction: column;
            align-items: center;
            align-content: center;
          }
          h1 {
            margin: 0;
            color: #fff;
          }
          .close {
            position: absolute;
            top: 5px;
            right: 5px;
            padding: 6px 8px;
            background-color: red;
            cursor: pointer;
            box-shadow: 0px 0px 10px rgba(255, 0, 0, 1);
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
          section {
            display: flex;
            flex-direction: column;
            align-content: center;
            align-items: center;
          }
          .info {
            display: flex;
            flex-wrap: wrap;
            align-content: center;
            align-items: center;
          }
          h3 {
            margin: 5px 20px;
          }
          h2 {
            text-align: center;
          }

          @media only screen and (max-width: 940px) {
            .col {
              width: 100%;
              text-align: center;
            }
          }
        `}
      </style>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  var works = null;
  var user = null;
  await axios
    .get(`https://desolate-sea-14156.herokuapp.com/user/${id}`)
    .then(async (res) => {
      user = res.data;
      await axios
        .get(
          `https://desolate-sea-14156.herokuapp.com/rent/getRentsByDriver/${user._id}`
        )
        .then((response) => {
          works = response.data;
        });
    });
  return {
    props: {
      works,
      user,
    },
  };
};
