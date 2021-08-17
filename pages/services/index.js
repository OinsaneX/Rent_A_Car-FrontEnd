import Support from "../../svgs/img/Support";
import Work from "../../svgs/img/Work";
import About from "../../svgs/img/About";
import NavBar from "../../components/NavBar";
import Link from "next/link";

export default function Services() {
	return (
		<>
			<NavBar />
			<main>
				<section>
					<div className="card">
						<h3>Soporte</h3>
						<header>
							<Support />
						</header>

						<h4>Contacte con algun administrador en caso de dudas</h4>
						<Link href="/support"><a>Accesar</a></Link>
					</div>
					<div className="card">
						<h3>Empleo</h3>

						<header>
							<Work />
						</header>

						<h4>Envie formulario para trabajar con nosotros como chofer</h4>
						<Link href="/workForm"><a>Enviar</a></Link>
					</div>
					
				</section>
			</main>

			<style jsx>{`
				section {
					display: flex;
					justify-content: center;
					flex-wrap: wrap;
					text-align: center;
				}
				.card {
					display: grid;
					place-items: center;
					place-content: center;
					box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);
					margin: 20px;
					width: 400px;
				}

				a {
					margin: 10px;
					padding: 10px 20px;
					border: none;
					background-color: #000;
					color: #fff;
				}
			`}</style>
		</>
	);
}
