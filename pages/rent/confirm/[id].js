import axios from "axios";

export default function Confirm({id}) {


  
    return (
        <div>
            <h2>
                Su renta ha sido confirmada
            </h2>
        </div>
    );
}

export const getServerSideProps = async (ctx) => {
const {id} = ctx.query
await axios.get(`https://desolate-sea-14156.herokuapp.com/rent/${id}/confirm`)
    return {
        props:{
           data: null
        }
    }
}