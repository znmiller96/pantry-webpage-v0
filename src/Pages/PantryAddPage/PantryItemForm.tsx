import React, {ReactElement, useState} from "react";
import CategoryDropDown from "./Components/CategoryDropDown";
import LocationDropDown from "./Components/LocationDropDown";
import QuantityLevelDropDown from "./Components/QuantityLevelDropDown";
import "react-datepicker/dist/react-datepicker.css";
import {Category, Location, PantryItem} from "../../Models/PantryAddPageModels";
import ExpirationDatePicker from "./Components/ExpirationDatePicker";
import MeasurementPicker from "./Components/MeasurementPicker";

type PantryItemFormProps = {
    categoryOptionArr: Category[],
    locationOptionArr: Location[],
    today: Date,
    pantryArr: PantryItem[],
    setPantryArr: Function
}

const PantryItemForm: React.FC<PantryItemFormProps> = ({
                                                           categoryOptionArr,
                                                           locationOptionArr,
                                                           today,
                                                           pantryArr,
                                                           setPantryArr
                                                       }: PantryItemFormProps): ReactElement => {

    const [hasExpirationDate, setHasExpirationDate] = useState<boolean>(false);
    const [hasMeasurement, setHasMeasurement] = useState<boolean>(false);

    const [formPantryItem, setFormPantryItem] = useState<PantryItem>(
        {
            name : "Item Name",
            quantityLevel : "HIGH",
            favorite : false,
            category: {"categoryId": 0, "category": ""},
            location: {"locationId": 0, "location": ""},
            expirationDate: undefined,
            measurement: undefined
        }
    )

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

    const addPantryItem = () => {

        let newPantryItem = formPantryItem

        if(!hasExpirationDate) {
            newPantryItem ={
                ...newPantryItem,
                expirationDate: null
            };
        }

        if(!hasMeasurement) {
            newPantryItem ={
                ...newPantryItem,
                measurement: null
            };
        }

        setPantryArr(
            [...pantryArr,
            newPantryItem]
        )
    }

    return <>
        <div>
            <p>
                Item Name: <b>{formPantryItem ? formPantryItem.name : ""}</b> /
                Favorite: <b>{String(formPantryItem.favorite)}</b> /
                Quantity Level: <b>{formPantryItem.quantityLevel}</b>
            </p>
            <p>
                Category: <b>{formPantryItem.category.category}</b> /
                Location: <b>{formPantryItem.location.location}</b>
                {hasExpirationDate ? " / Expiration Date: " + (formPantryItem.expirationDate ? formPantryItem.expirationDate.toDateString() : "") : "" }
                {hasMeasurement ? " / Measurement: " + (formPantryItem.measurement ? formPantryItem.measurement.value + " " + formPantryItem.measurement.unit: "") : ""}
            </p>
        </div>
        <br/><br/>
        <div>
            <label>Item Name: <input type={"text"} name={"name"} onChange={(event): void => updateFormPantryItem(event)} /></label>
        </div>
        <br/>
        <div>
            <label>Favorite Item: <input type="checkbox" name={"favorite"} onChange={(): void => toggleFavorite()}/></label>
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
        <br/>
        <div>
            <button onClick={(): void => addPantryItem()} >
                Add to Table
            </button>
        </div>
    </>
};

export default PantryItemForm;