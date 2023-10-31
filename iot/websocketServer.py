from utils.web_socket import WebSocketService
from websockets.sync.client import connect 
        


webSocket = WebSocketService(portNo=8765)
webSocket.start()
