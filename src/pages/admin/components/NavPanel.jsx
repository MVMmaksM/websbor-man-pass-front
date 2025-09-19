import { useState } from "react";
import { NavLink } from "react-router-dom";

export const NavPanel = () => {
    return (
        <div className="mt-3 ms-3">
            <ul id="main_nav_panel" className="nav nav-pills">
                <li className="nav-item">
                    <NavLink
                        to="/main/admin/users"
                        className={({ isActive }) =>
                            `nav-link  ${isActive ? 'active' : ''}`
                        }
                    >
                        Пользователи
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/main/admin/settings"
                        className={({ isActive }) =>
                            `nav-link ${isActive ? 'active' : ''}`
                        }
                    >
                        Настройки системы
                    </NavLink>
                </li>
            </ul>           
        </div >
    )
}