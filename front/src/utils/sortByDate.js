export const sortByDate = (array, key, reverse) => {
    if (!reverse){
        if (key) {
            const compareFunction = (a, b) => {
                const aDate = new Date(a[key]);
                const bDate = new Date(b[key]);
                if (aDate > bDate) return 1;
                if (aDate < bDate) return -1;
                return 0;
            }
            const sortedArray = [...array.sort(compareFunction)]
            return sortedArray;
        }
        const compareFunction = (a, b) => {
            const aDate = new Date(a);
            const bDate = new Date(b);
            if (aDate > bDate) return 1;
            if (aDate < bDate) return -1;
            return 0;
        }
        const sortedArray = [...array.sort(compareFunction)]
        return sortedArray;
}
    else {
        if (key) {
            const compareFunction = (a, b) => {
                const aDate = new Date(a[key]);
                const bDate = new Date(b[key]);
                if (aDate < bDate) return 1;
                if (aDate > bDate) return -1;
                return 0;
            }
            const sortedArray = [...array.sort(compareFunction)]
            return sortedArray;
        }
        const compareFunction = (a, b) => {

            const aDate = new Date(a);
            const bDate = new Date(b);
            if (aDate < bDate) return 1;
            if (aDate > bDate) return -1;
            return 0;
        }
        const sortedArray = [...array.sort(compareFunction)]
        return sortedArray;
    }
}