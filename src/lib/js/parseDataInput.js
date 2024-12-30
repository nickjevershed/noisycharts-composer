import getDataTable from "$lib/js/parseDataTableRaw";
import { swapArray } from "$lib/js/utils";
import Papa from 'papaparse';

// meta keys
const META_KEYS = ["headline", "standfirst", "source", "unit", "note", "page", "#"];

/*
detect file format => CSV with , or \t or | OR JSON
=== validatation 1 ===
string => (line) rows (based on the format)
rows => meta and (data) rows
rows => cols; ps. remove empty rows and cols
=== validatation 2 ===
detect
- if data has headers, and
- data type(s) of all body cols
=> flag, head, type, body
*/

export function arrToJson(resp) {
  if (!resp.flag.isHeader) {
    resp.head = resp.head.map((d,i) => `${d}-${i+1}`)
  } else {
    resp.head = resp.head.map((d,i) => {
      return d.includes('unknown title') ? `${d} - ${i}` : d
    })
  }
  const json = [];
  for (let i = 0; i < resp.body.length; i++) {
  json.push(arrToObjectData(resp.head, resp.body[i]));
  }
  return json
}

function arrToObjectData(arrHeader, arrBody) {
  const data = arrHeader.reduce((prevValue, curValue, curIndex, arr) => {
  return { ...prevValue, [curValue]: arrBody[curIndex] };
  }, {});
  return data; 
}

export function checkData(dataInput) {
  /* dataInput (raw input string to lines) */
  
  // detect file type
  const dataMatch = {
    tab: dataInput.match(/\t/g),
    comma: dataInput.match(/,f/g),
  };
  // TODO: csv with comma in quotes ("hi, sth. like this") is not parsed and json?
  const dataType = dataMatch.tab ? "tsv" : "csv";

  // console.log(dataInput)
  // string => lines
  const dataLines = dataInput.split(/\n/g);
  // let dataLines = dataInput.split(/[\n|\r]/g);
  // ref: http://stackoverflow.com/questions/10059142/reading-r-carriage-return-vs-n-newline-from-console-with-getc
  // console.log(dataLines);


  /* dataTableRaw */
  let dataTableRaw = {
    meta: {}, // [1]
    rows: [], // [1]
    cols: [], // [2]
  };

  

  /* 1. meta , rows */
  // parse from data input
  dataLines.forEach(row => {
    //console.log(row)
    switch(dataType) {
    case "tsv": row = row.split('\t').map(header => header.trim()); break;
    case "csv": row = row.split(",");  break;
    case "json": console.log("add a parser"); break;
    default: console.log("need a new type:", dataType);
    }
    parseRow(dataTableRaw, row);
  });


  /* 2. cols */
  // init cols and clean both cols and rows
  dataTableRaw.cols = swapArray(dataTableRaw.rows);

  // detect empty cols
  const emptyCols = dataTableRaw.cols
    .map((col, idx) => ({col, idx}))
    .filter(d => d.col.every(val => val === null))
    .map(d => d.idx);
    // remove empty cols from both cols and rows data
  emptyCols.forEach((iEmpty, iAdjust) => dataTableRaw.cols.splice(iEmpty-iAdjust, 1));
  dataTableRaw.rows.forEach(row => emptyCols.forEach((iEmpty, iAdjust) => row.splice(iEmpty-iAdjust, 1)));

  let range = dataTableRaw.rows.map(d => d.length)

  //console.log(dataTableRaw)

  let valid = range.every( (val, i, arr) => val === arr[0] )

  let final = dataTableRaw.rows[dataTableRaw.rows.length - 1]

  return (range.length > 1 && valid && final[final.length - 1] != null) ? true : false
}

