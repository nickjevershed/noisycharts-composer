import * as d3 from "d3"

export function convertSpreadsheetData(data, settings) {
    console.log(settings)
    let dataKeys = Object.keys(data[0]);
    let xVar = dataKeys[0];

    if ("xVar" in settings) {
        if (settings.xVar != "") {
            xVar = settings.xVar
        }
    }
    
    dataKeys = dataKeys.slice(1);
    console.log("dataKeys", dataKeys)
    
    const parseTime = (settings.dateFormat!="") ? d3.timeParse(settings.dateFormat) : ""
    console.log("parseTime", parseTime)

    settings.cols = []

    data.forEach((d,i) => {
        if ((parseTime && typeof d[xVar] == "string") || (parseTime && typeof d[xVar] == "number")) {
            console.log("parsing")
            d[xVar] = parseTime(d[xVar])
            if (i == 0) {
                settings.cols[0] = { type:"date", format:settings.dateFormat }
            }
            
        }

        else if (typeof d[xVar] == "number") {
            d[xVar] = + d[xVar]
            if (i == 0) {
                settings.cols[0] = { type:"number", format:"" }
            }
        }

        else if (typeof d[xVar] == "string") {
            if (i == 0) {
                settings.cols[0] = { type:"string", format:"" }
            }
        }

        dataKeys.forEach((key,i) => {
            if (typeof d[key] == "string") {
                if (d[key].includes(",")) {
                if (!isNaN(d[key].replace(/,/g, ""))) {
                    d[key] = +d[key].replace(/,/g, "")

                    
                }
                } else if (d[key] != "") {
                    if (!isNaN(d[key])) {
                        d[key] = +d[key]
                    }
                } else if (d[key] == "") {
                    d[key] = null
                }
            } 
        })
    })

}