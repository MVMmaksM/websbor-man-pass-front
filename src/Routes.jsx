import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthPage } from "./pages/auth/AuthPage";
import { MainPage } from "./pages/main/MainPage"
import { RespListPage } from "./pages/resp/respList/RespListPage";
import { NotFoundPage } from "./pages/notFound/NotFoundPage";
import { PageTitle } from "./components/PageTitle";
import { RespDetailPage } from "./pages/resp/respDetail/RespDetailPage";
import { CreateRespPage } from "./pages/resp/create/CreateRespPage";
import { EditRespPage } from "./pages/resp/edit/EditRespPage";

export const router = createBrowserRouter(
    [
        {
            path: "/auth/login",
            element: (
                <>
                    <AuthPage />
                    <PageTitle title={"Аутентификация"} />
                </>
            )

        },
        {
            path: "/",
            element: <Navigate to="/main" />
        },
        {
            path: "/main",
            element: (
                <>
                    <MainPage />
                    <PageTitle title={"Главная"} />
                </>),
            children: [
                {
                    path: "resp",
                    element: (
                        <>
                            <RespListPage />
                            <PageTitle title={"Учетные данные респондентов"} />
                        </>)
                },
                {
                    path: "resp/:resp_cred_id",
                    element: (
                        <>
                            <RespDetailPage />
                            <PageTitle title={"Детали респондента"} />
                        </>)
                },
                {
                    path: "resp/create",
                    element: (
                        <>
                            <CreateRespPage />
                            <PageTitle title={"Добавить респондента"} />
                        </>)
                },
                {
                    path: "resp/edit/:resp_cred_id",
                    element: (
                        <>
                            <EditRespPage />
                            <PageTitle title={"Редактирование респондента"} />
                        </>)
                },
                {
                    path: "resp/:resp_cred_id/edit/:resp_cred_id",
                    element: (
                        <>
                            <EditRespPage />
                            <PageTitle title={"Редактирование респондента"} />
                        </>)
                }
            ]
        },
        {
            path: "*",
            element: (
                <>
                    <NotFoundPage />
                    <PageTitle title={"Страница не найдена"} />
                </>)
        }
    ]
)