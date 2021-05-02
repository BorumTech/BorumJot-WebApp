/**
 * Compares the elements of two arrays and returns where they are equal, 
 * including objects by checking the properties using JSON.stringify
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns whether each element in arr1 is equal to the element at the same index in arr2
 */
export function compareArrays(arr1, arr2) {
	return arr1.some((item, index) => JSON.stringify(item) != JSON.stringify(arr2[index]));
}
