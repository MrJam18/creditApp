import { saveAs } from 'file-saver';

export const saveFileFromServer = async (path, fileName) => {
try{
    const response = await fetch(path)
    if(response.status === 200 ){
        const blob = await response.blob();
        saveAs(blob, fileName);
    }
    else throw new Error(response.message)
}
catch(e){
    console.log(e);
    throw new Error(e.message);
}
}