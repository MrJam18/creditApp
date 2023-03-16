const WSMain = (ws, req) => {
    console.log('ok');
    ws.send('ты успешно подключился');
    ws.on('message', (msg)=> {
        console.log(msg);
        
    })
    
}

module.exports = {WSMain}