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

    let measurementList = ["LB",
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
        "GALLON",
        "SERVING",
        "QTY"]

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
     * @param location  The selected location
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
            <label>Does Item Have A Measurement: <input type="checkbox" checked={hasMeasurement} onChange={(): void => toggleMeasurement()}/></label>

            {hasMeasurement && (
                <div>
                    <label>value: <input type={"text"} name={"value"} value={formPantryItem.measurement?.value} onChange={(event): void => updateMeasurementValue(event)} /></label>

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
            )}
        </>
    )

}

export default MeasurementPicker;