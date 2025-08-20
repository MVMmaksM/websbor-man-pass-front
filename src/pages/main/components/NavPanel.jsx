import { NavLink } from "react-router-dom"
import { Profile } from "./Profile"

export const NavPanel = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <div className="container-fluid">
                <div className="d-flex justify-content-center w-100">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <NavLink
                                to="/main/respondents"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'text-muted' : 'text-primary'}`
                                }
                            >
                                Учетные данные респондентов
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/main/catalog"
                                className="nav-link text-dark"
                            >
                                Каталог Web-сбора
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/main/users"
                                className="nav-link text-dark"
                            >
                                Пользователи
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/main/logs"
                                className="nav-link text-dark"
                            >
                                Activity log
                            </NavLink>
                        </li>
                    </ul>
                    {/* Иконка профиля — в правом верхнем углу навбара */}
                    <Profile />
                </div>
            </div>
        </nav>
    )
}