export function givePrompt(dataInput) {
  /* dataInput (raw input string to lines) */
  
  // detect file type
  const dataMatch = {
    tab: dataInput.match(/\t/g),
    comma: dataInput.match(/,f/g),
  };
  // TODO: csv with comma in quotes ("hi, sth. like this") is not parsed and json?
  const dataType = dataMatch.tab ? "tsv" : "csv";

  // console.log(dataInput)
  // string => lines
  const dataLines = dataInput.split(/\n/g);
  // let dataLines = dataInput.split(/[\n|\r]/g);
  // ref: http://stackoverflow.com/questions/10059142/reading-r-carriage-return-vs-n-newline-from-console-with-getc
  // console.log(dataLines);


  /* dataTableRaw */
  let dataTableRaw = {
    meta: {}, // [1]
    rows: [], // [1]
    cols: [], // [2]
  };

  

  /* 1. meta , rows */
  // parse from data input
  dataLines.forEach(row => {
    //console.log(row)
    switch(dataType) {
    case "tsv": row = row.split('\t').map(header => header.trim()); break;
    case "csv": row = row.split(",");  break;
    case "json": console.log("add a parser"); break;
    default: console.log("need a new type:", dataType);
    }
    parseRow(dataTableRaw, row);
  });


  /* 2. cols */
  // init cols and clean both cols and rows
  dataTableRaw.cols = swapArray(dataTableRaw.rows);

  // detect empty cols
  const emptyCols = dataTableRaw.cols
    .map((col, idx) => ({col, idx}))
    .filter(d => d.col.every(val => val === null))
    .map(d => d.idx);
    // remove empty cols from both cols and rows data
  emptyCols.forEach((iEmpty, iAdjust) => dataTableRaw.cols.splice(iEmpty-iAdjust, 1));
  dataTableRaw.rows.forEach(row => emptyCols.forEach((iEmpty, iAdjust) => row.splice(iEmpty-iAdjust, 1)));

    let numberOfColumns = dataTableRaw.cols.length
    let numberOfRows = dataTableRaw.rows.length

    let prompt = ''

    if (numberOfRows > 1) {

      let range = dataTableRaw.rows.map(d => d.length)

      // console.log(range)

    
      let valid = range.every( (val, i, arr) => val === arr[0] )

      if (!valid) {
        prompt = `Your data currently has ${numberOfRows} rows and ${numberOfColumns} columns.`
        let additional = findNonMatchingIndex(range)
        let mode = calculateMode(range)
        prompt += ` Row ${additional + 1} is currently... <strong>${dataTableRaw.rows[additional]}</strong>. Other rows contain ${mode} items.`
      }

      /*
    
      let final = dataTableRaw.rows[dataTableRaw.rows.length - 1]

      console.log(range,valid,final)

      */

    }
  /*

  let range = dataTableRaw.rows.map(d => d.length)

  //console.log(dataTableRaw)

  let valid = range.every( (val, i, arr) => val === arr[0] )

  let final = dataTableRaw.rows[dataTableRaw.rows.length - 1]

  */

  return  prompt //(range.length > 1 && valid && final[final.length - 1] != null) ? true : false
}

function findNonMatchingIndex(numbers) {
  // Check if the array is empty or has only one element, in which case all values match by default
  if (numbers.length <= 1) {
    return; // Implicitly returns undefined, indicating no non-matching index
  }

  // Store the value of the first element to compare with others
  const firstValue = numbers[0];

  // Iterate through the array starting from the second element
  for (let i = 1; i < numbers.length; i++) {
    // If the current element does not match the first element's value, return its index
    if (numbers[i] !== firstValue) {
      return i; // Return the index of the non-matching element
    }
  }

  // If the loop completes without finding a non-matching value, all numbers match
  // The function will implicitly return undefined here
}

function calculateMode(numbers) {
  const frequencyMap = {};
  let maxFreq = 0;
  let mode = [];

  // Count the occurrences of each number
  numbers.forEach(number => {
    if (frequencyMap[number]) {
      frequencyMap[number]++;
    } else {
      frequencyMap[number] = 1;
    }

    // Update the max frequency if current number's frequency is higher
    if (frequencyMap[number] > maxFreq) {
      maxFreq = frequencyMap[number];
    }
  });

  // Identify the number(s) with the highest frequency
  for (const number in frequencyMap) {
    if (frequencyMap[number] === maxFreq) {
      mode.push(Number(number));
    }
  }

  // Return the mode
  // If there is only one mode, return it directly, otherwise, return the array of modes
  return mode.length === 1 ? mode[0] : mode;
}


