import { merge, contains } from "$lib/js/utils"

/**
 * Checks if a dataset is wide or long.
 * 
 * @param {Array<Array<any>>} dataset - The dataset to check, represented as an array of rows.
 * @returns {string} - Returns "wide" if the dataset is considered wide,
 *                     "long" if the dataset is considered long,
 *                     or "balanced" if the dataset does not strongly fit either category.
 */

export function checkDatasetShape(dataset, info, head) {
  if (!Array.isArray(dataset) || dataset.length === 0) {
    return 'invalid'; // The dataset is not valid for classification.
  }

  const numRows = dataset.length;
  const numColumns = Object.keys(dataset[0]).length; // Assuming all rows have the same number of columns.

  console.log(`numRows: ${numRows}, numColumns: ${numColumns}`)

  let hasRepeat = info.filter(d => d.hasRepeat)

  let json = {}

  json.specs = info.map((d,i) => {
    return { column : head[i], index : i, type : getType(d.list[0]), format : d.format, hasRepeat : d.hasRepeat}
  })

  json.repeats = json.specs.filter(d => d.type == 'string' && d.hasRepeat)

  json.frequencies = calculateTypeFrequency(json.specs)

  json.frequencies.repeats = json.repeats.length

  // Define a threshold for considering a dataset "wide" or "long".
  // This is a simple heuristic and might need adjustment based on specific use cases.
  const threshold = 2; // Example threshold

  json.shape =  (numRows / numColumns > threshold && hasRepeat.length > 0) ? 'long' : 'wide' ;

  return json

}

export function checkDataIsFormattedForChartType(chart, specs) {

  let { string , date, number, repeats } = specs

  switch (chart.type) {
    case 'verticalbar':
      if (string > 0 && number > 0 || date > 0 && number > 0 || number > 2 ) {
        return true
      } else {
        return false
      }
      break;
      case 'scatterplot':
        if (repeats > 0 && number > 1) {
          return true
        } else {
          return false
        }
      break;
      case 'linechart':
        if (date > 0 && number > 0) {
          return true
        } else {
          return false
        }
      break;
      case 'horizontalbar':
        if (string > 0 && number > 0) {
          return true
        } else {
          return false
        }
      break;
      case 'smallmultiples':
        if (number > 0 && repeats > 1 || date > 0 && number > 0 && repeats > 0) {
          return true
        } else {
          return false
        }
      break;
      case 'stackedarea':
        if (date > 0 && number > 0) {
          return true
        } else {
          return false
        }
      break;
      case 'table':
        return true
      break;
      case 'horizontalgroupedbar':
        if (string > 0 && number > 0) {
          return true
        } else {
          return false
        }
      break;
      case 'lollipop':
        if (string > 0 && number > 1) {
          return true
        } else {
          return false
        }
      break;
      case 'bubble':
        if (number == 2 && repeats > 1) {
          return true
        } else {
          return false
        }
      break;
      case 'sankey':
        if (number > 0 && repeats > 1) {
          return true
        } else {
          return false
        }
      break;
      case 'treemap':
        if (number > 0 && repeats > 1) {
          return true
        } else {
          return false
        }
      break;
    default:
      return false
  }
}

function getType(item) {  
  return (item.includes("string")) ? 'string' : item
}

function calculateTypeFrequency(jsonArray) {
  return jsonArray.reduce((accumulator, currentValue) => {
    // Extract the type of the current item
    const type = currentValue.type;

    // Increment the type's frequency in the accumulator object
    accumulator[type] = (accumulator[type] || 0) + 1;

    return accumulator;
  }, {string: 0, date: 0, number: 0});
}