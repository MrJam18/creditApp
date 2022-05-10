export const postjson = async (route, data) => {
    try{
    const response = await fetch(route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
    })
    if (response.ok) return await response.json();
    else if(response.status === 401) throw new Error(response.status);
    else throw new Error(`ошибка POST запроса. Код: ${response.status}. ${response.statusText}`)
    }
    catch(e){ 
        throw new Error(e.message)
    }
    
}