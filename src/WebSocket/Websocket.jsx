class WebSocketService {
    callbacks = {};

    constructor() {
        this.socketRef = null;
    }

    connect(path) {
        console.log('Connecting to:', path);
        this.socketRef = new WebSocket(path);

        this.socketRef.onopen = () => console.log('WebSocket open');
        this.socketRef.onmessage = e => this.socketNewMessage(e.data);
        this.socketRef.onerror = e => console.error('WebSocket error:', e.message);
        this.socketRef.onclose = e => {
            console.log('WebSocket closed:', e.reason);
            setTimeout(() => {
                console.log('WebSocket reconnecting...');
                this.connect(path);
            }, 1000);
        };
    }

    socketNewMessage(data) {
        const parsedData = JSON.parse(data);
        //console.log('parsedData:', parsedData.data)
        //console.log('data:', data['data'])
        if (this.callbacks['data']) {
            this.callbacks['data'](parsedData);
        }
    }

    addCallbacks(dataCallback) {
        this.callbacks['data'] = dataCallback;
    }

    close() {
        if (this.socketRef) {
            this.socketRef.close();
        }
    }
}

export default WebSocketService;
