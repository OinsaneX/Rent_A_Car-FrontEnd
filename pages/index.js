import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <main>
          <img src="imgs/logo.png" alt="" />
          <h4>
            Somos una empresa dedicada al alquiler de automoviles pot todo el
            pais
          </h4>
          <Link href="/login">
            <a>Entrar</a>
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
        h4 {
          font-style: italic;
        }
        a {
          padding: 14px 20px;
          background-color: white;
          border: 1px solid #09f;
          border-radius: 5px;
          margin-top: 20px;
          transition: all ease-in 0.7s;
        }
        a:hover {
          background-color: #09f;
        }
        div {
          display: grid;
          place-content: center;
          place-items: center;
          height: 100vh;
        }
      `}</style>
    </>
  );
}
