import { createBrowserRouter } from "react-router-dom";
import { AuthPage } from "./pages/auth/AuthPage";
import { MainPage } from "./pages/main/MainPage"
import { RespondentsPage } from "./pages/respondents/RespondentsPage";
import { NotFoundPage } from "./pages/notFound/NotFoundPage";
import { PageTitle } from "./components/PageTitle";

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
            path: "/main",
            element: (
                <>
                    <MainPage />
                    <PageTitle title={"Главная"} />
                </>),
            children: [
                {
                    path: "respondents",
                    element: (
                        <>
                            <RespondentsPage />
                            <PageTitle title={"Учетные данные респондентов"} />
                        </>)
                }
            ]
        },
        {
            path: "*",
            element: (
                <>
                    <NotFoundPage />
                    <PageTitle title={"Страница не найдена"}/>
                </>)
        }
    ]
)