export const sortByText = (array, key) => {
    if (key) {
        const compareFunction = (a, b) => {
            if (a[key] > b[key]) return 1;
            if (a[key] < b[key]) return -1;
            return 0;
        }
        const sortedArray = [...array.sort(compareFunction)];
        return sortedArray;
    }
        const sortedArray = [...array.sort()];
        return sortedArray;
    }