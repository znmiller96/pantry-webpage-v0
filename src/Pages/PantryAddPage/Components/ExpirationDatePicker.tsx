import React, {ReactElement} from "react";
import DatePicker from "react-datepicker";
import {PantryItem} from "../../../Models/PantryAddPageModels";

type ExpirationDatePickerProps = {
    formPantryItem: PantryItem,
    setFormPantryItem: Function,
    minDate: Date | null | undefined,
    hasExpirationDate: boolean,
    setHasExpirationDate: Function
}

const ExpirationDatePicker: React.FC<ExpirationDatePickerProps> = ({
                                                                       formPantryItem,
                                                                       setFormPantryItem,
                                                                       minDate,
                                                                       hasExpirationDate,
                                                                       setHasExpirationDate
                                                              }: ExpirationDatePickerProps): ReactElement => {

    const toggleDatePicker = () => {
      setHasExpirationDate(!hasExpirationDate);
    }

    function setExpirationDate(date: Date | null) {
        if(date != null) {
            setFormPantryItem({
                ...formPantryItem,
                expirationDate: date
            });
        }
    }

    return (
        <>
            <div className={"flex items-start mb-5"}>
                <div className={"flex items-center h-5"}>
                    <input type="checkbox" checked={hasExpirationDate} onChange={(): void => toggleDatePicker()} className={"w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"} />
                </div>
                <label className={"ms-2 text-sm font-medium text-gray-900 dark:text-gray-900"}>Does Item Have Expiration Date</label>
            </div>

            {hasExpirationDate && (
                <div  className={"flex items-start mb-5"}>
                    <div className={"relative w-2/3"}>
                        <DatePicker
                            name={"name"} id={"name"}
                            selected={formPantryItem.expirationDate}
                            onChange={(date) => setExpirationDate(date)}
                            minDate={minDate}
                            className={"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"} />
                    </div>
                </div>
            )}
        </>
    )

}

export default ExpirationDatePicker;