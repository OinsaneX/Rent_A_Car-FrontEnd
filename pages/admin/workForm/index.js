import axios from "axios";
import { useEffect, useState } from "react";
import AdminNav from "../../../components/AdminNav";
import Link from 'next/link'
export default function workFormAdmin() {

  const [forms, setforms] = useState([])

  useEffect(() => {
    getForms()
  }, [])

  const getForms = async()=>{
    await axios.get("https://desolate-sea-14156.herokuapp.com/driverForm")
    .then((response)=>setforms(response.data))
  }
  return (
    <div>
      <AdminNav></AdminNav>
    
    <main>
    {forms.map(form =>(
        <div className="card">
          <header>
          <h2>{form.name}</h2>

          </header>
          <section>
          <h4>{`Enviado el ${new Date(form.createdAt).getDate()}-${new Date(form.createdAt).getMonth()}-${new Date(form.createdAt).getFullYear()}`}</h4>

          <Link href={`/admin/workForm/${form._id}`}>
          <a>Ver detalles</a></Link>
          </section>
        </div>
))}
    </main>

    <style jsx>{`
    main{
      display:flex;
      flex-wrap:wrap;
      justify-content:center;
    }

    .card{
      width:400px;
      text-align:center;
      margin:20px 30px;
      box-shadow: 0px 0px 10px #eee;
      padding:10px
     }
    a h4{
      margin:4px
    }
    a {
      padding:10px 20px;
      border:none;
      box-shadow: 0px 0px 10px #0009;

    }
    a:hover {
      background-color: #000;
      color: #fff
    }
    
    `}</style>
    </div>
  );
}