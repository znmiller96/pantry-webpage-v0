import React, {ReactElement, useState} from "react";
import DropDown from "../../../Components/DropDown";
import {PantryItem} from "../../../Models/PantryAddPageModels";

type QuantityLevelDropDownProps = {
    formPantryItem: PantryItem;
    setFormPantryItem: Function;
};

const QuantityLevelDropDown: React.FC<QuantityLevelDropDownProps> = ({
                                                               formPantryItem,
                                                               setFormPantryItem,
                                                           }: QuantityLevelDropDownProps): ReactElement => {
    const [showQuantityLevelDropDown, setShowQuantityLevelDropDown] = useState<boolean>(false);

    const quantityLevels = () => {
        return ["HIGH", "MEDIUM", "LOW"];
    };
    /**
     * Toggle the drop down menu
     */
    const toggleDropDown = () => {
        setShowQuantityLevelDropDown(!showQuantityLevelDropDown);
    };

    /**
     * Hide the drop down menu if click occurs
     * outside of the drop-down element.
     *
     * @param event  The mouse event
     */
    const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
        if (event.currentTarget === event.target) {
            setShowQuantityLevelDropDown(false);
        }
    };

    /**
     * Callback function to consume the
     * quantityLevel name from the child component
     *
     * @param quantityLevel  The selected quantityLevel
     */
    const quantityLevelSelection = (quantityLevel: string): void => {
        setFormPantryItem({
            ...formPantryItem,
            quantityLevel: quantityLevel
        });
    };

    return (
        <div className={"text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"}>
            <button
                className={showQuantityLevelDropDown ? "active" : undefined}
                onClick={(): void => toggleDropDown()}
                onBlur={(e: React.FocusEvent<HTMLButtonElement>): void => dismissHandler(e)}
            >
                <div>{formPantryItem.quantityLevel ? "QuantityLevel Selected: " + formPantryItem.quantityLevel : "Select QuantityLevel"} </div>
                {showQuantityLevelDropDown && (
                    <DropDown
                        options={quantityLevels()}
                        showDropDown={false}
                        toggleDropDown={(): void => toggleDropDown()}
                        selectionFunction={quantityLevelSelection}/>
                )}
            </button>
        </div>
    )
};

export default QuantityLevelDropDown;