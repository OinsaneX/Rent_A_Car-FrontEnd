import Link from 'next/link'

export default function AdminNav() {
    return (
        <nav>
        <p className="title">Admin</p>

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
            <Link href="/">
                <a className="link">
                    Registro
                </a>
            </Link>
        
        </div>
        <style jsx>
            {`
              nav{
                background-color: #0009;
                display: flex;
                justify-content:space-between;
                align-items:center;
                align-content:center;
                padding:0 20px;
                color: #fff;

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
            .link{
                
                margin:0 14px;
                font-size:20px;
                font-weight:bold;
                font-style:italic;
            }
            `}
        </style>
    </nav>
    );
}