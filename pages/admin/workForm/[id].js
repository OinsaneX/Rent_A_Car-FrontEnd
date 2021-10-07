import axios from "axios";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import "react-notifications/lib/notifications.css";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
function formWork({dataForm}) {

    function acceptButton() {
        confirmAlert({
            title: 'Confirmar',
            message: 'Estas seguro que deseas aceptar a este usuario como un nuevo chofer?',
            buttons: [
              {
                label: 'Si',
                onClick: async() => {
                    await axios.put(`https://desolate-sea-14156.herokuapp.com/user/convertToDriver/${dataForm.idUser}`)
                    .then(async() => {
                        await axios.delete(`https://desolate-sea-14156.herokuapp.com/sendMail/sendEmailWorkConfirmed`,{name:dataForm.name,email:dataForm.email})
                        await axios.delete(`https://desolate-sea-14156.herokuapp.com/driverForm/${dataForm._id}`)
                        NotificationManager.success("Usuario aceptado como chofer","Éxito",2000)
                    })
                }
              },
              {
                label: 'No',
                onClick: () => {  
                   
            }
              }
            ]
          })
        
    }

    function rejectConfirm(){
        confirmAlert({
            title: 'Confirmar',
            message: 'Estas seguro que deseas rechazar a este usuario como un nuevo chofer?',
            buttons: [
              {
                label: 'Si',
                onClick: async() => {
                   
                        await axios.delete(`https://desolate-sea-14156.herokuapp.com/driverForm/${dataForm._id}`)
                        await axios.delete(`https://desolate-sea-14156.herokuapp.com/sendMail/sendEmailWorkCanceled`,{name:dataForm.name,email:dataForm.email})
                        NotificationManager.success("Peticion eliminada ","Éxito",2000)
                    
                }
              },
              {
                label: 'No',
                onClick: () => {  
                   
            }
              }
            ]
          })
    }


    return (
        <div>
          <main>
            <div className="col">
            <p>{`Nombre : ${dataForm.name}`}</p>
            <p>{`Email : ${dataForm.email}`}</p>
            <p>{`CI : ${dataForm.identity}`}</p>
            </div>
            <div className="col">
            <p>{`Teléfono : ${dataForm.phone}`}</p>
            <p>{`Nacionalidad : ${dataForm.nacionality}`}</p>
            <p>{`Direccion : ${dataForm.address}`}</p>
            </div>
            <div className="col">
            <p>{`Experiencia : ${dataForm.experience_years} años`}</p>
            <p>{`Licencia : ${dataForm.license}`}</p>
            <p>{`Val Licencia : ${dataForm.licenseValidation}`}</p>
            </div>
          </main>

          <section>
            <h5>Curriculo :</h5>
            <p>{dataForm.curriculum}</p>

            <h5>Foto de la licencia :</h5>
            <img src={dataForm.licenseUrl} alt="" />


            <div className="buttons">
            <button className="cancel" onClick={rejectConfirm}> Rechazar </button>
            <button className="accept" onClick={acceptButton}> Aceptar </button>
            </div>

          </section>

          <style jsx>{`
          main{
              display:flex;
              flex-wrap:wrap;
              width:100vw;
              justify-content:center;
          }
          .col{
              display:flex;
              flex-direction:column;
              margin:10px
          }
          img{
             width:400px;
              height:270px;
          }
          .buttons{
              display:flex;
              flex-wrap:wrap;
          }
          .accept{
              background-color: #62FF4C;
          }
          .cancel{
              background-color: #FD4B4B
          }
          button{
              margin:10px 20px;
              padding:10px 20px;
              border:none;
              box-shadow: 0px 0px 10px #0008
          }
          section{
              text-align:center;
              width:100vw;
              display:flex;
              flex-direction:column;
              align-items:center;
              align-content:center;

          }
          `}</style>
        </div>
    );
}

export default formWork;

export const getServerSideProps = async (ctx) => {

    const {id} = ctx.query
    
   const {data} = await axios.get(`https://desolate-sea-14156.herokuapp.com/driverForm/${id}`)
    

    return {
        props:{
            dataForm:data
        }
    }
}