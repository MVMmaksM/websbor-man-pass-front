import { Link } from "react-router-dom"
import { NavPanel } from "./NavPanel"
import { Profile } from "./Profile"

export const Header = () => {
    return (
        <header>
            <div className="bg-primary text-white text-center py-3 shadow-sm">
                <Link to="/main/" className="text-decoration-none">
                    <span className="fw-bold text-white">Система хранения учетных данных респондентов</span>
                </Link>
                <Profile />
            </div>
            <NavPanel />
        </header>
    )
}