import asyncio
import websockets
async def test():
    async with websockets.connect("ws://localhost:80/ws") as websocket:
        print("Connected!")
asyncio.run(test())
