import React, {ReactElement, useState} from "react";
import DropDown from "../../../Components/DropDown";
import {Category, PantryItem} from "../../../Models/PantryAddPageModels";

type CategoryDropDownProps = {
    categories: Category[];
    formPantryItem: PantryItem;
    setFormPantryItem: Function;
};

const CategoryDropDown: React.FC<CategoryDropDownProps> = ({
                                                       categories,
                                                       formPantryItem,
                                                       setFormPantryItem,
                                                   }: CategoryDropDownProps): ReactElement => {
    const [showCategoryDropDown, setShowCategoryDropDown] = useState<boolean>(false);

    /**
     * Toggle the drop down menu
     */
    const toggleDropDown = () => {
        setShowCategoryDropDown(!showCategoryDropDown);
    };

    /**
     * Hide the drop down menu if click occurs
     * outside of the drop-down element.
     *
     * @param event  The mouse event
     */
    const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
        if (event.currentTarget === event.target) {
            setShowCategoryDropDown(false);
        }
    };

    /**
     * Callback function to consume the
     * category name from the child component
     *
     * @param category  The selected category
     * @param index The selected category's position in array
     */
    const categorySelection = (category: string, index: number): void => {
        setFormPantryItem({
            ...formPantryItem,
            category: categories[index]
        });
    };

    return (
        <div className={"text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"}>
            <button
                className={showCategoryDropDown ? "active" : undefined}
                onClick={(): void => toggleDropDown()}
                onBlur={(e: React.FocusEvent<HTMLButtonElement>): void => dismissHandler(e)}
            >
                <div>{formPantryItem.category.category ? "Category Selected: " + formPantryItem.category.category : "Select Category"} </div>
                {showCategoryDropDown && (
                    <DropDown
                        options={categories.map(category => category.category)}
                        showDropDown={false}
                        toggleDropDown={(): void => toggleDropDown()}
                        selectionFunction={categorySelection}/>
                )}
            </button>
        </div>
    )
};

export default CategoryDropDown;