// Example usage
// console.log(findNonMatchingIndex([5, 5, 5])); // undefined, all numbers match
// console.log(findNonMatchingIndex([10, 10, 15, 10])); // 2, the third number does not match



export function parseDataInput(dataInput) {
  /* dataInput (raw input string to lines) */
  // detect file type
  const dataMatch = {
    tab: dataInput.match(/\t/g),
    comma: dataInput.match(/,f/g),
  };
  // TODO: csv with comma in quotes ("hi, sth. like this") is not parsed and json?
  const dataType = dataMatch.tab ? "tsv" : "csv";

  //console.log(`dataType: ${dataType}`)
  // string => lines
  const dataLines = dataInput.split(/\n/g);
  // let dataLines = dataInput.split(/[\n|\r]/g);
  // ref: http://stackoverflow.com/questions/10059142/reading-r-carriage-return-vs-n-newline-from-console-with-getc
  // console.log(dataLines);


  /* dataTableRaw */
  let dataTableRaw = {
    meta: {}, // [1]
    rows: [], // [1]
    cols: [], // [2]
  };

  /* 1. meta , rows */
  // parse from data input
  dataLines.forEach(row => {
    // console.log(row)
    switch(dataType) {
    case "tsv": row = row.split("\t"); break;
    case "csv": row = row.split(",");  break;
    case "json": console.log("add a parser"); break;
    default: console.log("need a new type:", dataType);
    }
    parseRow(dataTableRaw, row);
  });


  /* 2. cols */
  // init cols and clean both cols and rows
  dataTableRaw.cols = swapArray(dataTableRaw.rows);

  // detect empty cols
  const emptyCols = dataTableRaw.cols
    .map((col, idx) => ({col, idx}))
    .filter(d => d.col.every(val => val === null))
    .map(d => d.idx);
    // remove empty cols from both cols and rows data
  emptyCols.forEach((iEmpty, iAdjust) => dataTableRaw.cols.splice(iEmpty-iAdjust, 1));
  dataTableRaw.rows.forEach(row => emptyCols.forEach((iEmpty, iAdjust) => row.splice(iEmpty-iAdjust, 1)));


  /* 3. flag, head, type, body (of dataTableDraw) */
  // add properties from parseDataTableRaw.js including dataTableRaw and dataTableDraw
  const dataTable = getDataTable(dataTableRaw);
  console.log("dataTable", dataTable)
  /*
    console.log("input -> table")
    // in this file
    console.log("dataTableRaw: parse from dataInput (this file)")
    console.log(dataTableRaw)
    // in parseDataTableRaw.js
    console.log("dataTable: parse for table view and transformations (getDataTable.js)")
    console.log(dataTable)
    */

  return dataTable;
}

// Check if a row is meta data
function isMetaKeys(col) {
  return META_KEYS.some(d => d === col);
}
// Check if a row is empty, all cols have no value as content
function isNotEmpty(row) {
  return !row.every(d => d === null);
}

function parseRow(dataTableRaw, row) {
  let col0 = row[0].toLowerCase().trim();

  // 1. trim and set empty entris to null
  row = row.map(d => {
    d = d.trim();
    return (d!=="" && d!==".." && d!=="-") ? d : null;
  });

  // 2. extract meta
  // 3. ignore empty lines
  switch (true) {
  // col0 is the key if this row is meta data
  case isMetaKeys(col0): dataTableRaw.meta[col0] = row[1]; break;
  case isNotEmpty(row): dataTableRaw.rows.push(row); break;
  default: // console.log("empty row")
  }
}



/*
//http://stackoverflow.com/questions/3710204/how-to-check-if-a-string-is-a-valid-json-string-in-javascript-without-using-try
function IsJsonString(str) {
try {
JSON.parse(str);
} catch (e) {
return false;
}
return true;
}*/
