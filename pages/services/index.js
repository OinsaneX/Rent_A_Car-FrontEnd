import Support from '../../svgs/img/Support'
import Work from '../../svgs/img/Work'
import About from '../../svgs/img/About'
import NavBar from '../../components/NavBar';


export default function() {
    return (
        <>
        <NavBar/>
            <main>

                <section>
                <div className="card">
                    <h3>Soporte</h3>
                    <header>
                    <Support/>
                    </header>

                    <h4>
                    Contacte con algun administrador en caso de dudas
                    </h4>
                    <button>
                        Accesar
                    </button>
                </div>
                <div className="card">
                <h3>Empleo</h3>

                    <header>
                    <Work/>
                    </header>

                    <h4>
                    Envie formulario para trabajar con nosotros como chofer
                    </h4>
                    <button>
                        Enviar
                    </button>
                </div>
                <div className="card">
                <h3>Sobre</h3>

                    <header>
                    <About/>
                    </header>

                    <h4>
                    Descubra el equipo de la empresa
                    </h4>
                    <button>
                        Descubrir
                    </button>
                </div>
                </section>
            </main>

            <style jsx>{`
            section{
                display:flex;
                justify-content:center;
                flex-wrap:wrap;
                text-align:center;
                
            }
            .card{
                display:grid;
                place-items:center;
                place-content:center;
                box-shadow: 0px 0px 5px rgba(0, 0, 0,1);
                margin:20px;
                width:400px
            }

            button{
                margin:10px;
                padding:10px 20px;
                border: none;
                background-color: #000;
                color: #fff;
            }

            `}</style>
        </>
    );
}