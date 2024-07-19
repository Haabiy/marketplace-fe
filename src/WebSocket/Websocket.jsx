class WebSocketService {
    callbacks = {};

    constructor() {
        this.socketRef = null;
    }

    connect(path) {
        if (this.socketRef && (this.socketRef.readyState === WebSocket.OPEN || this.socketRef.readyState === WebSocket.CONNECTING)) {
            console.log('WebSocket already connected or connecting');
            return;
        }
        console.log('Connecting to:', path);
        this.socketRef = new WebSocket(path);

        this.socketRef.onopen = () => console.log('WebSocket open');
        this.socketRef.onmessage = e => this.socketNewMessage(e.data);
        this.socketRef.onerror = e => console.error('WebSocket error:', e.message);
        this.socketRef.onclose = e => {
            console.log('WebSocket closed:', e.reason);
            if (e.code !== 1000) { // Don't reconnect if the closure was normal
                setTimeout(() => {
                    console.log('WebSocket reconnecting...');
                    this.connect(path);
                }, 1000);
            }
        };
    }

    socketNewMessage(data) {
        const parsedData = JSON.parse(data);
        if (this.callbacks['data']) {
            this.callbacks['data'](parsedData);
        }
    }

    addCallbacks(dataCallback) {
        this.callbacks['data'] = dataCallback;
    }

    close() {
        if (this.socketRef) {
            this.socketRef.close(1000); // Normal closure
        }
    }
}

export default WebSocketService;
