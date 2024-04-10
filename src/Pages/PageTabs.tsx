import React, {useEffect, useState} from 'react';
import PantryAddPage from "./PantryAddPage/PantryAddPage";
import UserHomePage from "./HomePage/UserHomePage";
import {Link, Outlet} from "react-router-dom";
import {getLocalStorage} from "../Hooks/UseLocalStorage";
//import '../CSS/App.css';

function PageTabs() {

    const [userLoggedIn, setUserLoggedIn] = useState<string>("");

    useEffect(() => {
        setUserLoggedIn(getLocalStorage("userId"))
    }, [])

    return (
        <div>
            <nav className={"bg-white border-gray-200 dark:bg-gray-900"} >
                <div className={"hidden w-full md:block md:w-auto"}>
                    <ul className={"font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"}>
                        <li>
                            <Link to="/"
                                  className={"block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/add/1001"
                                  className={"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}>
                                Add to Pantry
                            </Link>
                        </li>
                        <li>
                            <Link to="/login"
                                  className={"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}>
                                {userLoggedIn !== "" ? userLoggedIn : "Login"}
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <hr/>

            <Outlet/>
            {/*<div className={"Tabs bg-gray-800 text-yellow-200"}>*/}
            {/*    <button onClick={(): void => changeTab("Home")} className={"border-r-2 border-amber-200 pl-5 p-2"}>*/}
            {/*        Home*/}
            {/*    </button>*/}
            {/*    <button onClick={(): void => changeTab("Add")} className={"pl-2"}>*/}
            {/*        Add*/}
            {/*    </button>*/}
            {/*    <button onClick={(): void => changeTab("Setting")} className={"pl-2"}>*/}
            {/*        Setting*/}
            {/*    </button>*/}
            {/*</div>*/}
            {/*<div className={"Page"}>*/}
            {/*    {activeTab === "Home" &&*/}
            {/*        <UserHomePage />*/}
            {/*    }*/}
            {/*</div>*/}
            {/*<div className={"Page"}>*/}
            {/*    {activeTab === "Add" &&*/}
            {/*        <PantryAddPage />*/}
            {/*    }*/}
            {/*</div>*/}
            {/*<div className={"Page"}>*/}
            {/*    {activeTab === "Setting" &&*/}
            {/*        <p>test</p>*/}
            {/*    }*/}
            {/*</div>*/}
        </div>
    )
}

export default PageTabs