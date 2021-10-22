import axios from "axios";
import Link from "next/link";
import router from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/UserContext";

export default function AdminNav() {
  const [user, setUser] = useState(null);
  const { getUser } = useUser();
  const [desp, setdesp] = useState(false);

  useEffect(() => {
    getUser((res) => {
      setUser(res);
    });
  }, []);

  const logout = async () => {
    user &&
      (await axios.delete(
        `https://desolate-sea-14156.herokuapp.com/userlogged/${user._id}`
      ));
    localStorage.removeItem("token");
    router.replace("/login");
  };

  return (
    <nav>
      <h2 className="title">Admin</h2>

      {user && user.role == "comercial" && (
        <label className="sub" onClick={() => setdesp(!desp)}>
          Menú
        </label>
      )}

      <div className="links">
        {user && user.role == "admin" && (
          <Link href="/admin/user/manager" replace>
            <a className="link">Usuarios</a>
          </Link>
        )}
        {user && user.role == "comercial" && (
          <Link href="/admin/car_manager/" replace>
            <a className="link com">Autos</a>
          </Link>
        )}

        {user && user.role == "comercial" && (
          <Link href="/admin/rents" replace>
            <a className="link com">Rentas</a>
          </Link>
        )}
        {user && user.role == "comercial" && (
          <Link href="/admin/workForm" replace>
            <a className="link com">Formulários</a>
          </Link>
        )}
        {user && user.role == "comercial" && (
          <Link href="/admin/driverList" replace>
            <a className="link com">Choferes</a>
          </Link>
        )}

        {desp && (
          <div className="submenu">
            {user && user.role == "comercial" && (
              <Link href="/admin/car_manager/" replace>
                <a className="link">Autos</a>
              </Link>
            )}
            {user && user.role == "comercial" && (
              <Link href="/admin/rents" replace>
                <a className="link">Rentas</a>
              </Link>
            )}
            {user && user.role == "comercial" && (
              <Link href="/admin/workForm" replace>
                <a className="link">Formulários</a>
              </Link>
            )}
            {user && user.role == "comercial" && (
              <Link href="/admin/driverList" replace>
                <a className="link">Choferes</a>
              </Link>
            )}
          </div>
        )}

        <p onClick={() => logout()}>Salir</p>
      </div>
      <style jsx>
        {`
          nav {
            background-color: #0009;
            display: flex;
            position: relative;
            height: 60px;
            justify-content: space-between;
            align-items: center;
            align-content: center;
            padding: 0 20px;
            color: #fff;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
          }
          .sub {
            display: none;
          }

          .submenu {
            display: flex;
            flex-direction: column;
            position: absolute;
            min-width: 140px;
            background-color: #333;
            padding: 10px 25px;
            right: 40px;
            top: 60px;
            margin: 0;
            margin-right: 5px;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);
            list-style: none;
          }

          .com {
            display: block;
          }

          @media screen and (max-width: 830px) {
            .com {
              display: none;
            }
            .sub {
              display: block;
            }
          }
          .links {
            display: flex;
          }
          .title {
            font-size: 28px;
            cursor: default;
          }
          p {
            margin: 0;
          }
          h2 {
            text-shadow: 0px 0px 2px rgba(255, 255, 255, 1);
          }
          .link,
          p {
            cursor: pointer;
            margin: 0 14px;
            font-size: 20px;
            font-weight: bold;
            font-style: italic;
          }
          .link:hover,
          p:hover {
            text-decoration: underline;
          }
        `}
      </style>
    </nav>
  );
}
