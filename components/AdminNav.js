import Link from 'next/link'

export default function AdminNav() {
    return (
        <nav>
        <h2 className="title">Admin</h2>

        <div className="links">
            <Link href="/admin/car_manager/">
                <a className="link">
                    Autos
                </a>
            </Link>
            <Link href="/admin/user/manager">
                <a className="link">
                    Usuarios
                </a>
            </Link>
        
     
        </div>
        <style jsx>
            {`
              nav{
                background-color: #0009;
                display: flex;
                height:60px;
                justify-content:space-between;
                align-items:center;
                align-content:center;
                padding:0 20px;
                color: #fff;
                box-shadow: 0px 0px 10px rgba(0, 0, 0,1);


            }
 .links{
                display: flex;

            }
 .title{
                font-size:28px;
                cursor:default;
            }
            p{
                margin:0;
            }
            h2{
                text-shadow: 0px 0px 4px rgba(255, 255, 255,1);

            }
            .link{
                
                margin:0 14px;
                font-size:20px;
                font-weight:bold;
                font-style:italic;
            }
            .link:hover{
                text-decoration:underline;
            }
            `}
        </style>
    </nav>
    );
}