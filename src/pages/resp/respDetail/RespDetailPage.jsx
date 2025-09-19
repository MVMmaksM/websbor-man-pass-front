import { useParams } from "react-router-dom";
import { RespDetailForm } from "./components/RespDetailForm.jsx";
import { useState } from "react";
import { Header } from "./components/Header.jsx";
import { ButtonPanel } from "./components/ButtonPanel.jsx";
import { BreadcrumbsPage } from "./components/BreadcrumbsPage.jsx";
import { Tabs } from "./components/Tabs.jsx";

export const RespDetailPage = () => {
    const [isEdit, setIsEdit] = useState(false);
    const params = useParams();
    const resp_cred_id = params.resp_cred_id;

    return (
        <div className="container-fluid ps-4 pe-4 pt-4 bg-white">

            <BreadcrumbsPage resp_cred_id={resp_cred_id} isEdit={isEdit} />
            <ButtonPanel isEdit={isEdit} setIsEdit={setIsEdit} />
            <Header />
            <RespDetailForm resp_cred_id={resp_cred_id} isEdit={isEdit} setIsEdit={setIsEdit} />
            <Tabs resp_cred_id={resp_cred_id}/>
        </div>)
}