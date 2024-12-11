import * as d3 from "d3"

// Loop through the data and convert all the things

export function convertData(data, settings) {
    console.log("Settings3", settings)

    let dataTypes = settings.cols

    data.forEach((row, i) => {
        dataTypes.forEach((type) => {
          row[type.column] = convert(row[type.column], type);
        });
    });

    return data
}

function convert(data, type) {

    // todo: currently it can handle commas, but not currency markers and not both at once

    if (type.type == "number") {
        if (type.format == ",") {
            let newNumber = +data.replace(/,/g, "");
            return newNumber
        }
        else {
            return +data;
        }
        
    }

    else if (type.type == "date") {
        let parser = d3.timeParse(type.format);
        return parser(data)
    }

    else if (type.type == "string") {
        if (data == "") {
            return null;
        }

        else {
            return data
        }
        
    }
    
}