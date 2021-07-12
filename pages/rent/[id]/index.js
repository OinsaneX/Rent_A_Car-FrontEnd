import axios from "axios";

export default function Contract({rent,car,user}) {
    return (
        <>
        <div className="full">
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
                <h3>{`Fecha de recogida : ${new Date(rent.pickUp).getDate()}/${new Date(rent.pickUp).getMonth()+1}/${new Date(rent.pickUp).getFullYear()}`}</h3>
                <h3>{`Fecha de entrega : ${new Date(rent.dropOff).getDate()}/${new Date(rent.dropOff).getMonth()+1}/${new Date(rent.dropOff).getFullYear()}`}</h3>
                </div>
                <div className="col flex1">
                <h3>{`Nombre del Usuario : ${user.name}`}</h3>
                <h3>{`Email del usuario : ${user.email}`}</h3>
                <h3>{`País del usuario : ${user.country}`}</h3>
                </div>

                </section>

            </main>

        </div>
        <button><h2>OK</h2></button>

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
    }
    h2{
        margin:0;
    }
    button{
        position:fixed;
        bottom:20px;
        right:20px;
        padding: 30px 30px;
        border-radius:999px;
        background-color: #16CC51A1;
        border:0;
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
        width:20%;
        min-width:300px;
    }
    img{
        max-width:300px;

    }
    .flex1{
        flex:1;
    }
    .col{
        display:grid;
        place-items:center;
        place-content:center;
        min-width:300px;
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
        console.log(rent)
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