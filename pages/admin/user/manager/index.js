import axios from "axios";
import { useEffect, useState } from "react";
import AdminNav from "../../../../components/AdminNav";
import Delete from '../../../../svgs/icons/Delete'
import Edit from '../../../../svgs/icons/Edit'
import "react-notifications/lib/notifications.css";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

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
    confirmAlert({
        title: 'Confirmar',
        message: 'Estas seguro que deseas eliminar ese usuario.',
        buttons: [
          {
            label: 'Si',
            onClick: async() => {
                await axios.delete(`https://desolate-sea-14156.herokuapp.com/user/${id}`)
                .then(() => {
                    NotificationManager.success("Usuario Eliminado con suceso","Éxito",2000)
                    getUsers()
                })
            }
          },
          {
            label: 'No',
            onClick: () => {}
          }
        ]
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
            <Link href="/admin/user/add_user">
                    <a>
                        Nuevo Usuario
                    </a>
                </Link>
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
                            <td data-col-title="Nombre"><p>{user.name}</p></td>
                         <td data-col-title="Usuario"><p>{user.username}</p></td>
                         <td data-col-title="Email"><p>{user.email}</p></td>
                         <td data-col-title="CI"><p>{user.identity}</p></td>
                         <td data-col-title="Pais"><p>{user.country}</p></td>
                         <td data-col-title="Opciones" className="flex"><label onClick={()=>deleteUser(user._id)}><Delete/></label> <label><Edit/></label></td>
                         </tr>
                    ))}
</tbody>
                    </table>
                </section>
              

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
                        <th><p>Opciones</p></th>

                    </tr>
                    </thead>
                   <tbody>
                   {userList.map((user)=>(
                        user.role=="client" && <tr key={user._id}>
                            <td data-col-title="Nombre"><p>{user.name}</p></td>
                         <td data-col-title="Usuario"><p>{user.username}</p></td>
                         <td data-col-title="Email"><p>{user.email}</p></td>
                         <td data-col-title="CI"><p>{user.identity}</p></td>
                         <td data-col-title="Pais"><p>{user.country}</p></td>
                         <td data-col-title="Opciones" className="flex"><label onClick={()=>deleteUser(user._id)}><Delete/></label> <label><Edit/></label></td>

                         </tr>
                    ))}
                   </tbody>
                    </table>
                </section>
                <hr />
                <section>
                    <h2>Comercio :</h2>
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
                        user.role=="comercial" && <tr key={user._id}>
                            <td data-col-title="Nombre"><p>{user.name}</p></td>
                         <td data-col-title="Usuario"><p>{user.username}</p></td>
                         <td data-col-title="Email"><p>{user.email}</p></td>
                         <td data-col-title="CI"><p>{user.identity}</p></td>
                         <td data-col-title="Pais"><p>{user.country}</p></td>
                         <td data-col-title="Opciones" className="flex"><label onClick={()=>deleteUser(user._id)}><Delete/></label> <label><Edit/></label></td>

                         </tr>
                    ))}
                   </tbody>
                    </table>
                </section>
                <hr />
                <section>
                    <h2>Choferes :</h2>
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
                        user.role=="driver" && <tr key={user._id}>
                            <td data-col-title="Nombre"><p>{user.name}</p></td>
                         <td data-col-title="Usuario"><p>{user.username}</p></td>
                         <td data-col-title="Email"><p>{user.email}</p></td>
                         <td data-col-title="CI"><p>{user.identity}</p></td>
                         <td data-col-title="Pais"><p>{user.country}</p></td>
                         <td data-col-title="Opciones" className="flex"><label onClick={()=>deleteUser(user._id)}><Delete/></label> <label><Edit/></label></td>

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
                    box-shadow: 0px 0px 10px rgba(0, 0, 0,1);
                    margin:10px 5px;
                }
                a:hover {
                    background-color: #0006;
                }
                thead{
                    background-color: #000;
                    color:#fff;
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
                    padding:10px 0px;
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

                  @media screen and (max-width:630px){
                      .title{
                          text-align:left;
                      }
                      table{
                        width:98vw;
                    }
                      thead{
                          display:none;
                      }
                   
                      tr,td{
                          display:block;
                      }
                      tr:not(:last-child){
                          border-bottom: 5px solid #000;
                      }
                      td{
                          padding-left: 26%;
                          position:relative;
                      }

                      td::before{
                          position :absolute;
                          padding:5px;
                          left:0;
                          top:0;
                          bottom:0;
                          width:22%;
                          color:#fff;
                          content:attr(data-col-title);
                          font-weight:bold;
                          background-color: #5E5E5E;
                      }
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