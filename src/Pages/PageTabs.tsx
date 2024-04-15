import React, {useEffect, useState} from 'react';
import {Link, Outlet} from "react-router-dom";
import {getLocalStorage} from "../Hooks/UseLocalStorage";
import {user} from "../Models/PantryModels";

function PageTabs() {

    const [userLoggedIn, setUserLoggedIn] = useState<user>({ username: "", userId: ""});

    useEffect(() => {
        const userString = getLocalStorage("userId");
        if (userString !== "") {
            const user: user = JSON.parse(JSON.parse(userString))
            setUserLoggedIn(user)
        }
    }, [])

    return (
        <div>
            <nav className={"bg-white border-gray-200 dark:bg-gray-900"} >
                <div className={"hidden w-full md:block md:w-auto"}>
                    <ul className={"font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"}>
                        <li>
                            {userLoggedIn.userId !== "" ?
                                <Link to={"/" + userLoggedIn.userId}
                                      className={"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}>
                                    User Home
                                </Link>
                                :
                                <Link to="/"
                                      className={"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}>
                                    Home
                                </Link>
                            }
                        </li>
                        <li>
                            <Link to={"/add/" + userLoggedIn.userId}
                                  className={"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}>
                                Add to Pantry
                            </Link>
                        </li>
                        <li>
                            {userLoggedIn.userId !== "" ?
                                <Link to={"/account/" + userLoggedIn.userId}
                                      className={"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}>
                                    {userLoggedIn.username}
                                </Link>
                            :
                                <Link to="/login"
                                      className={"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}>
                                    Login
                                </Link>
                            }
                        </li>
                    </ul>
                </div>
            </nav>

            <hr/>

            <Outlet/>
        </div>
    )
}

export default PageTabs