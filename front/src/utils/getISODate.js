export default function getISODate(date) {
    if(date) {
        date = new Date(date);
        return date.toISOString().substring(0, 10);
    }
    else{
        return new Date().toISOString().substring(0, 10);
    }

}