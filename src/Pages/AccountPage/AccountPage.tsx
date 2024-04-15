import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {deleteLocalStorage} from "../../Hooks/UseLocalStorage";

type UserSetting = {
    userId: string,
    userName: string,
    categories: string[],
    locations: string[],
    colorLogic: ColorLogic
}

type ColorLogic = {
    mediumQuantityColor: string,
    lowQuantityColor: string,
    expireSoonColor: string,
    daysBeforeExpirationThrowSoonWarning: number
    expireTomorrowColor: string
}
export default function AccountPage() {

    let {id} = useParams<"id">();

    const [userSettings, setUserSettings] = useState<UserSetting>({
        userId: "1001",
        userName: "TestUser",
        categories: ["one", "two", "three"],
        locations: ["cabinet", "freezer", "fridge", "counter", "pantry"],
        colorLogic: {
            mediumQuantityColor: "Brown",
            lowQuantityColor: "Orange",
            expireSoonColor: "Yellow",
            daysBeforeExpirationThrowSoonWarning: 5,
            expireTomorrowColor: "Red"
        }
    });

    function logout() {
        deleteLocalStorage("userId")
        window.location.href = "http://localhost:3000/"
    }

    return (
        <div>
            Welcome to account page {id}

            <div>
                <button onClick={logout}>Log out</button>
            </div>
        </div>
    )
}