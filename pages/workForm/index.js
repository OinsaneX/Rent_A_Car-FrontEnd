import axios from "axios";
import { useEffect, useState } from "react";
import SelectCountry from '../../components/SelectCountry'
import InputMask from "react-input-mask";
import "react-notifications/lib/notifications.css";
import {useRouter} from 'next/router'
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useUser } from "../../hooks/UserContext";
import {ValidateCI,ValidateLicenseExp} from '../../utils/Validation'

export default function WorkForm() {
  const router = useRouter()
        const [driverForm, setdriverForm] = useState({name:"",email:"",curriculum:"",identity:"",phone:"",nacionality:"",country:"",address:"",role:"driver",pasport:"",experience_years:"",license:"",licenseValidation:"",licenseUrl:""})
        const [loading, setloading] = useState(undefined)
        const {getUser} = useUser()
        const [idUser, setidUser] = useState(null)

    useEffect(() => {
      getIdUser()
    }, [])

    async function getIdUser(){
      await getUser(async(user)=>{
        if(user){
          setidUser(user._id)
        }
        else{
            router.replace('/rent')
        }
        
     })
    }

    function onAddImage(e) {
        e.preventDefault();
        var file = e.target.files[0];
        var formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          'u45m9vyq'
        );
        setloading(1);
        axios
          .post(
            `https://api.cloudinary.com/v1_1/dxyv7aypq/image/upload`,
            formData
          )
          .then((response) => {
            setloading(null);
    
            setdriverForm({ ...driverForm, licenseUrl: response.data.secure_url });
          })
          .catch((error) => {console.log(error)})
          ;
          
      }


      const onChangeInput = (e) => {
          setdriverForm({...driverForm, [e.target.name]: e.target.value})
          console.log(driverForm)
      }


      const onSubmit = async() => {
        if (driverForm.name == "") {
          NotificationManager.error(
            "Introduzca el nombre de usuario",
            "Error",
            3000
          );
        } else if (driverForm.email.indexOf("@") == -1) {
          NotificationManager.error("Introduzca un email válido", "Error", 3000);
        } else if (countDigits(driverForm.identity) < 11 || !ValidateCI(driverForm.identity)) {
          NotificationManager.error("Introduzca un CI válido", "Error", 3000);
        } else if (countDigits(driverForm.phone) < 8) {
          NotificationManager.error(
            "Introduzca un Número de celular válido",
            "Error",
            3000
          );
        } 
        else if (driverForm.nacionality == "") {
          NotificationManager.error(
            "Introduzca su nacionalidad",
            "Error",
            3000
          )}
      
          else if (driverForm.address == "") {
            NotificationManager.error(
              "Introduzca su direccion",
              "Error",
              3000
            )}
              else if (!ValidateLicenseExp(driverForm.licenseValidation)){
                NotificationManager.error(
                  "La licencia está incorrecta o vencida",
                  "Error",
                  3000
                )
              }

          else if (driverForm.licenseUrl == "") {
            NotificationManager.error(
              "Suba la foto de su licencia",
              "Error",
              3000
            )}
        else {
            await axios.post("https://desolate-sea-14156.herokuapp.com/driverForm",{...driverForm,idUser})
            .then(async response=>{
                NotificationManager.success("Su solicitud será revisada y le conctactaremos por email", "Solicitud Enviada", 8000);
                await axios.post("https://desolate-sea-14156.herokuapp.com/sendMail/sendNotificationForm")
                setdriverForm({name:"",email:"",identity:"",phone:"",nacionality:"",country:"",address:"",role:"driver",pasport:"",experience_years:"",license:"",licenseValidation:null,licenseUrl:"",idUser})
                setTimeout(()=>{
                  router.replace("/rent");
                },4000
                 
                )
              })
              .catch(err =>NotificationManager.error("Intentelo de nuevo mas tarde", "Error en la conexion", 8000)
              )
             
        
         
         
           
         
        }
      };

      function countDigits(str) {
        var acu = 0;
    
        Array.prototype.forEach.call(str, function (val) {
          acu += val.charCodeAt(0) > 47 && val.charCodeAt(0) < 58 ? 1 : 0;
        });
    
        return acu;
      }

	return (
		<>
			<main>
                <NotificationContainer />
				<header>
					<h3>
						Rellene el formulario con sus datos para solicitar una plaza como
						conductor
					</h3>
					<h4>
						La respuesta puede demorar hasta una semana ...Debe esperar a un
						administrador ver su perfil y sus datos y será comunicado via email
						o teléfono
					</h4>
				</header>
				<section>
					<form>
                    <div className="col">
                        <h5>Nombre :</h5>
                    <input type="text" value={driverForm.name} name="name" onChange={(e)=>onChangeInput(e)}/>
                    </div>
                    <div className="col">
                        <h5>Email :</h5>
                    <input type="text" value={driverForm.email} name="email" onChange={(e)=>onChangeInput(e)}/>
                    </div>
                    <div className="col">
                        <h5>CI :</h5>
                        <InputMask
                mask="99999999999"
                name="identity"
                value={driverForm.identity}
                onChange={(e) => onChangeInput(e)}
                placeholder="XXXXXXXXXXX"
              />
                    </div>
                    <div className="col">
                        <h5>Teléfono :</h5>
                    <input type="text" value={driverForm.phone} name="phone" onChange={(e)=>onChangeInput(e)}/>
                    </div>
                    <div className="col">
                        <h5>Nacionalidad :</h5>
                        <SelectCountry name="nacionality" country={driverForm.nacionality} onChangeInput={onChangeInput}/>
                    </div>
                    <div className="col">
                        <h5>Dirección :</h5>
                    <input type="text" value={driverForm.address} name="address" onChange={(e)=>onChangeInput(e)}/>
                    </div>
                    <div className="col">
                        <h5>Años de Experiencia :</h5>
                    <input type="number" value={driverForm.experience_years} name="experience_years" onChange={(e)=>onChangeInput(e)}/>
                    </div>
                    <div className="col">
                        <h5>Licencia :</h5>
                        <InputMask
              mask="A9999999"
              name="license" 
              value={driverForm.license}
              onChange={(e)=>onChangeInput(e)}
              placeholder="A99999999"
            /> 
                    
                    </div>
                    <div className="col">
                        <h5>Fecha de Validación :</h5>
                        <InputMask
              mask="99/9999"
              name="licenseValidation"
              value={driverForm.licenseValidation}
              onChange={(e) => onChangeInput(e)}
              placeholder="MM/AAAA"
            />                    </div>
                    <div className="curriculum">
                        <h5>Currículum :</h5>
                    <textarea value={driverForm.curriculum}  name="curriculum" onChange={(e)=>onChangeInput(e)}/>
                    </div>
                    <div className="file">
                        <h5>Foto de la licencia de conducción :</h5>
                    <label  htmlFor="upload">Escoger imagen</label>
                        <input id="upload" type="file" accept="image/*" onChange={(e)=>onAddImage(e)} placeholder="imagen"/>

                        <img src={driverForm.licenseUrl} alt="" />
                    </div>
                    </form>

				</section>
<div className="button">
<button onClick={()=>onSubmit()}><h2>Enviar Solicitud</h2></button>

</div>

			</main>

            <style jsx>{`

            .button {
                display:grid;
                place-items:center;
            }
            button{
                background-color:red;
                color:#000;
                margin:20px;
                padding:10px 30px;
                border:none
            }
            h2{
                margin:0;
            }
            .file{
                margin:20px;
                display:flex;
                flex-direction:column;
            }

            label {
                text-align: center;
                padding: 10px 20px;
                background-color: #000;
                color: #fff;
            }

            header{
                background-color: #000;
                color: #fff;
                display:flex;
                flex-direction:column;
                text-align:center;
            }

            form {
                display:flex;
                align-items:center;
                place-content:center;
                flex-wrap:wrap;
            }
            input[type="file"]{
                display:none;
            }
            .curriculum{
                width:90%;
                display:flex;
                place-items:center;

                flex-direction:column;
                justify-content:space-between;
                margin:10px 20px;
            }

            .col{
                width:300px;
                display:flex;
                justify-content:space-between;
                margin:10px 20px;
            }
            input{
                height:40px;
            }

            textarea {
                width: 100%;
                height: 300px
            }

            img{
                max-width:300px;
                max-height: 250px;
            }
            `}</style>
		</>
	);
}
