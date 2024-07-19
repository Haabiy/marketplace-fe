
class Testclass{

    connect(path){
        return new Promise((resolve, reject)=>{
            const socketInstance = new WebSocket(path);
            console.log('Here is the ws path: ', path)
            socketInstance.onopen=()=>('WEBSOCKET IS OPEN')
            socketInstance.onmessage = (e) => {
                resolve(e.data);
            };
            socketInstance.onerror = (error) => {
                reject(error);
            };
        })}

    };

export default Testclass;
