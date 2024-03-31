import React, {ReactElement, useState} from "react";
import {PantryItem} from "../../../Models/PantryAddPageModels";
import DropDown from "../../../Components/DropDown";

type ExpirationDatePickerProps = {
    formPantryItem: PantryItem,
    setFormPantryItem: Function,
    hasMeasurement: boolean,
    setHasMeasurement: Function
}

const MeasurementPicker: React.FC<ExpirationDatePickerProps> = ({
                                                                    formPantryItem,
                                                                    setFormPantryItem,
                                                                    hasMeasurement,
                                                                    setHasMeasurement
                                                                   }: ExpirationDatePickerProps): ReactElement => {

    let measurementList = [
        "QTY",
        "SERVING",
        "LB",
        "GRAM",
        "KILOGRAM",
        "OZ",
        "MILLILITER",
        "LITER",
        "TSP",
        "TBSP",
        "FL_OZ",
        "CUP",
        "PINT",
        "QUART",
        "GALLON"
        ]

    const [showMeasurementDropDown, setShowMeasurementDropDown] = useState<boolean>(false);


    const toggleMeasurement = () => {
        setHasMeasurement(!hasMeasurement);
    }

    /**
     * Toggle the drop down menu
     */
    const toggleDropDown = () => {
        setShowMeasurementDropDown(!showMeasurementDropDown);
    };

    /**
     * Hide the drop down menu if click occurs
     * outside of the drop-down element.
     *
     * @param event  The mouse event
     */
    const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
        if (event.currentTarget === event.target) {
            setShowMeasurementDropDown(false);
        }
    };

    /**
     * Callback function to consume the
     * location name from the child component
     *
     * @param measurement
     * @param index The selected location's position in array
     */
    const updateMeasurementUnit = (measurement: string, index: number): void => {
        setFormPantryItem({
            ...formPantryItem,
            measurement: {value: formPantryItem.measurement?.value, unit: measurement}
        });
    };

    const updateMeasurementValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormPantryItem({
            ...formPantryItem,
            measurement: {value: e.target.value, unit: formPantryItem.measurement?.unit}
        });
    }

    return (
        <>
            <div className={"flex items-start mb-5"}>
                <div className={"flex items-center h-5"}>
                    <input type="checkbox" checked={hasMeasurement} onChange={(): void => toggleMeasurement()} className={"w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"} />
                </div>
                <label className={"ms-2 text-sm font-medium text-gray-900 dark:text-gray-900"}>Does Item Have Measurement</label>
            </div>
            {hasMeasurement && (
                <div className={"flex items-start mb-5"}>

                    <div className={"relative z-0 w-24 mb-5"}>
                        <input type={"number"} max={999} name={"value"} value={formPantryItem.measurement?.value} onChange={(event): void => updateMeasurementValue(event)}
                               className={"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"} />
                        <label htmlFor={"name"}
                               className={"peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"}>
                            Measurement
                        </label>
                    </div>

                    <div  className={"ml-6 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"}>
                        <button
                            className={showMeasurementDropDown ? "active" : undefined}
                            onClick={(): void => toggleDropDown()}
                            onBlur={(e: React.FocusEvent<HTMLButtonElement>): void => dismissHandler(e)}
                        >
                            <div>{formPantryItem.measurement?.unit ? "Unit Selected: " + formPantryItem.measurement.unit : "Select unit"} </div>
                            {showMeasurementDropDown && (
                                <DropDown
                                    options={measurementList}
                                    showDropDown={false}
                                    toggleDropDown={(): void => toggleDropDown()}
                                    selectionFunction={updateMeasurementUnit}/>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </>
    )

}

export default MeasurementPicker;