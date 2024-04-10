import React, {useEffect, useState} from "react";
import '../../CSS/App.css';
import {Category, Location, PantryItem} from "../../Models/PantryAddPageModels";
import EditModal from "./Components/EditModal";
import RemoveModal from "./Components/RemoveModal";

function HomePage() {

    const [pantryArr, setPantryArr] = useState<PantryItem[]>([]);
    const [pantryCategories, setPantryCategories] = useState<Category[]>([{category:"ERROR", categoryId:0}]);
    const [pantryLocations, setPantryLocations] = useState<Location[]>([{location:"ERROR", locationId:0}]);

    useEffect(() => {
        console.log("Home Api Calls")
        fetch("http://localhost:8080/api/v1/pantry/Pantry?userId=1001")
            .then(response => response.json())
            .then(data => {
                setPantryArr(data)
            })
            .catch(() => console.log("Error loading Pantry"));
        //TODO create hook for api calls
        fetch("http://localhost:8080/api/v1/category/get?userId=1001")
            .then(response => response.json())
            .then(data => {
                setPantryCategories(data)
            })
            .catch(() => console.log("Error loading Categories"));

        fetch("http://localhost:8080/api/v1/location/get?userId=1001")
            .then(response => response.json())
            .then(data => {
                setPantryLocations(data)
            })
            .catch(() => console.log("Error loading Locations"));
    }, [])

    const today = new Date();

    function colorLogic(date: Date | null | undefined, quantity: string) {
        let bgColor = "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 ";
        if (date === null || date === undefined) {
            return bgColor
        }

        //TODO look up how to compare dates
        //Medium quantity and 5 days from expiring
        if (date > today || quantity === "MEDIUM") {
            return "bg-orange-300 "
        }

        //Medium quantity and 5 days from expiring
        if (date > today || quantity === "LOW") {
            return "bg-red-300 "
        }

        return bgColor
    }

    return (
        <div className={"relative overflow-x-auto shadow-md sm:rounded-lg"}>
            <table className={"w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"}>
                <thead className={"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"}>
                <tr>
                    <th className={"px-6 py-3"}>Name</th>
                    <th className={"px-6 py-3"}>Quantity Level</th>
                    <th className={"px-6 py-3"}>Favorite</th>
                    <th className={"px-6 py-3"}>Category</th>
                    <th className={"px-6 py-3"}>Location</th>
                    <th className={"px-6 py-3"}>Expiration Date</th>
                    <th className={"px-6 py-3"}>Measurement</th>
                    <th className={"px-6 py-3"}>Remove</th>
                    <th className={"px-6 py-3"}>Edit</th>
                </tr>
                </thead>
                <tbody>
                {pantryArr.map((pantryItem, index) => {
                    return(
                        <tr className={colorLogic(pantryItem.expirationDate, pantryItem.quantityLevel) + " border-b dark:border-gray-700"}>
                            <td className={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"}>{pantryItem.name ? pantryItem.name : ""}</td>
                            <td className={"px-6 py-4"}>{pantryItem.quantityLevel.toString()}</td>
                            <td className={"px-6 py-4"}>{pantryItem.favorite ? "true" : "false"}</td>
                            <td className={"px-6 py-4"}>{pantryItem.category ? pantryItem.category.category : ""}</td>
                            <td className={"px-6 py-4"}>{pantryItem.location ? pantryItem.location.location : ""}</td>
                            <td className={"px-6 py-4"}>{pantryItem.expirationDate ? pantryItem.expirationDate.toString() : ""}</td>
                            <td className={"px-6 py-4"}>{pantryItem.measurement ? pantryItem.measurement.value + " " + pantryItem.measurement.unit : ""}</td>
                            <td className={"px-6 py-4"}>
                                <RemoveModal pantryItem={pantryItem}/>
                            </td>
                            <td className={"px-6 py-4"}>
                                <EditModal categoryOptionArr={pantryCategories} locationOptionArr={pantryLocations} today={today} pantryArr={pantryArr} setPantryArr={setPantryArr} index={index} />
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default HomePage