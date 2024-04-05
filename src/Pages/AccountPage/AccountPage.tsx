import React, {useState} from "react";

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

type AccountPageProps = {
    userId: string
}

export default function AccountPage(props: AccountPageProps) {

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

    return (
        <div>

        </div>
    )
}