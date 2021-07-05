import Link from "next/link";
import { useState } from "react";
import User from '../svgs/icons/User'
export default function NavBar() {

  const [despl, setdespl] = useState(false)

  const changeDespl = ()=>{
    setdespl(!despl)
  }
    return (
        <nav>
        <section>
          <h3> Rent_A_Car</h3>
        </section>
        <section>
          <Link href="/home">
            <a>Ofertas</a>
          </Link>
          <Link href="/home">
            <a>Contact</a>
          </Link>
          <div className="center" onClick={()=>changeDespl()}>
         
            <User/>
         
          
            <p id="useraccount" className="cont" >Mi cuenta</p>
          </div>
          
          {
            despl &&  <ul>
						<li><Link href="/login"><a>Login</a></Link></li>
						<li><Link href="/register"><a>Register</a></Link></li>
				
							</ul>
          }
         
        </section>

        <style jsx>
        {`
        img{
            border-radius:999px;
        }
        ul {
          display:block;
          position:absolute;
          min-width:140px;
          background-color:#0009;
          padding:10px 25px;
          right:0px;
          top:85px;
          margin:0;
          margin-right:5px;
          border-radius:6px;
          list-style:none;
        }
       
     
        
        h3{
          margin-left:10px;
            color:#fff;
            font-style:italic;
            cursor:default;
        }
        li{
      
        }
          nav {
            background-color: #000;
            height: 80px;
            display: flex;
            justify-content: space-between;
          }
          .cont{
            margin:0;
            margin-right:10px;
            font-size: 20px;
            font-style: italic;
            color:#fff;
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
          .center{
            display: flex;
            align-items: center;
          }
          section {
            display: flex;
            align-items: center;
          }
          p{
            display:none;
            cursor:default;
          }

          @media only screen and (min-width: 1000px) {
            p{
display:inline}
          }
          `}
        </style>
      </nav>
    );
}