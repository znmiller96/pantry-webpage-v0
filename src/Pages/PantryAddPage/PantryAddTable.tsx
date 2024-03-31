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
                        <th className={"px-6 py-3"}>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pantryArr.map((pantryItem, index) => {
                        return(
                            <tr className={"odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"}>
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
            </div>
            <div>
                <button onClick={(): void => submitPantryArr()} className={"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"} >
                    Add List to Pantry System
                </button>
            </div>
        </>
)};

export default PantryAddTable;