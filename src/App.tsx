import {RouteObject, useRoutes} from "react-router-dom";
import UserHomePage from "./Pages/HomePage/UserHomePage";
import PageTabs from "./Pages/PageTabs";
import PantryAddPage from "./Pages/PantryAddPage/PantryAddPage";
import UserLoginPage from "./Pages/LoginPage/UserLoginPage";


export default function App() {

    let routes: RouteObject[] = [
        {
            path: "/",
            element: <PageTabs />,
            children: [
                {
                    index: true,
                    element: <UserHomePage />
                },
                {
                    path: "/add/:id",
                    element: <PantryAddPage />
                },
                {
                    path: "/login",
                    element: <UserLoginPage />
                }
            ]
        }
    ];

    let element = useRoutes(routes);

    return (
        <div>
            {element}
        </div>
    )
}