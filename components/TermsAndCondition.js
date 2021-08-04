export default function TermsAndCondition({close}) {
  return (
    <>
   
      <main>
        <section>
            <nav>            <h3>Términos y condiciones</h3>
    <button onClick={()=>close()}>X</button>
</nav>
          <h4>
            POR FAVOR, LEA ESTOS TÉRMINOS Y CONDICIONES ANTES DE UTILIZAR ESTE
            SITIO WEB.
          </h4>
          <h5>Cuando reserva con Rent_A_Car, usted acepta los TÉRMINOS Y CONDICIONES que aparecen en estas páginas. Debe leer y aceptarlos antes de reservar sus vacaciones. Una vez que haga la reservación, los siguientes términos y condiciones entrarán en vigor.</h5>
      
            <h4>SEGURO</h4>
            <h5>Recomendamos a todos los pasajeros que compren un seguro de viaje cuando hagan su reservación, pues Rent_A_Car no se responsabiliza con problemas de salud, circunstancias impredecibles en que puedan incurrir los viajeros o daños o pérdida de equipaje.
</h5>
<h4>CAMBIOS REQUERIDOS POR EL CLIENTE
</h4>
<h5>Cualquier cambio requerido por los clientes está sujeto a una penalidad por cancelación.

Todos los cambios están sujetos a las tarifas de los nuevos productos reservados sobre la base de la fecha original de la reservación. Si la reservación es modificada más de una vez, entonces Rent_A_Car se reserva el derecho de incrementar la tarifa de administración.</h5>
       
       <h4>PRECIOS INDICADOS</h4>
       <h5>Todas las tarifas aparecen en dólares norteamericanos (USD) si no se aclara lo contrario. Rent_A_Car se reserva el derecho de cambiar los precios publicados sin previo aviso o aplicar impuestos establecidos por los gobiernos, tarifas relacionadas con el transporte o cobros extras debido a las fluctuaciones de los precios del combustible o de la cotización de la moneda a los viajeros. En el caso de que Rent_A_Car reduzca los precios, las tasas revisadas sólo serán válidas para las nuevas reservaciones. Las tarifas reducidas con anterioridad pueden incrementarse sin previo aviso y sólo son válidas para las nuevas reservaciones.
</h5>
       <h4>DOCUMENTOS</h4>
       <h5>El viajero tiene la responsabilidad de obtener, por cuenta propia, toda la documentación requerida por las autoridades pertinentes. Los funcionarios de la aduana, líneas aéreas e inmigración pueden negar la entrada o salida de sus países bajo cualquier circunstancia. Rent_A_Car no es responsable y no reembolsará ningún dinero. El viajero también es responsable de obtener la información pertinente para viajar, incluyendo los itinerarios, aerolíneas y hoteles. Para mayor información, consulte Documentos y Visas. (I)
</h5>
        </section>
      </main>

      <style jsx>{`
          main {

            top:0;
            background-color: #FF3D3DE6;
            position: fixed;
            width: 90vw;
            height: 90vh;
            margin:3% 5%;
            border-radius: 5px;
            z-index:1;
            overflow-y:scroll;


          }
          nav{
              display:flex;
              justify-content:space-between;
          }
          button{
              padding:4px;
              height:30px;
              width:30px;
              margin:10px;
              background-color:#000;
              color:#fff;
              border-radius:999px;  
              border:none
          }
        
          h4,h3,h5{
              margin-left:10px;
          }
          h4{
              margin-bottom:4px;
              color: #fff;
          }
          h5{
              margin:5px 10px;
          }
        `}
      </style>
    </>
  );
}
