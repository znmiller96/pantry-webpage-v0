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
                <div className={"absolute text-black z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y"}>
                {options.map(
                    (option: string, index: number): ReactElement => {
                        return (
                            <p
                                key={index}
                                onClick={(): void => {
                                    onClickHandler(option, index);
                                }}
                                className={'hover:bg-gray-200 hover:text-gray-900 text-gray-700 py-1'}
                            >
                                {option}
                            </p>
                        );
                    }
                )}
                </div>
            </div>
        </>
    );
};

export default DropDown;