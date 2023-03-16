module.exports = function sortByNumber(array, key, reverse){
        if (!reverse) {            
        if (key) {
            const compareFunction = (a, b) => {
                a[key] = +a[key];
                b[key] = +b[key];
                if (a[key] > b[key]) return 1;
                if (a[key] < b[key]) return -1;
                return 0;
            }
            const sortedArray = [...array.sort(compareFunction)];
            return sortedArray;
        }
        const compareFunction = (a, b) => {
            a = +a;
            b[key] = +b;
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
            }
            const sortedArray = [...array.sort(compareFunction)];
            return sortedArray;
        }
        else {
            if (key) {
                const compareFunction = (a, b) => {
                    a[key] = +a[key];
                    b[key] = +b[key];
                    if (a[key] < b[key]) return 1;
                    if (a[key] > b[key]) return -1;
                    return 0;
                }
                const sortedArray = [...array.sort(compareFunction)];
                return sortedArray;
            }
            const compareFunction = (a, b) => {
                a = +a;
                b[key] = +b;
                if (a < b) return 1;
                if (a > b) return -1;
                return 0;
                }
                const sortedArray = [...array.sort(compareFunction)];
                return sortedArray;
            }
        }