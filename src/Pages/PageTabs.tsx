import React, {useState} from 'react';
import PantryAddPage from "./PantryAddPage";
import HomePage from "./Home/HomePage";
//import '../CSS/App.css';

function PageTabs() {

    const [activeTab, setActiveTab] = useState<string>("Home");

    const changeTab = (name: string): void => {
        setActiveTab(name)
    }

    return (
        <div className={"min-h-screen"}>
            <div className={"Tabs bg-gray-800 text-yellow-200"}>
                <button onClick={(): void => changeTab("Home")} className={"border-r-2 border-amber-200 pl-5 p-2"}>
                    Home
                </button>
                <button onClick={(): void => changeTab("Add")} className={"pl-2"}>
                    Add
                </button>
                <button onClick={(): void => changeTab("Setting")} className={"pl-2"}>
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
        </div>
    )
}

export default PageTabs