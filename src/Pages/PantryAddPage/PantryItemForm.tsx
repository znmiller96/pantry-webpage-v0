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
            expirationDate: today,
            measurement: {"value": "1", unit: "QTY"}
        }
    )

    //name, category, location, measurement
    const [formErrors, setFormErrors] = useState<boolean[]>([false, false, false, false])

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

        let newFormErrors = [false, false, false, false];
        if (formPantryItem.name === "Item Name" || formPantryItem.name === "") {
            newFormErrors[0] = true;
        }
        if (formPantryItem.category.categoryId === 0) {
            newFormErrors[1] = true;
        }
        if (formPantryItem.location.locationId === 0) {
            newFormErrors[2] = true;
        }
        if (Number(formPantryItem.measurement?.value) < 0) {
            newFormErrors[3] = true;
        }

        if (newFormErrors.includes(true)) {
            setFormErrors(newFormErrors);
            return
        }

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
        <div className={"max-w-md mx-auto space-x-12"}>
            <div className={"relative z-0 w-2/3 mt-5 mb-5 ml-12"}>
                <input type={"text"} name={"name"} id={"name"} onChange={(event): void => updateFormPantryItem(event)} placeholder={" "} required={true}
                       className={"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"} />
                <label htmlFor={"name"}
                       className={"peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"}>
                    Item Name
                </label>
                {formErrors[0] ? <p className="mt-2 text-sm text-red-600 dark:text-red-500">Enter is a name for the item</p> : ''}
            </div>

            <div className={"flex items-start mb-5"}>
                <div className={"flex items-center h-5"}>
                    <input type="checkbox" name={"favorite"} onChange={(): void => toggleFavorite()} className={"w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"}/>
                </div>
                <label className={"ms-2 text-sm font-medium text-gray-900 dark:text-gray-900"}>Is this a favorite item</label>
            </div>

            <div className={"flex items-start mb-5"}>
                <QuantityLevelDropDown
                    formPantryItem={formPantryItem}
                    setFormPantryItem={setFormPantryItem} />
            </div>

            <div className={"flex items-start mb-5"}>
                <CategoryDropDown
                    categories={categoryOptionArr}
                    formPantryItem={formPantryItem}
                    setFormPantryItem={setFormPantryItem}/>
                {formErrors[1] ? <p className="mt-2 text-sm text-red-600 dark:text-red-500">Select a Category</p> : ''}
            </div>

            <div className={"flex items-start mb-5"}>
                <LocationDropDown
                    locations={locationOptionArr}
                    formPantryItem={formPantryItem}
                    setFormPantryItem={setFormPantryItem} />
                {formErrors[2] ? <p className="mt-2 text-sm text-red-600 dark:text-red-500">Select a Location</p> : ''}
            </div>

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
                {formErrors[3] ? <p className="mt-2 text-sm text-red-600 dark:text-red-500">Enter a valid measurement value</p> : ''}
            </div>

            <div className={"flex items-start mb-5"}>
                <button onClick={(): void => addPantryItem()} className={"text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"} >
                    Add to Table
                </button>
            </div>
        </div>
    </>
};

export default PantryItemForm;