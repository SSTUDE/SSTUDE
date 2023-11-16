import asyncio
import websockets
from websockets.sync.client import connect 
from collections import deque

# portNo = 8765
        
class WebSocketService:

    def __init__(self,portNo):
        self.server = None
        self.loop = None
        self.portNo = portNo
        self.connected_clients = set()
        self.message_queue = deque()
        self.latest_message = None
        
    
    async def chat_handler(self, websocket, path):
        self.connected_clients.add(websocket)
        try:
            async for message in websocket:
                print("message : ",message)
                # self.message_queue.append(message)
                self.latest_message = message
                for client in self.connected_clients:
                    if client != websocket:
                        await client.send(message)
        finally:
            self.connected_clients.remove(websocket)        
        
    def checkLatestMessage(self):
        latest_msg = self.latest_message
        self.latest_message = None
        return latest_msg
        

        
    def start(self):
        print(f"start web_socket connection. portNo is {self.portNo}")
        if not self.server:
            self.loop = asyncio.new_event_loop()
            asyncio.set_event_loop(self.loop)
        
            start_server = websockets.serve(self.chat_handler, "localhost", self.portNo)
            self.server = self.loop.run_until_complete(start_server)
            self.loop.run_forever()

    async def stop(self):
        print("close web_socket connection")
        if self.server:
            self.server.close()
            await self.server.wait_closed()
            self.loop.stop()


    async def sendInfo(self, message):
        try:
            async with websockets.connect(f"ws://localhost:{self.portNo}") as websocket:
                print("send start")
                await websocket.send(message)
                await websocket.close()
                self.latest_message = None

        except Exception as e:
            print("서버와의 연결에 실패했습니다.")

