import { useEffect, useState } from "react";
import {useUser} from '../../hooks/UserContext'
import {useRouter} from 'next/router'
import axios from "axios";
import { NotificationManager } from "react-notifications";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
function Support() {

    const [datesUser, setdatesUser] = useState({name:'',emailUser:'',assunto:''})
    const {getUser} =useUser()
    const router = useRouter()
    const [active, setactive] = useState(false)

    useEffect(() => {
        getUser((response)=>{
            if (response){
                setdatesUser({...datesUser,name:response.name,emailUser:response.email})
            }else{
                router.replace("/login")
            }
        })    
        return () => {
        
        }
    }, [])

    async function sendMail (){

    await axios.post('https://desolate-sea-14156.herokuapp.com/sendMail/sendSupportEmail',datesUser)
    .then((response) => {
        NotificationManager.success("Email Enviado a los administradores","Sucesso",2000)
        setdatesUser({...datesUser,assunto:""})
        setTimeout(()=>{
            router.replace("/services")
        },2000)
    })
    .catch((error) => {
        NotificationManager.error("Error en la conexion","Connection refused",2000)
    })
    }

    function onWrite(value) {
        setdatesUser({...datesUser,assunto:value})
        datesUser.assunto.length > 1 ? setactive(true) : setactive(false)
    }

    return (
        <main>
            <NotificationContainer/>
                <h4>Escriba aqui su duda .Será enviado a los administradores y estos le responderan lo antes posible por email</h4>
                <textarea value={datesUser.assunto} name="assunto" onChange={(e)=>onWrite(e.target.value)} ></textarea>

                <button disabled={!active} onClick={()=>sendMail()}>Enviar</button>
            <style jsx>{`
            main{
                display:flex;
                height:90vh;
                flex-direction: column;
                align-items:center;
                

            }
            textarea{
                width:90%;
                height:400px;
            }
            button {
          padding: 14px 20px;
          color:#fff;
        ${active ? 'background-color: #000;' : 'background-color: #eee;color:#000;'}
          border: none;
          box-shadow: 0px 0px 10px rgba(0, 0, 0,.8);

          border-radius: 5px;
          margin-top: 20px;
          transition: all ease-in 0.7s;
        }
     
            
            `}</style>
        </main>
    );
}

export default Support;