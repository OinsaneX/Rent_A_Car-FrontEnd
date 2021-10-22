import axios from "axios";
import { useEffect, useState } from "react";
import AdminNav from "../../../components/AdminNav";
import "react-notifications/lib/notifications.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Link from "next/link";

export default function UserManager({ users }) {
  const [userList, setuserList] = useState([]);

  useEffect(() => {
    setuserList(users);
  }, []);

  return (
    <div>
      <NotificationContainer />

      <AdminNav />
      <main>
        <section>
          <h2>Choferes :</h2>
          <table>
            <thead>
              <tr>
                <th>
                  <p>Nombre</p>
                </th>
                <th>
                  <p>Usuario</p>
                </th>
                <th>
                  <p>Email</p>
                </th>
                <th>
                  <p>CI</p>
                </th>
                <th>
                  <p>Experiencia</p>
                </th>
              </tr>
            </thead>

            <tbody>
              {userList.map(
                (user) =>
                  user.role == "driver" && (
                    <Link href={`/admin/driver/${user._id}`}>
                      <tr key={user._id}>
                        <td data-col-title="Nombre">
                          <p>{user.name}</p>
                        </td>
                        <td data-col-title="Usuario">
                          <p>{user.username}</p>
                        </td>
                        <td data-col-title="Email">
                          <p>{user.email}</p>
                        </td>
                        <td data-col-title="CI">
                          <p>{user.identity}</p>
                        </td>
                        <td data-col-title="Experiencia">
                          <p>{`${user.experience_years} años`}</p>
                        </td>
                      </tr>
                    </Link>
                  )
              )}
            </tbody>
          </table>
        </section>
      </main>

      <style jsx>
        {`
          main {
            width: 100vw;
            place-content: center;
            place-items: center;
            display: grid;
          }

          a {
            background-color: #000;
            color: #fff;
            border: none;
            padding: 10px 12px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
            margin: 10px 5px;
          }
          a:hover {
            background-color: #0006;
          }
          thead {
            background-color: #000;
            color: #fff;
          }
          h3 {
            margin: 0;
          }
          h2 {
            margin: 10px 10px;
            text-align: center;
          }
          label {
            margin: 0 10px;
            cursor: pointer;
          }
          p {
            padding: 10px 0px;
            margin: 0;
            text-align: center;
          }
          .flex {
            display: flex;
            justify-content: center;
          }
          table {
            width: 90vw;
          }
          th {
            border-bottom: 2px solid #eee;
          }
          tr {
            cursor: pointer;
          }
          td {
            height: 100%;
            background-color: #eee;
          }
          hr {
            color: #000;
            width: 90vw;
            margin: 20px 20px;
          }

          @media screen and (max-width: 630px) {
            .title {
              text-align: left;
            }
            table {
              width: 98vw;
            }
            thead {
              display: none;
            }

            tr,
            td {
              display: block;
            }
            tr:not(:last-child) {
              border-bottom: 5px solid #000;
            }
            td {
              padding-left: 26%;
              position: relative;
            }

            td::before {
              position: absolute;
              padding: 5px;
              left: 0;
              top: 0;
              bottom: 0;
              width: 22%;
              color: #fff;
              content: attr(data-col-title);
              font-weight: bold;
              background-color: #5e5e5e;
            }
          }
        `}
      </style>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const { data } = await axios.get(
    "https://desolate-sea-14156.herokuapp.com/user"
  );

  return {
    props: {
      users: data,
    },
  };
};
