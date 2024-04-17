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

    //name, category, location, measurement
    const [formErrors, setFormErrors] = useState<boolean[]>([false, false, false, false])

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

        let newFormErrors = [false, false, false, false];
        if (formPantryItem.name === "Item Name" || formPantryItem.name === "") {
            newFormErrors[0] = true;
        }
        if (formPantryItem.category === "") {
            newFormErrors[1] = true;
        }
        if (formPantryItem.location === "") {
            newFormErrors[2] = true;
        }
        if (Number(formPantryItem.measurement?.value) < 0) {
            newFormErrors[3] = true;
        }

        if (newFormErrors.includes(true)) {
            setFormErrors(newFormErrors);
            return
        }

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
            <button onClick = {toggle} > Edit </button>
            <Modal isOpen={isOpen} toggle={toggle}>
                <div className={"max-w-md mx-auto space-x-12 bg-white p-4 rounded-lg pr-10"}>
                    <div className={"relative z-0 w-2/3 mt-5 mb-5 ml-12"}>
                        <input type={"text"} name={"name"} value={formPantryItem.name}
                               onChange={(event): void => updateFormPantryItem(event)}
                               className={"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"}/>
                        <label htmlFor={"name"}
                               className={"peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"}>
                            Item Name
                        </label>
                        {formErrors[0] ?
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">Enter is a name for the item</p> : ''}
                    </div>

                    <div className={"flex items-start mb-5"}>
                        <div className={"flex items-center h-5"}>
                            <input type="checkbox" name={"favorite"} checked={formPantryItem.favorite}
                                   onChange={(): void => toggleFavorite()}
                                   className={"w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"}/>
                        </div>
                        <label className={"ms-2 text-sm font-medium text-gray-900 dark:text-gray-900"}>Is this a favorite
                            item</label>
                    </div>

                    <div className={"flex items-start mb-5"}>
                        <QuantityLevelDropDown
                            formPantryItem={formPantryItem}
                            setFormPantryItem={setFormPantryItem}/>
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
                            setFormPantryItem={setFormPantryItem}/>
                        {formErrors[2] ? <p className="mt-2 text-sm text-red-600 dark:text-red-500">Select a Location</p> : ''}
                    </div>

                    <div>
                        <ExpirationDatePicker
                            formPantryItem={formPantryItem}
                            setFormPantryItem={setFormPantryItem}
                            minDate={today}
                            hasExpirationDate={hasExpirationDate}
                            setHasExpirationDate={setHasExpirationDate}/>
                    </div>

                    <div>
                        <MeasurementPicker
                            formPantryItem={formPantryItem}
                            setFormPantryItem={setFormPantryItem}
                            hasMeasurement={hasMeasurement}
                            setHasMeasurement={setHasMeasurement}/>
                        {formErrors[3] ?
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">Enter a valid measurement value</p> : ''}
                    </div>

                    <div className={"flex items-start mb-5"}>
                        <button onClick={toggle}
                                className={"text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"}>
                            Cancel
                        </button>
                        <button onClick={(): void => updatePantryItem()}
                                className={"text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"}>
                            Update Item
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )

}

export default EditModal