import { createBrowserRouter } from "react-router-dom";
import { AuthPage } from "./pages/auth/AuthPage";
import { MainPage} from "./pages/main/MainPage"
import {RespondentsPage} from "./pages/respondents/RespondentsPage";

export const router = createBrowserRouter(
    [
        {
            path: "/auth/login",
            element: <AuthPage />
        },
        {
            path: "/main",
            element: <MainPage />,
            children: [
                {                    
                    path: "respondents",
                    element: <RespondentsPage />
                }
            ]
        }
    ]
)