export const getjson = async (route) => {
    try{
        const response = await fetch(route)
        if (response.ok) { 
        return await response.json();
        }
        else {
             throw new Error("Ошибка HTTP: " + response.status);
        }
    }
    catch(e){ 
        console.log(e.stack);
        throw new Error("Ошибка HTTP: " + e.message);

    }
    
}