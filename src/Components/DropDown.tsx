import React, {ReactElement, useEffect, useState} from 'react';

type DropDownProps = {
    options: string[];
    showDropDown: boolean;
    toggleDropDown: Function;
    selectionFunction: Function;
};

const DropDown: React.FC<DropDownProps> = ({
                                               options,
                                               selectionFunction,
                                           }: DropDownProps): ReactElement => {
    const [showDropDown, setShowDropDown] = useState<boolean>(false);

    /**
     * Handle passing the option name
     * back to the parent component
     *
     * @param option  The selected option
     * @param index The selected option's position in array
     */
    const onClickHandler = (option: string, index: number): void => {
        selectionFunction(option, index);
    };

    useEffect(() => {
        setShowDropDown(showDropDown);
    }, [showDropDown]);

    return (
        <>
            <div className={showDropDown ? 'dropdown' : 'dropdown active'}>
                {options.map(
                    (option: string, index: number): ReactElement => {
                        return (
                            <p
                                key={index}
                                onClick={(): void => {
                                    onClickHandler(option, index);
                                }}
                            >
                                {option}
                            </p>
                        );
                    }
                )}
            </div>
        </>
    );
};

export default DropDown;