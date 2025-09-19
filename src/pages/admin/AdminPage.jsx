import { Outlet } from "react-router-dom"
import { NavPanel } from "./components/NavPanel"

export const AdminPage = () => {

    return (
        <>
            <NavPanel />
            <div>
                <Outlet />
            </div>
        </>
    )
}