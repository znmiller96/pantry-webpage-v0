import React, {useState} from 'react';
import PantryAddPage from "./PantryAddPage";
import HomePage from "./HomePage";
import '../CSS/App.css';

function PageTabs() {

    const [activeTab, setActiveTab] = useState<string>("Home");

    const changeTab = (name: string): void => {
        setActiveTab(name)
    }

    return (
        <>
            <div className={"Tabs"}>
                <button onClick={(): void => changeTab("Home")} >
                    Home
                </button>
                <button onClick={(): void => changeTab("Add")} >
                    Add
                </button>
                <button onClick={(): void => changeTab("Setting")} >
                    Setting
                </button>
            </div>
            <div className={"Page"}>
                {activeTab === "Home" &&
                    <HomePage />
                }
            </div>
            <div className={"Page"}>
                {activeTab === "Add" &&
                    <PantryAddPage />
                }
            </div>
            <div className={"Page"}>
                {activeTab === "Setting" &&
                    <p>test</p>
                }
            </div>
        </>
    )
}

export default PageTabs