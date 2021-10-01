import axios from 'axios'
import Link from 'next/link'
import router from 'next/router'
import { useEffect, useState } from 'react'
import { useUser } from '../hooks/UserContext'

export default function AdminNav() {

    const [user, setUser] = useState(null)
    const {getUser} = useUser()
  
    useEffect(() => {
        getUser((res)=>{
            setUser(res)
          })
    }, [])
  
  
  
  
    const logout = async()=>{
      await axios.delete(`https://desolate-sea-14156.herokuapp.com/userlogged/${user._id}`)
      localStorage.removeItem("token")
      router.replace("/login")
    }


    return (
        <nav>
        <h2 className="title">Admin</h2>

       <div className="links">
           {user && user.role=="admin" && <Link href="/admin/user/manager">
                <a className="link">
                    Usuarios
                </a>
            </Link> }
           {user && user.role == "comercial" &&  <Link href="/admin/car_manager/">
                <a className="link">
                    Autos
                </a>
            </Link>}
           {user && user.role == "comercial" &&     <Link href="/admin/rents">
                <a className="link">
                    Rentas
                </a>
            </Link>}
           {user && user.role == "comercial" &&  <Link href="/admin/workForm">
                <a className="link">
                    Formularios
                </a>
            </Link>
            
            }
            <p onClick={() =>logout()}>Salir</p>
         
            
        
     
        </div>
        <style jsx>
            {`
              nav{
                background-color: #0009;
                display: flex;
                height:60px;
                justify-content:space-between;
                align-items:center;
                align-content:center;
                padding:0 20px;
                color: #fff;
                box-shadow: 0px 0px 10px rgba(0, 0, 0,1);


            }
 .links{
                display: flex;

            }
 .title{
                font-size:28px;
                cursor:default;
            }
            p{
                margin:0;
            }
            h2{
                text-shadow: 0px 0px 2px rgba(255, 255, 255,1);

            }
            .link,p{
                cursor:pointer;
                margin:0 14px;
                font-size:20px;
                font-weight:bold;
                font-style:italic;
            }
            .link:hover,p:hover{
                text-decoration:underline;
            }
            `}
        </style>
    </nav>
    );
}