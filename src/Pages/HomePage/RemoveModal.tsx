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

    function toggleFavorite() {
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
                <div>
                    <h1>Item Name</h1>
                    <label>Add to grocery list: <input type={"checkbox"}  onChange={(): void => toggleFavorite()}/></label>
                </div>
                <div>
                    <button onClick={(): void => DeletePantryItem("Expired")}>Expired</button>
                    <button onClick={(): void => DeletePantryItem("Eaten")}>Eaten</button>
                    <button onClick={(): void => DeletePantryItem("Error")}>Error</button>
                </div>
                <div>
                    <button onClick={toggle}>Cancel</button>
                </div>
            </Modal>
        </div>
    )
}

export default RemoveModal