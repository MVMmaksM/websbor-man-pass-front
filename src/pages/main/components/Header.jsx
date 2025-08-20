import { NavPanel } from "./NavPanel"

export const Header = () => {
    return (
        <header>
            {/* Верхняя панель (бренд) */}
            <div className="bg-primary text-white text-center py-3 shadow-sm">
                <span className="fw-bold">Система хранения учетных данных респондентов</span>
            </div>
            <NavPanel />           
        </header>
    )
}