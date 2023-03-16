const socket = new WebSocket('ws://localhost:5000/api/ws');

class AppWS {
    openSocket() {
        socket.onopen = () => {
        console.log('подключение установлено');
        }
    }
    onMessage() {
        socket.onmessage = (ev) => {
            console.log('пришло сообщение ' + ev.data);
            
        }
    }
    sendMessage() {
        socket.send('hello')
    }
}

export {AppWS}