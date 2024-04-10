import {useEffect, useState} from "react";
import {deleteLocalStorage, getLocalStorage, setLocalStorage} from "../../Hooks/UseLocalStorage";


export default function UserLoginPage() {

    const [userLoggedIn, setUserLoggedIn] = useState<string>("");

    useEffect(() => {
        setUserLoggedIn(getLocalStorage("userId"))
    }, [])

    function getUser() {
        setUserLoggedIn(getLocalStorage("userId"))
    }

    function login() {
        const userId = getLocalStorage("userId")
        if (userId === "") {
            setLocalStorage("userId", "1001")
            window.location.href = "http://localhost:3000/"
        }
        setUserLoggedIn(userId)
        window.location.href = "http://localhost:3000/"
    }

    function logout() {
        deleteLocalStorage("userId")
        window.location.reload()
        //getUser()
    }

    return(
        <div>
            User Login: {userLoggedIn}

            <div>
                <button onClick={login}>Login</button>
            </div>

            <div>
                <button onClick={logout}>Log out</button>
            </div>
        </div>
    )
}