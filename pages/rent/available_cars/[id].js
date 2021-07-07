import axios from "axios";
import BackIcon from '../../../svgs/icons/Back'
import router, {useRouter} from 'next/router'
import { useEffect } from "react";
export default function AvailableCars({listCar,days,id}) {
    const router = useRouter();
    
   
    const removeRent= async()=>{
        await axios.delete(`https://desolate-sea-14156.herokuapp.com/rent/${id}`)
        .then(()=>router.back())
    }
    
    return (
        <>
        <div className="icon" onClick={(e) =>removeRent(e)}>
        <BackIcon/>
        </div>
        <div className="grid">
           <h3> Autos disponibles</h3>
            <main>
               
                {listCar.map(car=>(
                    <section key={car._id}>
                        <div>
                        <img src={car.imageUrl} alt="" />
                        </div>
                        <div className="info">
                            <h4>{`${car.brand} ${car.model}`}</h4>
                        </div>

                        <div className="btn">
                            <p>Precio : {car.price_per_day * days}</p>
                            <button>Seleccionar</button>
                        </div>
                    </section>
                ))}
            </main>

            <style jsx>{`
            main{
                display:flex;
                flex-direction: column;
                width:90vw;
                height:90vh;
                overflow-y: scroll;
                border-radius: 5px;
            }
         
            h3{
                text-align: center;
                margin-top:0;
            }
            section{
                margin:10px 10px;
                border: 1px solid #eee;
                border-radius: 10px;
                display:flex;
                flex-direction: column;
                align-items: center;
                align-content: center;
                justify-content: space-between;
            }
            button{
                background-color: #000;
                color: #fff;
                border-radius: 5px;
                border:none;
                margin:0;
                padding:20px 30px;
            }
            img{
                width:200px
            }
            .grid{
                display:grid;
                place-content:center;
            }
            `} </style>
        </div>
        </>
    );
}

export const getServerSideProps = async (ctx) => {
    const {id} = ctx.query
    var days = 0
    var listCar = []
    await axios.get(`https://desolate-sea-14156.herokuapp.com/rent/${id}`)
    .then(async(res) => {
        if(res.data)
        {
        const {pickUp,dropOff} = res.data

        days = (new Date(dropOff).getTime() - new Date(pickUp).getTime()) / (1000 * 60 * 60 * 24)
        await axios.post(`https://desolate-sea-14156.herokuapp.com/rent/searchAvailable`,{pickUp,dropOff})
        .then((response) => {
            listCar=response.data
        })}
       
    })

    return {
        props:{
            listCar,
            days,
            id
        }
    }
}