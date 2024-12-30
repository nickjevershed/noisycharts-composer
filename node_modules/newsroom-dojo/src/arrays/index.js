/**
 * Checks if a value or any value in an array is present in another array or string.
 *
 * @param {Array|string} a - The array or string to search within.
 * @param {Array|string} b - The value or array of values to search for.
 * @returns {boolean} - True if the value or any value in the array is found, otherwise false.
 */
export function contains(a, b) {
    // Check if 'b' is an array
    if (Array.isArray(b)) {
        // If 'b' is an array, return true if any element in 'b' is found in 'a'
        return b.some(x => a.includes(x));
    }
    // If 'b' is a single value, return true if it is found in 'a'
    return a.includes(b);
}

/**
 * Returns the elements in array b that are not in array a.
 *
 * @param {Array|string} a - The array or string to compare against.
 * @param {Array|string} b - The array or string to check for unmatched elements.
 * @returns {Array|string} - The unmatched elements or an empty array if none.
 */
export function unmatched_array(a, b) {
    // If b is an array
    if (Array.isArray(b)) {
        return b.filter(c => !a.includes(c));
    }
    // If b is a string
    return a.includes(b) ? [] : b;
}


/**
 * Returns a new array with only unique elements from the input array.
 *
 * @param {Array} arr - The array to filter for unique elements.
 * @returns {Array} - An array with unique elements.
 */
export function unique(arr) {
    const unique = [];
    arr.forEach(item => {
        if (!unique.includes(item)) {
            unique.push(item);
        }
    });
    return unique;
}


/**
 * Sums the values of a specified property in an array of objects.
 *
 * @param {Array} arr - The array of objects.
 * @param {string} prop - The property to sum.
 * @returns {number} - The sum of the specified property values.
 */
export function sum(arr, prop) {
    return arr.reduce((total, item) => total + item[prop], 0);
}


/**
 * Shuffles an array in place.
 *
 * @param {Array} arr - The array to shuffle.
 * @returns {Array} - The shuffled array.
 */
export function shuffle(arr) {
    let i = arr.length;
    while (i > 0) {
        const j = Math.floor(Math.random() * i);
        i--;
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}


/**
 * Returns an array of elements from the input array that are multiples of a specified number.
 *
 * @param {Array} arr - The array to check for multiples.
 * @param {number} multiplier - The number to check multiples of.
 * @returns {Array} - An array of multiples.
 */
export function multiples(arr, multiplier) {
    return arr.filter(num => num % multiplier === 0);
}


/**
 * Returns the elements in array b that are also in array a.
 *
 * @param {Array|string} a - The array or string to compare against.
 * @param {Array|string} b - The array or string to check for matched elements.
 * @returns {Array|string} - The matched elements or an empty array if none.
 */
export function match_array(a, b) {
    // If b is an array
    if (Array.isArray(b)) {
        return b.filter(c => a.includes(c));
    }
    // If b is a string
    return a.includes(b) ? b : [];
}


/**
 * Checks if an array has duplicate values.
 *
 * @param {Array} array - The array to check for duplicates.
 * @returns {boolean} - True if duplicates are found, otherwise false.
 */
export function has_duplicates(array) {
    const valuesSoFar = Object.create(null);
    for (const value of array) {
        if (value in valuesSoFar) {
            return true;
        }
        valuesSoFar[value] = true;
    }
    return false;
}


/**
 * Returns the index of the next highest value in the array compared to a specified value.
 * If no higher value exists, returns the length of the array.
 *
 * @param {Array} arr - The array to search.
 * @param {number} value - The value to compare against.
 * @returns {number} - The index of the next highest value or the length of the array.
 */
export function getNextHighestIndex(arr, value) {
    let i = arr.length;
    while (i > 0 && arr[i - 1] <= value) {
        i--;
    }
    return i;
}


/**
 * Finds the value in an array that is closest to a specified number.
 *
 * @param {Array} array - The array to search.
 * @param {number} num - The number to find the closest value to.
 * @returns {number} - The closest value in the array.
 */
export function getClosest(array, num) {
    let minDiff = Infinity;
    let closestValue;
    for (const value of array) {
        const diff = Math.abs(num - value);
        if (diff < minDiff) {
            minDiff = diff;
            closestValue = value;
        }
    }
    return closestValue;
}


/**
 * Splits an array into groups of a specified size.
 *
 * @param {Array} arr - The array to split into chunks.
 * @param {number} size - The size of each chunk.
 * @returns {Array} - An array of chunks.
 */
export function chunkArrayInGroups(arr, size) {
    return arr.reduce((all, one, i) => {
        const ch = Math.floor(i / size);
        all[ch] = [].concat(all[ch] || [], one);
        return all;
    }, []);
}
