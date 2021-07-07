import axios from "axios";
import { useEffect, useState } from "react";
import AdminNav from "../../../../components/AdminNav";
import Delete from '../../../../svgs/icons/Delete'
import Edit from '../../../../svgs/icons/Edit'
import "react-notifications/lib/notifications.css";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Link from "next/link";

export default function UserManager({users}) {

    const [userList, setuserList] = useState([])

    useEffect(() => {
        setuserList(users)
    }, [])
    

   async function  deleteUser (id){
        await axios.delete(`https://desolate-sea-14156.herokuapp.com/user/${id}`)
        .then(() => {
            NotificationManager.success("Usuario Eliminado con suceso","Éxito",2000)
            getUsers()
        })
    }

    async function getUsers(){
        await axios.get("https://desolate-sea-14156.herokuapp.com/user")
        .then((response) => {
            setuserList(response.data)
        })
    }
    
    return (
        <div>
                                  <NotificationContainer />

            <AdminNav/>
            <main>
                <section>
                    <h2>Administradores :</h2>
                    <table>
                   <thead>
                   <tr>
                        <th><p>Nombre</p></th>
                        <th><p>Usuario</p></th>
                        <th><p>Email</p></th>
                        <th><p>CI</p></th>
                        <th><p>Pais</p></th>
                        <th><p>Opciones</p></th>
                    </tr>
                   </thead>

<tbody>
    
{userList.map((user)=>(
                        user.role=="admin" && <tr key={user._id}>
                            <td><p>{user.name}</p></td>
                         <td><p>{user.username}</p></td>
                         <td><p>{user.email}</p></td>
                         <td><p>{user.identity}</p></td>
                         <td><p>{user.country}</p></td>
                         <td className="flex"><label onClick={()=>deleteUser(user._id)}><Delete/></label> <label><Edit/></label></td>
                         </tr>
                    ))}
</tbody>
                    </table>
                </section>
                <Link href="/admin/user/add_user">
                    <a>
                        Nuevo Administrador
                    </a>
                </Link>

                <hr />
                <section>
                    <h2>Clientes :</h2>
                    <table>
                    <thead>
                    <tr>
                        <th><p>Nombre</p></th>
                        <th><p>Usuario</p></th>
                        <th><p>Email</p></th>
                        <th><p>CI</p></th>
                        <th><p>Pais</p></th>
                    </tr>
                    </thead>
                   <tbody>
                   {userList.map((user)=>(
                        user.role=="client" && <tr key={user._id}>
                            <td><p>{user.name}</p></td>
                         <td><p>{user.username}</p></td>
                         <td><p>{user.email}</p></td>
                         <td><p>{user.identity}</p></td>
                         <td><p>{user.country}</p></td>
                         <td className="flex"><label onClick={()=>deleteUser(user._id)}><Delete/></label> <label><Edit/></label></td>

                         </tr>
                    ))}
                   </tbody>
                    </table>
                </section>


            </main>

            <style jsx>
                {`
                main{
                    width:100vw;
                    place-content:center;
                    place-items:center;
                    display: grid;
                }
                a{
                    background-color: #000;
                    color:#fff;
                    border:none;
                    padding:10px 12px;
                    border-radius:5px;
                    margin:10px 5px;
                }
                h3{
                    margin:0;
                }
                h2{
                    margin: 10px 10px;
                    text-align:center;
                }
                label{
                    margin:0 10px;
                    cursor:pointer;
                }
                p{
                    padding:10 0px;
                    margin:0;
                    text-align: center;

                }
                .flex{
                    display:flex;
                    justify-content: center;
                }
                table{
                    width:90vw;
                }
                 th {
                    
                    border-bottom: 2px solid #eee;
                  }
                  td{
                      height:100%;
                      background-color: #eee;
                  }
                  hr{
                      color:#000;
                      width:90vw;
                      margin:20px 20px;
                  }
                `}
            </style>
        </div>
    );
}

export const getServerSideProps = async (ctx) => {

    const {data} = await axios.get("https://desolate-sea-14156.herokuapp.com/user")

    return {
        props:{
            users:data
        }
    }
}