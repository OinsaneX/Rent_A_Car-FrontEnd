import Link from "next/link";

export default function NavBar() {
    return (
        <nav>
        <section>
          <img src="/imgs/logo.png" alt="" width="80"/>
          <p>Renta de autos en Cuba</p>
        </section>
        <section>
          <Link href="/home">
            <a>Ofertas</a>
          </Link>
          <Link href="/home">
            <a>Contact</a>
          </Link>
          <Link href="/home">
            <a>Mi cuenta</a>
          </Link>
        </section>

        <style jsx>
        {`
        img{
            border-radius:999px;
        }
        p{
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