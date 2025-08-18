import { NavLink, Outlet } from "react-router-dom"

export const MainPage = () =>{
    	return (
		<div id="main">
			<div id="menu">
				<nav>
					<NavLink to={"/products"}>Products</NavLink>
					<NavLink to={"/sellers"}>Sellers</NavLink>
				</nav>
			</div>
			<div id="main_page">
				<Outlet />				
			</div>
		</div>
	)
}