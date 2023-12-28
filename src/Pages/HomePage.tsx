import React, {useEffect, useState} from "react";
import '../CSS/App.css';
import {Category, Location, PantryItem} from "../Models/PantryAddPageModels";
import EditPage from "./EditPage";

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

    return (
        <div className={"HomePage"}>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity Level</th>
                    <th>Favorite</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Expiration Date</th>
                    <th>Measurement</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                {pantryArr.map((pantryItem, index) => {
                    return(
                        <tr>
                            <td>{pantryItem.name ? pantryItem.name : ""}</td>
                            <td>{pantryItem.quantityLevel.toString()}</td>
                            <td>{pantryItem.favorite ? "true" : "false"}</td>
                            <td>{pantryItem.category ? pantryItem.category.category : ""}</td>
                            <td>{pantryItem.location ? pantryItem.location.location : ""}</td>
                            <td>{pantryItem.expirationDate ? pantryItem.expirationDate.toString() : ""}</td>
                            <td>{pantryItem.measurement ? pantryItem.measurement.value + " " + pantryItem.measurement.unit : ""}</td>
                            <td>
                                {/*<button >*/}
                                    <EditPage categoryOptionArr={pantryCategories} locationOptionArr={pantryLocations} today={today} pantryArr={pantryArr} setPantryArr={setPantryArr} index={index} />
                                {/*</button>*/}
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