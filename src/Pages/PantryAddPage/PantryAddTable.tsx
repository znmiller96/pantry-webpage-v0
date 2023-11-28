import React, {ReactElement} from "react";
import {PantryItem} from "../../Models/PantryAddPageModels";

type PantryAddTableProps = {
    pantryArr: PantryItem[],
    setPantryArr: Function
}

const PantryAddTable: React.FC<PantryAddTableProps> = ({
                                                           pantryArr,
                                                           setPantryArr
                                                       }: PantryAddTableProps): ReactElement => {
    function deletePantryItem(pantryItemIndex: number) {
        let frontSplit = pantryArr.slice(0, pantryItemIndex)
        let backSplit = pantryArr.slice(pantryItemIndex + 1, pantryArr.length)

        let newPantryArr = frontSplit.concat(backSplit)

        setPantryArr(newPantryArr)
    }

    const submitPantryArr = () => {

        fetch('http://localhost:8080/api/v1/pantry/add/pantryItem?userId=1001', {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pantryArr)
            })
            .then(response => {
                console.log("Added list to pantry: " + response.status)
                setPantryArr([])
            })
            .catch(() => console.log("ERROR posting to pantry"));

        console.log(pantryArr)
    }

    return (
        <>
            <div id={"target"}>
            </div>
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
                        <th>Delete</th>
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
                                <td>{pantryItem.expirationDate ? pantryItem.expirationDate.toDateString() : ""}</td>
                                <td>{pantryItem.measurement ? pantryItem.measurement.value + " " + pantryItem.measurement.unit : ""}</td>
                                <td>
                                    <button onClick={(): void => deletePantryItem(index)} >
                                        X
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div>
                <button onClick={(): void => submitPantryArr()} >
                    Add List to Pantry System
                </button>
            </div>
        </>
)};

export default PantryAddTable;