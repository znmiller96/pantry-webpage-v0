import React, {useState} from "react";
import {setLocalStorage} from "../../Hooks/UseLocalStorage";
import {user} from "../../Models/PantryModels";


export default function UserLoginPage() {

    const [username, setUsername] = useState<string>();
    const [usernameError, setUsernameError] = useState<boolean>(false);

    const userOptions: user[] = [
        {
            username: "Test",
            userId: "1001"
        },
        {
            username: "Zac",
            userId: "1002"
        },
        {
            username: "Jacob",
            userId: "1003"
        },
        {
            username: "Nick",
            userId: "1004"
        }
    ]

    const updateUserLogin = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUsername(e.target.value)
    }

    function login() {
        if (username === "Test") {
            setLocalStorage("userId", JSON.stringify(userOptions[0]))
            window.location.href = "http://localhost:3000/"
        }
        if (username === "Zac") {
            setLocalStorage("userId", JSON.stringify(userOptions[1]))
            window.location.href = "http://localhost:3000/"
        }
        if (username === "Jacob") {
            setLocalStorage("userId", JSON.stringify(userOptions[2]))
            window.location.href = "http://localhost:3000/"
        }
        if (username === "Nick") {
            setLocalStorage("userId", JSON.stringify(userOptions[3]))
            window.location.href = "http://localhost:3000/"
        }
        setUsernameError(true)
    }

    return(
        <div className={"max-w-md mx-auto space-x-12"} >

            <div>
                Type Test, Zac, Jacob, or Nick
            </div>

            <div className={"relative z-0 w-2/3 mt-5 mb-5 ml-12"}>
                <input type={"text"} name={"name"} id={"name"} onChange={(event): void => updateUserLogin(event)} placeholder={" "} required={true}
                       className={"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"} />
                <label htmlFor={"name"}
                       className={"peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"}>
                    Item Name
                </label>
                {usernameError ? <p className="mt-2 text-sm text-red-600 dark:text-red-500">Enter a valid user</p> : ''}
            </div>

            <div>
                <button onClick={login}>Login</button>
            </div>
        </div>
    )
}