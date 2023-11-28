import React, {useEffect, useState} from 'react';
import PantryItemForm from './PantryAddPage/PantryItemForm'
import '../CSS/App.css';
import {Category, Location, PantryItem} from "../Models/PantryAddPageModels";
import Table, {ColumnDefinitionType} from "../Components/Table";
import PantryAddTable from "./PantryAddPage/PantryAddTable";
import {Console} from "inspector";

function PantryAddPage() {

    const [pantryArr, setPantryArr] = useState<PantryItem[]>([]);
    const [pantryCategories, setPantryCategories] = useState<Category[]>([{category:"ERROR", id:0}]);
    const [pantryLocations, setPantryLocations] = useState<Location[]>([{location:"ERROR", id:0}]);

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/category/get?userId=1001")
            .then(response => response.json())
                .then(data => {
                    setPantryCategories(data)
                })
            .catch(() => console.log("Error loading Categories"));

        fetch("http://localhost:8080/api/v1/location/get?userId=1001")
            .then(response => response.json())
                .then(data => {
                    setPantryLocations(data)
                })
            .catch(() => console.log("Error loading Locations"));
    }, [])


    const today = new Date();

  return (
      <>
          <div className="App">
              <header className="App-header">
                  <PantryItemForm
                      categoryOptionArr={pantryCategories}
                      locationOptionArr={pantryLocations}
                      today={today}
                      pantryArr={pantryArr}
                      setPantryArr={setPantryArr} />

                  <PantryAddTable
                      pantryArr={pantryArr}
                      setPantryArr={setPantryArr}/>
              </header>
          </div>
      </>
  );
}

export default PantryAddPage;
