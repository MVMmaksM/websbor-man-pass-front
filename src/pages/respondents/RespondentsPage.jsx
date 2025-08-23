import { useEffect } from 'react';
import { Filters } from './components/Filters';
import { Table } from './components/Table';

export const RespondentsPage = () => {
    return (
        <>
            <Filters />
            <Table />
        </>
    )
}