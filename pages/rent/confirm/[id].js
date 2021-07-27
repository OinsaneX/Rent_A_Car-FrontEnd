import axios from "axios";
import Link from "next/link";

export default function Confirm({id}) {


  
    return (
       <>
        <div>
            <h2>
                Su renta ha sido confirmada
            </h2>

            <Link href="/rent">
            <a>
               <h3>Aceptar</h3>
            </a></Link>
        </div>
        <style jsx>{`
        div{
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

export const getServerSideProps = async (ctx) => {
const {id} = ctx.query
await axios.get(`https://desolate-sea-14156.herokuapp.com/rent/${id}/confirm`)
    return {
        props:{
           data: null
        }
    }
}