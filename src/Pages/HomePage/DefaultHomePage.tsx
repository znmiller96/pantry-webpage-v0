import {useEffect} from "react";
import {getLocalStorage} from "../../Hooks/UseLocalStorage";
import {user} from "../../Models/PantryModels";


export default function DefaultHomePage() {

    useEffect(() => {
        const userString = getLocalStorage("userId");
        if (userString !== "") {
            const user: user = JSON.parse(JSON.parse(userString))
            window.location.href = "http://localhost:3000/" + user.userId
        }
    })

    return (
        <div>
            Welcome to Pantry App

            <div>
                Default user page
            </div>
        </div>
    )
}