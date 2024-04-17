import React, {ReactElement, useState} from "react";
import DropDown from "../../../Components/DropDown";
import {Location, PantryItem} from "../../../Models/PantryAddPageModels";

type LocationDropDownProps = {
    locations: Location[];
    formPantryItem: PantryItem;
    setFormPantryItem: Function;
};

const LocationDropDown: React.FC<LocationDropDownProps> = ({
                                                               locations,
                                                               formPantryItem,
                                                               setFormPantryItem,
                                                           }: LocationDropDownProps): ReactElement => {
    const [showLocationDropDown, setShowLocationDropDown] = useState<boolean>(false);

    /**
     * Toggle the drop down menu
     */
    const toggleDropDown = () => {
        setShowLocationDropDown(!showLocationDropDown);
    };

    /**
     * Hide the drop down menu if click occurs
     * outside of the drop-down element.
     *
     * @param event  The mouse event
     */
    const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
        if (event.currentTarget === event.target) {
            setShowLocationDropDown(false);
        }
    };

    /**
     * Callback function to consume the
     * location name from the child component
     *
     * @param location  The selected location
     * @param index The selected location's position in array
     */
    const locationSelection = (location: string, index: number): void => {
        setFormPantryItem({
            ...formPantryItem,
            location: location
        });
    };

    return (
        <div className={"text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"}>
            <button
                className={showLocationDropDown ? "active" : undefined}
                onClick={(): void => toggleDropDown()}
                onBlur={(e: React.FocusEvent<HTMLButtonElement>): void => dismissHandler(e)}
            >
                <div>{formPantryItem.location ? "Location Selected: " + formPantryItem.location : "Select Location"} </div>
                {showLocationDropDown && (
                    <DropDown
                        options={locations.map(location => location.location)}
                        showDropDown={false}
                        toggleDropDown={(): void => toggleDropDown()}
                        selectionFunction={locationSelection}/>
                )}
            </button>
        </div>
    )
};

export default LocationDropDown;