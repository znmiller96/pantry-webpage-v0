import React, {useEffect, useState} from 'react';
import PantryItemForm from './PantryItemForm'
import '../../CSS/App.css';
import {Category, Location, PantryItem} from "../../Models/PantryAddPageModels";
import PantryAddTable from "./PantryAddTable";
import {useParams} from "react-router-dom";

function PantryAddPage() {

    let {id} = useParams<"id">();

    const [pantryArr, setPantryArr] = useState<PantryItem[]>([]);
    const [pantryCategories, setPantryCategories] = useState<Category[]>([{category:"ERROR", categoryId:0}]);
    const [pantryLocations, setPantryLocations] = useState<Location[]>([{location:"ERROR", locationId:0}]);

    useEffect(() => {
        //console.log("Add Api Calls")
        fetch("http://localhost:8080/api/v1/category/get?userId=" + id)
            .then(response => response.json())
                .then(data => {
                    setPantryCategories(data)
                })
            .catch(() => console.log("Error loading Categories"));

        fetch("http://localhost:8080/api/v1/location/get?userId=" + id)
            .then(response => response.json())
                .then(data => {
                    setPantryLocations(data)
                })
            .catch(() => console.log("Error loading Locations"));
    }, [])


    const today = new Date();
  return (
      <>
          <div>
              <PantryItemForm
                  categoryOptionArr={pantryCategories}
                  locationOptionArr={pantryLocations}
                  today={today}
                  pantryArr={pantryArr}
                  setPantryArr={setPantryArr} />

              <PantryAddTable
                  pantryArr={pantryArr}
                  setPantryArr={setPantryArr}/>
          </div>
      </>
  );
}

export default PantryAddPage;
