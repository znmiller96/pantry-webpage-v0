import React, {ReactElement, useEffect, useState} from "react";
import 'reactjs-popup/dist/index.css';
import {Category, Location, PantryItem} from "../../Models/PantryAddPageModels";
import Modal from "../../Components/Modal";
import UseModal from "../../Hooks/UseModal";
import QuantityLevelDropDown from "../PantryAddPage/Components/QuantityLevelDropDown";
import CategoryDropDown from "../PantryAddPage/Components/CategoryDropDown";
import LocationDropDown from "../PantryAddPage/Components/LocationDropDown";
import ExpirationDatePicker from "../PantryAddPage/Components/ExpirationDatePicker";
import MeasurementPicker from "../PantryAddPage/Components/MeasurementPicker";

type EditModalProps = {
    categoryOptionArr: Category[],
    locationOptionArr: Location[],
    today: Date,
    //TODO replace with item not list
    pantryArr: PantryItem[],
    setPantryArr: Function,
    index: number
}

const EditModal: React.FC<EditModalProps> = ({
                                                        categoryOptionArr,
                                                        locationOptionArr,
                                                        today,
                                                        pantryArr,
                                                        index
                                                  }: EditModalProps): ReactElement => {

    const [hasExpirationDate, setHasExpirationDate] = useState<boolean>(!!pantryArr[index].expirationDate);
    const [hasMeasurement, setHasMeasurement] = useState<boolean>(!!pantryArr[index].measurement);

    const { isOpen, toggle } = UseModal();

    const [formPantryItem, setFormPantryItem] = useState<PantryItem>(() => {

        let expDateStr: string = pantryArr[index].expirationDate + ""

        let expDate: Date = new Date(expDateStr)
        expDate.setDate(expDate.getDate() + 1)

        return {
            pantryItemId: pantryArr[index].pantryItemId,
            name : pantryArr[index].name,
            quantityLevel : pantryArr[index].quantityLevel,
            favorite : pantryArr[index].favorite,
            category: pantryArr[index].category,
            location: pantryArr[index].location,
            expirationDate: expDate,
            measurement: pantryArr[index].measurement
        }
    })

    const updateFormPantryItem = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormPantryItem({
            ...formPantryItem,
            [e.target.name]: e.target.value
        });
    }

    function toggleFavorite() {
        setFormPantryItem({
            ...formPantryItem,
            favorite: !formPantryItem.favorite
        });
    }

    const updatePantryItem = () => {
        fetch("http://localhost:8080/api/v1/pantry/update/pantryItem?userId=1001",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formPantryItem)
            })
            .catch(() => console.log("Error updating pantry item"));

        toggle()

        window.location.reload()
    }

    return (
        <div>
            <button onClick={toggle}>Edit</button>
            <Modal isOpen={isOpen} toggle={toggle}>
                <p>
                    Item Name: <b>{pantryArr[index] ? pantryArr[index].name : ""}</b> /
                    Favorite: <b>{String(pantryArr[index].favorite)}</b> /
                    Quantity Level: <b>{pantryArr[index].quantityLevel}</b>
                </p>
                <p>
                    Category: <b>{pantryArr[index].category.category}</b> /
                    Location: <b>{pantryArr[index].location.location}</b>
                    {hasExpirationDate ? " / Expiration Date: " + pantryArr[index].expirationDate?.toString() : "" }
                    {hasMeasurement ? " / Measurement: " + pantryArr[index].measurement?.value + " " + pantryArr[index].measurement?.unit : "" }
                </p>

                <div>
                    <label>Item Name: <input type={"text"} name={"name"} value={formPantryItem.name} onChange={(event): void => updateFormPantryItem(event)} /></label>
                </div>
                <br/>
                <div>
                    <label>Favorite Item: <input type="checkbox" name={"favorite"} checked={formPantryItem.favorite} onChange={(): void => toggleFavorite()}/></label>
                </div>
                <br/>
                <div>
                    <QuantityLevelDropDown
                        formPantryItem={formPantryItem}
                        setFormPantryItem={setFormPantryItem} />
                </div>
                <br/>
                <div>
                    <CategoryDropDown
                        categories={categoryOptionArr}
                        formPantryItem={formPantryItem}
                        setFormPantryItem={setFormPantryItem}/>
                </div>
                <br/>
                <div>
                    <LocationDropDown
                        locations={locationOptionArr}
                        formPantryItem={formPantryItem}
                        setFormPantryItem={setFormPantryItem} />
                </div>
                <br/>
                <div>
                    <ExpirationDatePicker
                        formPantryItem={formPantryItem}
                        setFormPantryItem={setFormPantryItem}
                        minDate={today}
                        hasExpirationDate={hasExpirationDate}
                        setHasExpirationDate={setHasExpirationDate} />
                </div>
                <div>
                    <MeasurementPicker
                        formPantryItem={formPantryItem}
                        setFormPantryItem={setFormPantryItem}
                        hasMeasurement={hasMeasurement}
                        setHasMeasurement={setHasMeasurement} />
                </div>

                <button onClick={toggle}>Cancel</button>
                <button onClick={(): void => updatePantryItem()} >
                    Update Item
                </button>
            </Modal>
        </div>
    )

}

export default EditModal