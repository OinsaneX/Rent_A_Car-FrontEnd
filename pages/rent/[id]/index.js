import axios from "axios";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useRouter } from "next/router";
import { useEffect } from "react";




export default function Contract({rent,car,user}) {
    const router = useRouter();
    const [loading, setloading] = useState(false)



    const sendEmailConfirm =async()=>{
        await axios.post("https://desolate-sea-14156.herokuapp.com/sendMail/confirm",{car,email:user.email,asunto:"Confirmar Renta",rent})
        .then(res=> router.replace("/rent/emailSend"))
      
           
          
    }


    return (
        <>
        <NotificationContainer/>
        <div className="full">
        {loading &&  <div className="loader">
        <h2>
               Se ha enviado un link de confirmacion a su correo
            </h2>
            <button>Enviar nuevamente</button>
            </div>}
            <header>
            <h3>Detalles de la reserva</h3>
            <h4>Verifique toda la informacion antes de terminar la reserva ...Una vez concluido será enviado un email con un lnk para confirmar la reserva </h4>
            </header>
            <main>
                <div className="image">
                <img src={car.imageUrl} alt="" />

                </div>

                <section>
                <div className="col">
                <h3>{`Precio por dia : ${car.price_per_day} $`}</h3>
                <h3>{`Precio total : ${rent.price} $`}</h3>
                <h3>{`Dias de reserva : ${rent.days} `}</h3>

                </div>
                <div className="col">
                <h3>{`Lugar de recogida : ${rent.location}`}</h3>
                <h3>{`Fecha de recogida : ${new Date(rent.pickUp).getUTCDate()}/${new Date(rent.pickUp).getMonth()+1}/${new Date(rent.pickUp).getFullYear()}`}</h3>
                <h3>{`Fecha de entrega : ${new Date(rent.dropOff).getUTCDate()}/${new Date(rent.dropOff).getMonth()+1}/${new Date(rent.dropOff).getFullYear()}`}</h3>
                </div>
                <div className="col flex1">
                <h3>{`Nombre del Usuario : ${user.name}`}</h3>
                <h3>{`Email del usuario : ${user.email}`}</h3>
                <h3>{`País del usuario : ${user.country}`}</h3>
                </div>

                </section>

               

            </main>

            <div className="terms">
                <h3 className="red">CARGOS ADICIONALES
</h3>
<h4>En Cuba al momento de recoger el auto deberá pagar los siguientes cargos. Todas las tarifas son en USD:

</h4>

<ul>
    <li>
    Fee de aeropuerto: $ 20.00 USD (Si la recogida del auto es en un aeropuerto)

    </li>
    <li>
    Segundo conductor: $ 3.00 USD por cada día de renta

    </li>
    <li>
    Combustible: Paga el combustible que tenga el auto al momento de recogerlo y devuelve el auto con el tanque vacío.

    </li>
    <li>
    Devolución: El cargo por devolver el auto en un lugar diferente al de recogida se paga al devolver el auto. Ver Detalles

    </li>
</ul>

        <h3 className="red">CONDICIONES DE RENTA
</h3>
<h4>POR FAVOR LEA ATENTAMENTE.
</h4>

<ol>
    <li>
    Para recoger el auto en Cuba hay que ser mayor de 21 años de edad y es obligatorio presentar los siguientes documentos:
        <ol>
            <li>
            Voucher
            </li>
            <li>
            Licencia de Conducción vigente del titular de la reserva (no se admiten cambios de nombre) con mas de 2 años de antigüedad (no se aceptan fotocopias)

            </li>
            <li>
            Pasaporte (no se aceptan fotocopias)

            </li>
            <li>
            Clientes con residencia permanente en Cuba deben presentar documento de identidad actualizado, debe ser la última versión del carnet de identidad cubano.


            </li>
        </ol>
    </li>

    <li>
    El cliente se compromete a pagar todos los adeudos derivados por el servicio prestado en el presente contrato.

    </li>
    <li>
    El cliente reconoce haber recibido el vehículo en buen estado de funcionamiento junto con los accesorios descritos en el mismo y se compromete a devolverlo con las mismas condiciones que lo recibió y en la fecha específica en el momento de la renta, así como a pagar los accesorios y partes del vehículo que falten al momento de la entrega y que no hayan sido señalados como faltantes al recibir el mismo.

    </li>
    <li>
    El tiempo de arriendo es el consignado en el contrato y se computa en base a horas y días desde el acto de su firma, debiendo liquidarlo en la fecha y hora estipulada. Si el cliente desea prolongar la renta deberá presentarse en la oficina de RentACar más próxima para legalizar la tenencia del vehículo.

    </li>
    <li>
    El cliente abonará en calidad de depósito el importe estipulado en el tarifario público de RentACar para cada tipo de vehículo. Si el depósito de garantía es en forma de comprobante de cargo en tarjeta de crédito firmado en blanco, RentACar estará autorizado a llenarlo y cobrarlo en cualquier momento sin previo aviso por los valores gastados por el cliente de conformidad con las cláusulas del presente contrato.

    </li>
    <li>
    El cliente tiene 59 minutos de bonificación, pasado ese tiempo y hasta 5 horas abonará el 1/5 de la tarifa diaria por cada hora extra.

    </li>
    <li>
    RentACar solo realizará devoluciones al titular del contrato y en la misma forma de pago en que se efectuó el arrendamiento.

    </li>
    <li>
    El vehículo solo podrá ser conducido por el cliente o por el conductor adicional autorizado bajo la total responsabilidad de este.

    </li>
    <li>
    El cliente y los conductores autorizados están obligados a cumplir las disposiciones del tránsito vigentes, así como a no excederse en el límite de personas transportadas fijado para cada tipo de vehículos en el anverso del contrato.

    </li>
    <li>
    Cuando se detecte la conducción del vehículo arrendado por personas no autorizadas en el contrato, los inspectores del Ministerio de Turismo o del propio Grupo Empresarial Transtur, de comprobar esta violación, notificaran esta situación en el contrato al cliente con una penalidad ascendente a la perdida del importe de los días pendientes de utilizar y el deposito de garantía, así como procederán a retirarle el vehículo arrendado, perdiendo además el derecho a acogerse a la cobertura de relevo de responsabilidad.

    </li>
    <li>
    El cliente renuncia a todas demandas contra RentACar por cualquier daño accidental causado por mala manipulación, incumplimiento de las normas de tránsito o de mantenimiento del vehículo.

    </li>
    <li>
    RentACar no se responsabiliza por el robo, pérdida o daño de cualquier bien, propiedad personal del cliente o sus pasajeros, dejados o abandonados en el vehículo durante o después del período de renta.

    </li>
    <li>
    Cuando así lo decida RentACar podrá cancelar este contrato y proceder al reembolso del 100% del tiempo no utilizado, excepto que incurra en violaciones de lo establecido en el presente.

    </li>
    <li>
    RentACar releva a su cliente de responsabilidad, siempre que este cumpla con lo estipulado en el presente contrato, protegiendo al mismo contra incendio, robo total o parcial, choque o vuelco, accidentes, y catástrofes naturales, así como por daños a la propiedad ajena y/o lesiones o muerte producidas a terceras personas, provocadas en ocasión e conducir un vehículo por la vía pública. En todos los casos el cliente deberá notificar de inmediato a las autoridades competentes y presentar a la agencia antes o en el momento de liquidar los adeudos, el comprobante de haber formulado la denuncia en el caso de pérdida o sustracciones; y en el caso de accidente, informe de la policía del lugar del hecho o e los inspectores de la Empresa , que será la vía para definir su culpabilidad o no en los daños ocasionados. De ser culpable, el cliente quedará cubierto durante el período de vigencia del contrato y en caso de accidente hasta doce horas posteriores al vencimiento del mismo, con su correspondiente trámite legal.

    </li>
    <li>
    El cliente perderá todo el derecho a ser relevado de responsabilidad por RentACar cuando haya incurrido en actuaciones negligentes o violación de las leyes vigentes y lo pactado en el presente contrato, así como por la conducción del vehículo en estado de embriaguez o bajo los efectos de sustancias psicotrópicas y la manipulación del mismo por un conductor no autorizado en el presente contrato, debiendo pagar el importe total de las de las afectaciones causadas al vehículo y a terceros, en caso de detectarse alguna de estas irregularidades.

    </li>
    <li>
    El cliente está obligado a presentar el vehículo en la Agencia más cercana antes de rebasar el kilometraje señalado en contrato para cada mantenimiento, así como a revisar los niveles de aceite, agua del radiador y presión de aire en los neumáticos. Cualquier avería o paralización que se produzca al vehículo por la violación de esta cláusula deberá ser abonado por el cliente.

    </li>
    <li>
    En caso de violación comprobada del reloj cuentakilómetros, el cliente deberá pagar un recorrido equivalente a 200 kilómetros por día o por fracción de días, el tiempo que hubiera tenido en su poder, penalidad que también se hará efectiva si el cuentakilómetros deja de funcionar y el cliente no da aviso oportuno a la Rentadora.

    </li>
    <li>
    El cliente está obligado a cumplir con las siguientes limitaciones: No hacer uso del vehículo de forma lucrativa; no utilizarlo como tracción de otro vehículo; no sobrecargarlo con relación a su resistencia y/o capacidad; cerrar con llave el vehículo cuando permanezca fuera de él; no participar en carreras, pruebas de resistencia, velocidad y acrobacia y no transportar materiales inflamables, explosivos, drogas o similares.

    </li>
    <li>
    En caso de rotura, accidente u otro percance similar, el cliente deberá informar de inmediato a la Agencia más cercana, así como tomar las medidas de seguridad evitando daños, accidentes o robos. El cliente es responsable del vehículo mientras lo tenga bajo su custodia mediante este contrato.

    </li>
    <li>
    Si el cliente es privado del uso del vehículo rentado, por la comisión de un delito o violación de disposición administrativa por organismo legalmente autorizado, no tendrá derecho a reclamar ningún tipo de devolución de la renta, debiendo pagar los gastos por lucro cesante por paralización del vehículo y por los accidentes que se ocasionen. En caso de decomiso el vehículo vendrá obligado a pagar a la Rentadora el valor del mismo.

    </li>
    <li>
    El cliente podrá efectuar las liquidaciones del vehículo rentado en cualquier Agencia dela Rentadora autorizada para recibirlo, pagando adicional el retorno a la Agencia que lo rentó en base a los suplementos por retorno vacío o drop off establecidos.

    </li>
    <li>
    El cliente esta obligado a usar a serviciar de combustible el vehículo única y exclusivamente con gasolina super especial.

    </li>
    <li>
    La tarifa de renta, venta de combustible, Kms adicionales, exceso de tiempo del servicio rentado y retorno a la oficina Rentadora, está sujeta a cambios sin previo aviso.

    </li>
    <li>
    El servicio de auxilio se brinda de forma gratuita por cualquier Agencia Rentadora, siempre que el cliente no sea culpable. Si el cliente fuese culpable pagará por el servicio según tarifa definida por la Empresa.

    </li>
    <li>
    Cualquier negligencia producida por el cliente que provoque daño o afectación al vehículo arrendado y en su defecto a la rentadora, éste deberá abonar la penalidad establecida en los suplementos de penalidades y averías por la rentadora para tales efectos.

    </li>
        
</ol>

<h3 className="red">Penalidades por Incumplimiento Contractual del Usuario

</h3>
<ol>
    <li>
    Entregar vehículo sucio: $ 50 usd
    Entiéndase vehículo extremadamente sucio en su exterior o interior (con incrustaciones de asfalto en abundancia, sustancias extrañas, manchas indelebles, olores desagradables, etc.) que impidan su rápida preparación y nueva ubicación como vehículo disponible para la renta.

    </li>
    <li>
    Transportar animales: $ 50 usd
Transportar en el vehículo animales domésticos u otros.
    </li>
    <li>
    Deterioro del forro o cubierta de los asientos. Perdida de cubre alfombras y alfombra de maletero:
El importe de la penalidad equivale a la rotura, quemaduras, manchas, suciedad del forro o cubiertas de los asientos. Se penaliza según listado de averías.
    </li>
    <li>
    Conductor no autorizado:
El cliente pierde el importe pagado en su totalidad, incluyendo días pendientes de disfrutar y la garantía depositada al inicio de la renta. En el caso de alguna afectación adicional provocada al vehículo, se cobra además el importe total de los daños ocasionados y al titular del contrato se le declara Cliente No Grato.
    </li>
    <li>
    Entrega del auto por el conductor adicional y no por el titular del contrato: $ 50 usd
El importe de la penalidad equivale a la entrega del auto por el conductor adicional y no por el titular del contrato.
    </li>
    <li>
    Pérdida o deterioro del contrato o documentos adjuntos: $ 50 usd
El importe de la penalidad equivale a la pérdida o deterioro de los documentos que impide la visualización de una o todas las copias del contrato.
    </li>
    <li>
    Afectaciones provocadas por accidentes, roturas o pérdidas de accesorios:
Se cobra el importe del daño provocado según listado de averías, siempre y cuando se haya incurrido en una causal de exclusión de póliza. Se excluye del beneficio reflejado anteriormente, el robo o sustracción del equipo de audio y de cualquiera o del juego completo de neumáticos del vehículo, los cuales tendrán que ser abonados por el cliente al precio establecido en el listado de averías, sea o no responsable de dicha afectación.
    </li>
    <li>
    Colocación de pegatinas o accesorios al vehículo sin autorización de la rentadora: $ 200 usd
Colocar en el vehículo accesorios que no son los entregados y que afecten la imagen del vehículo establecida por la entidad propietaria. Incluye el tintado (empapelado) de los cristales o el uso de papel polarizado.
    </li>
    <li>
    Exceso de pasajeros: $ 100 usd
Entiéndase por encima de la capacidad de personas estipuladas para cada tipo de vehículo.


    </li>
    <li>
    Remolcar otro vehículo: $ 100 usd
Utilizar el vehículo arrendado para remolcar cualquier otro vehículo.

    </li>
    <li>
    Entregar el vehículo con más de 3 y hasta 23 horas pasado de la hora pactada en el contrato:
Se abonará por parte del cliente un día extra, sin el cobro del relevo de responsabilidad, de la tarifa aplicada en el contrato.

    </li>
    <li>
    Entregar el vehículo con más de 23 y hasta 47 horas pasados de la hora y fecha pactada en el contrato:
Se abonará por parte del cliente la penalidad de un día extra, con el cobro del relevo de responsabilidad, de la tarifa aplicada.

    </li>
    <li>
    Entrega del auto pasado de la fecha pactada en contrato, en la renta lineal: $ 100 usd
Se abonará por parte del cliente la penalidad de los días extra pasados por tarifa pública según temporada.

    </li>
    <li>
    Entregar el vehículo en un punto de renta diferente a donde haya pactado la liquidación:
En el caso de la que la liquidación del auto, no coincida con el lugar pactado reflejado en el contrato, el cliente deberá pagar un 50% por encima del Drop-off.

    </li>
    <li>
    Violación del mantenimiento: 100 usd
Conducir el vehículo pasado de kilometraje de realización del mantenimiento previsto y reflejado en el escaque correspondiente del contrato de renta.

    </li>
    <li>
    Utilizar el vehículo en actividades ilícitas:
El cliente pierde el importe pagado en su totalidad, incluyendo los días pendientes de disfrutar y la garantía depositada al inicio de la renta, retirándosele el vehículo de forma definitiva. En caso de haberse ocasionado daños o afectaciones al vehículo pierde además el derecho al relevo de responsabilidad, debiendo pagar los mismos según listado de averías. Entiéndase actividades ilícitas las presuntamente constitutivas de delito o contravención, según la legislación cubana. Además se declara al Cliente No Grato.


    </li>
    <li>
    Pérdida o deterioro de la llave del vehículo:
Según listado de averías.


    </li>
    <li>
    Pérdida de las matriculas o cambio sin formular denuncias: 50 usd
Perder o cambiar cada matricula del vehículo y presentarse en la oficina de venta sin presentar el comprobante de haber formulado denuncia ante la PNR.


    </li>
    <li>
    Utilización del vehículo en circuitos, carreras, competencias o concursos semejantes:
Por tratarse de una exclusión de póliza, el cliente pierde el importe pagado en su totalidad, incluyendo los días pendientes de disfrutar y la garantía depositada al inicio de la renta, retirándosele el vehículo de forma definitiva. En caso de haberse ocasionado daños o afectaciones al vehículo pierde además el derecho al relevo de responsabilidad, debiendo pagar los mismos según listado de averías. Además de ser declarados los titulares como No Grato.


    </li>
    <li>
    Abastecer el vehículo con combustible diferente al autorizado o establecido por la entidad propietaria o combustible contaminado:
Por tratarse de una exclusión de póliza, el cliente pierde el importe pagado en su totalidad, incluyendo los días pendientes de disfrutar y la garantía depositada al inicio de la renta, retirándosele el vehículo de forma definitiva. En caso de haberse ocasionado daños o afectaciones al vehículo pierde además el derecho al relevo de responsabilidad, debiendo pagar los mismos según listado de averías.

    </li>
    <li>
    Conducir el vehículo de forma agresiva o irresponsable, con maltrato del mismo: 200 usd
Conducir el vehículo sin tomar todas las precauciones razonables para evitar o disminuir los accidentes, daños o pérdidas. Conducir de forma temeraria o maltratar injustificadamente al vehículo. Como pudiera ser manejar a altas velocidades, con manifiesta desatención a la conducción del vehículo, bajo los efectos de la ingestión de bebidas alcohólicas o sometiéndolo a un régimen de conducción o explotación excesivo. Como pudiera ser, transitar por la duna, terrenos pantanosos, inundados, vías intransitables, etc. Si como resultado de cualquiera de las situaciones expuestas, se producen daños al vehículo que pudieran considerarse una exclusión de la póliza, no se aplicará la penalidad, pero el cliente pierde el importe pagado en su totalidad, incluyendo los días pendientes de disfrutar y la garantía depositada al inicio de la renta, retirándosele el vehículo de forma definitiva. Pierde también el derecho al relevo de responsabilidad, debiendo pagar los daños según valor del listado de averías y se declara al Cliente como No Grato.

    </li>
    <li>
    Cambio de cualquier pieza o agregado del vehículo o calzar los amortiguadores:
El cliente pierde el importe pagado en su totalidad, incluyendo los días pendientes de disfrutar y la garantía depositada al inicio de la renta. Además, se cobrara la afectación provocada al vehículo según listado de averías y se incluye al cliente en el listado de No Grato.


    </li>
 
</ol>

                </div>

        </div>
        <button onClick={()=>sendEmailConfirm()}><h2>OK</h2></button>

        <style jsx>{`

        .full{
            width:100vw;
            height:100vh;
        }
        h3,h4{
            margin:4px 5px;
        }
        header{
            display:grid;
            place-content: center;
            place-items: center;
            background-color: #000;
            color: #fff;
        }
    main{
        margin:4px 4px;
        border: 3px solid #eee;
        display:flex;
        flex-wrap: wrap;
        box-shadow: 0px 0px 10px rgba(0, 0, 0,1);

    }
    .red{
        color:red
    }
    .loader {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 9999;
        opacity: 1;
        display:grid;
        place-content: center;
        place-items: center;
    }
    h2{
        margin:0;
    }
    li{
        margin:0 10px
    }
    .terms{
        width:100vw;
        display:grid;
        place-content: center;
        place-items:center;
    }
    button{
        position:fixed;
        bottom:20px;
        color:#fff;
        right:20px;
        padding: 30px 30px;
        border-radius:999px;
        background-color: #000;
        border:0;
        box-shadow: 0px 0px 10px rgba(0, 0, 0,1);

    }
    section{
        display:flex;
        align-content:center;
        align-items:center;
        flex-wrap: wrap;
        flex:1;
        background-color: #eee;

    }
    .image{
        display:flex;
        justify-content:center;
        width:100%;
    }
    img{
        width:300px;

    }
 
    .col{
        display:grid;
        place-items:center;
        place-content:center;
        min-width:300px;
        text-align:center;
        flex:1;
    }
    @media only screen and (min-width: 940px) {
    .image{
        width:20%;
        min-width:300px;
    }
    }

        `}</style>
        </>
    );
}


export const getServerSideProps = async (ctx) => {

    const {id} = ctx.query

    var rent =null
    var car =null
    var user = null
    await axios.get(`https://desolate-sea-14156.herokuapp.com/rent/${id}`).then(async(res) => {
        rent=res.data
        await axios.get(`https://desolate-sea-14156.herokuapp.com/user/${res.data.idUser}`)
        .then(async(resUser) => {
            user = resUser.data
            await axios.get(`https://desolate-sea-14156.herokuapp.com/car/${rent.idCar}`)
            .then(response => {
                car = response.data
            })
        })
     
})
    return {
        props:{
            rent,
            car,
            user

        }
    }
}