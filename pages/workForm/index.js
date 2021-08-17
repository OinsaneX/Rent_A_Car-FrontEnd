import axios from "axios";
import { useState } from "react";

export default function WorkForm() {

        const [driverForm, setdriverForm] = useState({licenseUrl:""})
        const [loading, setloading] = useState(undefined)

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

	return (
		<>
			<main>
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
                    <input type="text" />
                    </div>
                    <div className="col">
                        <h5>Email :</h5>
                    <input type="text" />
                    </div>
                    <div className="col">
                        <h5>CI :</h5>
                    <input type="text" />
                    </div>
                    <div className="col">
                        <h5>Teléfono :</h5>
                    <input type="text" />
                    </div>
                    <div className="col">
                        <h5>Nacionalidad :</h5>
                    <input type="text" />
                    </div>
                    <div className="col">
                        <h5>Dirección :</h5>
                    <input type="text" />
                    </div>
                    <div className="col">
                        <h5>Años de Experiencia :</h5>
                    <input type="number" />
                    </div>
                    <div className="col">
                        <h5>Licencia :</h5>
                    <input type="text" />
                    </div>
                    <div className="col">
                        <h5>Fecha de Validación :</h5>
                    <input type="number" />
                    </div>
                    <div className="curriculum">
                        <h5>Currículo :</h5>
                    <textarea  />
                    </div>
                    <div className="file">
                        <h5>Foto de la licencia de conducción :</h5>
                    <label  htmlFor="upload">Escoger imagen</label>
                        <input id="upload" type="file" accept="image/*" onChange={(e)=>onAddImage(e)} placeholder="imagen"/>

                        <img src={driverForm.licenseUrl} alt="" />
                    </div>
                    </form>
				</section>
			</main>

            <style jsx>{`

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
