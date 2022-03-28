/**
 * Compares the elements of two arrays and returns where they are equal, 
 * including objects by checking the properties using JSON.stringify
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns whether each element in arr1 is equal to the element at the same index in arr2
 */
export function compareArrays(arr1, arr2) {
	return arr2 instanceof Array && arr1.every(element => arr2.includes(element)) && arr2.every(element => arr1.includes(element));
}
