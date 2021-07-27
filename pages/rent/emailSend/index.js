import Link from "next/link";

export default function emailSend() {


  
    return (
       <>
        <div>
            <h2>
               Se ha enviado un link de confirmacion a su correo
            </h2>

            <Link href="/rent">
            <a>
               <h3>Aceptar</h3>
            </a></Link>
        </div>
        <style jsx>{`
        div{
            height:100vh;
            display:grid;
            place-content: center;
            plca-items: center;
        }
        h3{
            margin:0;
        }
        a{

            text-align: center;
            padding:14px 20px;
            background-color: #000;
            color: #fff;
            box-shadow: 0px 0px 10px rgba(0, 0, 0,1);
            transition:all ease-in 0.6s;
        }
        a:hover {
            background-color: #eee;
            color:#000;
        }
        `}</style>
       </>
    );
}

