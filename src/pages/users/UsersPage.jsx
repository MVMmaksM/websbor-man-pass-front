import { UsersTable } from "./usersList/components/UsersTable";
import { Filters } from "./usersList/components/Filters";

export const UsersPage = () => {
    return (
        <>
            <Filters />
            <UsersTable />
        </>
    )
}