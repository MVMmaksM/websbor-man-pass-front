import { useEffect } from "react";

export const PageTitle = ({ title }) => {
    useEffect(() => {
        document.title = title || "Система хранения учетных данных";
    }, [title]);
}