import { NavLink } from "react-router-dom"
import { Profile } from "./Profile"
import { useSelector } from "react-redux"

export const NavPanel = () => {
    const userRole = useSelector(state => state.profile.profile.role_code);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container-fluid">
                <div className="d-flex justify-content-center w-100">
                    <ul id="main_nav_panel" className="nav nav-pills">
                        <li className="nav-item">
                            <NavLink
                                to="/main/resp"
                                className={({ isActive }) =>
                                    `nav-link  ${isActive ? 'active' : ''}`
                                }
                            >
                                Учетные данные респондентов
                            </NavLink>
                        </li>

                        {userRole === 'admin' &&
                            <li className="nav-item">
                                <NavLink
                                    to="/main/admin"
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? 'active' : ''}`
                                    }
                                >
                                    Администрирование
                                </NavLink>
                            </li>}

                    </ul>
                </div>
            </div>
        </nav>
    )
}