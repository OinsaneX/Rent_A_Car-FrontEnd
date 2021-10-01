import Link from "next/link";
import { useEffect, useState } from "react";
import User from '../svgs/icons/User'
import {useUser} from '../hooks/UserContext'
import router from "next/router";
import axios from "axios";
export default function NavBar() {

  const [despl, setdespl] = useState(false)
  const [user, setUser] = useState(null)
  const {getUser} = useUser()

  useEffect(() => {
    getUser((res)=>{
      setUser(res)
    })
  }, [])


  const changeDespl = ()=>{
    setdespl(!despl)
  }

  const logout = async()=>{
    await axios.delete(`https://desolate-sea-14156.herokuapp.com/userlogged/${user._id}`)
    localStorage.removeItem("token")
    router.replace("/")
  }


    return (
        <nav>
        <section>
          <h3> Rent_A_Car</h3>
        </section>
        <section>
        
          <Link href="/rent">
            <a className="margin">Rentar</a>
          </Link>
          <div className="center" onClick={()=>changeDespl()}>
         
            <User/>
         
          
            <p id="useraccount" className="cont" >Mi cuenta</p>
          </div>
          
          {
            despl && !user ?  <ul>
						<li><Link href="/login"><a>Login</a></Link></li>
						<li><Link href="/register"><a>Registro</a></Link></li>
						<li><Link href="/services"><a>Servicios</a></Link></li>
            
							</ul>
              :  
              despl && user &&  <ul>
              <li><Link href="/profile"><a>Perfil</a></Link></li>
              <li><Link href="/services"><a>Servicios</a></Link></li>

              {user.role=="admin" && <li><Link href="/admin/user/manager"><a>Administración</a></Link></li>}
              {user.role=="comercial" && <li><Link href="/admin/car_manager"><a>Comercial</a></Link></li>}
              <li onClick={()=>logout()}>Salir</li>
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
          background-color:#000;
          padding:10px 25px;
          right:0px;
          top:85px;
          margin:0;
          margin-right:5px;
          box-shadow: 0px 0px 5px rgba(0, 0, 0,1);
          list-style:none;
        }
       
     
        
        h3{
          margin-left:10px;
            color:#fff;
            font-style:italic;
            cursor:default;
            text-shadow: 0px 0px 5px rgba(255, 255, 255,1);

        }
        li{
          margin: 0px 15px;
          font-size: 20px;
          font-style: italic;
          color:#fff;
          transition:all ease-in 0.7s;
          cursor:pointer;
        }
        li:hover{
          text-decoration:underline;
      }
          nav {
            box-shadow: 0px 0px 18px rgba(0, 0, 0,.6);
            overflow:hidden;
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
          .cont:hover{
            text-decoration:underline;
        }
          a {
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
          .margin{
            margin:0 15px;
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