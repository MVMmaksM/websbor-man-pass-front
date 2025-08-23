import { NavLink } from "react-router-dom"
import { Profile } from "./Profile"

export const NavPanel = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container-fluid">
                <div className="d-flex justify-content-center w-100">
                    <ul id="menu" className="nav nav-pills">                        
                        <li className="nav-item">
                            <NavLink
                                to="/main/respondents"
                                className={({ isActive }) =>
                                    `nav-link  ${isActive ? 'active' : ''}`
                                }                               
                            >
                                Учетные данные респондентов
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/main/catalog"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'active' : ''}`
                                }     
                            >
                                Каталог Web-сбора
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/main/users"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'active' : ''}`
                                }   
                            >
                                Пользователи
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/main/logs"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'active' : ''}`
                                }   
                            >
                                Activity log
                            </NavLink>
                        </li>
                    </ul>                   
                </div>
            </div>
        </nav>
    )
}