import Link from "next/link";
import User from '../svgs/icons/User'
export default function NavBar() {
    return (
        <nav>
        <section>
          <img src="/imgs/logo.png" alt="" width="80"/>
          <h3> Rent_A_Car</h3>
        </section>
        <section>
          <Link href="/home">
            <a>Ofertas</a>
          </Link>
          <Link href="/home">
            <a>Contact</a>
          </Link>
          <label htmlFor="useraccount">
            <User/>
          </label>
          <Link href="/home">
            <a id="useraccount" className="cont">Mi cuenta</a>
          </Link>
         
        </section>

        <style jsx>
        {`
        img{
            border-radius:999px;
        }
        h3{
          margin-left:10px;
            color:#fff;
            font-style:italic;
            cursor:default;
        }
          nav {
            background-color: #0009;
            height: 80px;
            display: flex;
            justify-content: space-between;
          }
          .cont{
            margin:0;
            margin-right:10px;
          }
          a {
            margin: 0px 15px;
            font-size: 20px;
            font-style: italic;
            color:#fff;
            transition:all ease-in 0.7s;
          }
          a:hover{
              text-decoration:underline;
          }
          section {
            display: flex;
            align-items: center;
          }
          `}
        </style>
      </nav>
    );
}