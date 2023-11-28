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
            location: locations[index]
        });
    };

    return (
        <>
            <button
                className={showLocationDropDown ? "active" : undefined}
                onClick={(): void => toggleDropDown()}
                onBlur={(e: React.FocusEvent<HTMLButtonElement>): void => dismissHandler(e)}
            >
                <div>{formPantryItem.location.location ? "Location Selected: " + formPantryItem.location.location : "Select Location"} </div>
                {showLocationDropDown && (
                    <DropDown
                        options={locations.map(location => location.location)}
                        showDropDown={false}
                        toggleDropDown={(): void => toggleDropDown()}
                        selectionFunction={locationSelection}/>
                )}
            </button>
        </>
    )
};

export default LocationDropDown;