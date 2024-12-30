/**
 * Sorts an object's properties based on a specified order of keys.
 *
 * @param {Object} object - The object to sort.
 * @param {Array} keys - The array of keys specifying the order.
 * @returns {Object} - The sorted object.
 */
export function sortObjectByKey(object, keys) {
    const sortedObject = {};

    // Sort the keys in the order specified in the 'keys' array
    keys.forEach((key) => {
        if (object.hasOwnProperty(key)) {
            sortedObject[key] = object[key];
        }
    });

    // Include any remaining keys that are not in the 'keys' array
    for (const key in object) {
        if (!keys.includes(key)) {
            sortedObject[key] = object[key];
        }
    }

    return sortedObject;
}

/**
 * Merges properties from the source object into the target object.
 * If a property in the target object is not an object, it is overwritten by the source object property.
 * If a property in the source object is an object, the function is called recursively.
 *
 * @param {Object} to - The target object.
 * @param {Object} from - The source object.
 * @returns {Object} - The merged object.
 */
export function merge(to, from) {
    for (const n in from) {
        if (typeof to[n] != 'object') {
            // Overwrite the target property if it's not an object
            to[n] = from[n];
        } else if (typeof from[n] == 'object') {
            // Recursively merge if the source property is an object
            to[n] = merge(to[n], from[n]);
        }
    }
    return to;
};

/**
 * Calculates the Levenshtein distance between two strings.
 * @param {string} a - The first string.
 * @param {string} b - The second string.
 * @returns {number} - The Levenshtein distance between the two strings.
 */
function levenshtein(a, b) {
  const matrix = [];

  // Increment along the first column of each row
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // Increment each column in the first row
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1) // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Filters an array of objects based on a query string.
 * Returns objects where the specified key's value matches or closely matches the query string.
 * @param {Array<Object>} arr - The array of objects to filter.
 * @param {string} query - The query string to match against.
 * @param {string} value - The key in the objects to match the query against.
 * @returns {Array<Object>} - The filtered array of objects.
 */
export function filterWithFuzzyMatch(arr, query, value) {

    let result = [];

    if (query.length > 2) {
        const lowerCaseQuery = query.toLowerCase();

        result = arr.filter(item => {
          const itemValue = item[value].toLowerCase();
          const distance = levenshtein(itemValue, lowerCaseQuery);
          const threshold = Math.max(itemValue.length, lowerCaseQuery.length) / 3; // Define a threshold

          // Check for exact match or close match using Levenshtein distance
          return itemValue.includes(lowerCaseQuery) || distance <= threshold;
        });

        result = result.sort((a, b) => {
          const aValue = a[value].toLowerCase();
          const bValue = b[value].toLowerCase();
          const aDistance = levenshtein(aValue, lowerCaseQuery);
          const bDistance = levenshtein(bValue, lowerCaseQuery);

          return aDistance - bDistance;
        });
    }

    return result;
}
