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
            <label>Does Item Have Expiration Date: <input type="checkbox" checked={hasExpirationDate} onChange={(): void => toggleDatePicker()}/></label>

            {hasExpirationDate && (
                <div>
                    <DatePicker
                        selected={formPantryItem.expirationDate}
                        onChange={(date) => setExpirationDate(date)}
                        minDate={minDate} />
                </div>
            )}
        </>
    )

}

export default ExpirationDatePicker;