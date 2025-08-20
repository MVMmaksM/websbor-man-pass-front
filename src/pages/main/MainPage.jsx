import {Outlet } from "react-router-dom"
import {Header} from "./components/Header"
import { useEffect } from 'react';

export const MainPage = () =>{

	useEffect(()=>{
		document.title = "Система хранения учетных данных"
	})

    return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			{/* Основное содержимое */}
			<main id="main_page" className="flex-grow-1">
				<Outlet />
			</main>
		</div>		
	)
}