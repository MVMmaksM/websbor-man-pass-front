import { Outlet, useLocation } from "react-router-dom"
import { Header } from "./components/Header"
import { PageTitle } from "../../components/PageTitle"

export const MainPage = () => {

	return (
		<>
			<PageTitle />
			<div className="d-flex flex-column min-vh-100">
				<Header />
				{/* Основное содержимое */}
				<main id="main_page" className="flex-grow-1 bg-light">
					<Outlet />
				</main>
			</div>
		</>

	)
}