import { createBrowserRouter } from "react-router-dom";
import { AuthPage } from "./pages/auth/AuthPage";
import { MainPage} from "./pages/main/MainPage"

export const router = createBrowserRouter(
    [
        {
            path: "/auth",
            element: <AuthPage />
        },
        {
            path: "/main",
            element: <MainPage />,
            children: [
                {
                    
                }
            ]
        }
    ]
)