import getDataTypeAnalysis from "$lib/js/detectDataType";

const getDataTypesForColumns = (cols) => cols.map((col, columnIndex) => {
  let dataTypesAndFormats = getDataTypeAnalysis(col.slice(1), "body");
  let listOfDataTypes = dataTypesAndFormats.types;

  // If this is not the first column, remove date from the possible types
  // To avoid misinterpreting a numerical value that _looks like_ a date, e.g. 1998
  if(columnIndex > 0) {
    listOfDataTypes = listOfDataTypes.filter(dataType => dataType !== "date");
  }

  // Get whichever type has the highest precedence and take the formatter for that type
  let probableDataType = listOfDataTypes[0];
  let formatter = dataTypesAndFormats[probableDataType];
  
  // Return all possible types and the formatter for the type with the highest precedence
  return {list: listOfDataTypes, ...formatter};
});

export default function(dataTableRaw) {
  const {cols, rows} = dataTableRaw;

  let dataTableDraw = { flag: {} };

  let headTypes = cols.map((col) => {
    let head = col.slice(0, 1)[0] ? col.slice(0, 1) : [""];
    let output = getDataTypeAnalysis(head, "head");
    return output.types[0];
  });

  dataTableDraw.flag = { isHeader:
    (headTypes.filter(headType => headType.indexOf("string") !== -1).length === headTypes.length) ||
    (headTypes.filter((headType, i) => headType === getDataTypesForColumns(cols)[i].list[0]).length !== headTypes.length)
  };

  dataTableDraw.type = getDataTypesForColumns(cols);

  if (dataTableDraw.flag.isHeader) {
    // TODO: double check headers
    const headers = rows.slice(0, 1)[0].map(header => header ? header : "unknown title");
    dataTableDraw.head = headers;
    dataTableDraw.body = rows.slice(1);
  } else {
    dataTableDraw.head = headTypes.map(() => "unknown title");
    dataTableDraw.body = rows;
  }

  return {
    ...dataTableRaw,
    ...dataTableDraw
  };
}
