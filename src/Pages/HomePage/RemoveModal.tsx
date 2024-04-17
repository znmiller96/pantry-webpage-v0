import {PantryItem} from "../../Models/PantryAddPageModels";
import UseModal from "../../Hooks/UseModal";
import React, {ReactElement, useState} from "react";
import Modal from "../../Components/Modal";

type RemoveModalProps = {
    pantryItem: PantryItem
}

const RemoveModal: React.FC<RemoveModalProps> = ({
                                                    pantryItem
                                                }: RemoveModalProps): ReactElement => {
    const [addToGroceryList, setAddToGroceryList] = useState<boolean>(false);

    const { isOpen, toggle } = UseModal();

    function toggleAddToGroceryList() {
        setAddToGroceryList(!addToGroceryList)
    }

    const DeletePantryItem = (reason:string) => {

        fetch("http://localhost:8080/api/v1/pantry/delete/pantryItem?pantryItemId=" + pantryItem.pantryItemId + "&reasonDelete=" + reason + "&addToGroceryList=" + addToGroceryList,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .catch(() => console.log("Error updating pantry item"));

        toggle()

        window.location.reload()
    }


    return (
        <div>
            <button onClick={toggle}>Remove</button>
            <Modal isOpen={isOpen} toggle={toggle}>
                <div className={"max-w-md mx-auto bg-white p-6 rounded-lg"}>
                    <div className={"flex items-start mb-5"}>
                        <h1 className={"mx-auto text-base text-black"}>{pantryItem.name}</h1>
                    </div>

                    <div className={"flex items-start mb-5"}>
                        <h3 className={"mx-auto"}>Why are you removing item?</h3>
                    </div>

                    <div className={"flex items-start mb-5"}>
                        <button onClick={(): void => DeletePantryItem("Expired")}
                                className={"text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"}>
                            Expired
                        </button>
                        <button onClick={(): void => DeletePantryItem("Eaten")}
                                className={"text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"}>
                            Eaten
                        </button>
                        <button onClick={(): void => DeletePantryItem("Error")}
                                className={"text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"}>
                            Error
                        </button>
                    </div>

                    <div className={"flex items-start mb-5"}>
                        <div className={"flex items-center h-5"}>
                            <input type={"checkbox"} onChange={(): void => toggleAddToGroceryList()}
                                   className={"w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"}/>
                        </div>
                        <label className={"ms-2 text-sm font-medium text-gray-900 dark:text-gray-900"}>Add to grocery
                            list</label>
                    </div>

                    <div className={"flex items-start mb-5"}>
                        <button onClick={toggle}
                                className={"text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"}>
                            Cancel
                        </button>
                    </div>
                </div>
                {/*<div>*/}
                {/*    <h1>Item Name</h1>*/}
                {/*    <label>Add to grocery list: <input type={"checkbox"}  onChange={(): void => toggleFavorite()}/></label>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <button onClick={(): void => DeletePantryItem("Expired")}>Expired</button>*/}
                {/*    <button onClick={(): void => DeletePantryItem("Eaten")}>Eaten</button>*/}
                {/*    <button onClick={(): void => DeletePantryItem("Error")}>Error</button>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <button onClick={toggle}>Cancel</button>*/}
                {/*</div>*/}
            </Modal>
        </div>
    )
}

export default RemoveModal