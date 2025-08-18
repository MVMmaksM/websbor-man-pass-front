import { NavLink, Outlet } from "react-router-dom"

export const MainPage = () =>{
    	return (
		<>			
			<div class="d-flex flex-column">				
					<div class="container-fluid" style={{height: '50px'}}>	
						<div class="row" style={{backgroundColor: '#7AA5FF'}}>               
							<header class="col-12 text-center align-items-center shadow">
								<div class="topbar p-3 "> 
									<span className="text-white">Система сбора отчетности</span> 									                    
								</div> 														            
							</header>
						</div>					
						<div class="row navbar navbar-light bg-white shadow h-100">
							<nav class="col-12"> 
								<div className="row">
									<div class="d-flex justify-content-center"> 
										<div className="col-2 text-center">
											<NavLink className="text-decoration-none" to={"/main"}>Главная</NavLink>
										</div>    
										<div className="col-2 text-center">
											<NavLink className="text-decoration-none" to={"/respondents"}>Учетные данные респондентов</NavLink>
										</div>    
										<div className="col-2 text-center">
											<NavLink className="text-decoration-none" to={"/catalog"}>Каталог Web-сбора</NavLink> 
										</div>   
										<div className="col-2 text-center">
											<NavLink className="text-decoration-none" to={"/users"}>Пользователи</NavLink> 
										</div>   
										<div className="col-2 text-center">
											<NavLink className="text-decoration-none" to={"/logs"}>Activity log</NavLink> 
										</div>         
										<div className="col-2 text-center">
											<NavLink className="text-decoration-none" to={"/profile"}>Профиль</NavLink> 
										</div>                       
									</div>   
								</div>                                                          
							</nav>
						</div>
					</div>				
			</div>
			<div id="main_page">
				<Outlet />				
			</div>	
		</>	
	)
}