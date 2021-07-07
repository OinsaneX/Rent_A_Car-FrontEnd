import NavBar from "../../components/NavBar";

export default function() {
    return (
        <div>
            <NavBar/>
            <main>
                <h3>Actualmente no tenemos ofertas</h3>
            </main>

            <style jsx>
                {`
                main{
                    display:grid;
                    height:100 vh;
                    width:100vw;
                    place-content: center;
                    plca-items: center;
                }
                `}
            </style>
        </div>
    );
}