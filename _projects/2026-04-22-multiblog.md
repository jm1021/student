---
layout: post
codemirror: True
title: Sprint 5 Multiplayer Lesson
permalink: /sprinting snails/multiplayer
author: Salma Zaghloul
---
# Multiplayer Games
## What are they?
In our context, multiplayer games are our familair .js levels, however more than one player can connect to play at the same time. Think of Among Us, or Fortnite.
---
## How does it work, exactly?
Our game file is connected to an external server in the backend, that is constantly communicating and exchanging information with the front end. The server handles connections, player counts, diconnections, and most importnantly, player identification.

### Connection
When a player connects, the server assigns them a randomly generated ID (SID).

```py
@socketio.on('connect')
def handle_connect():
    global playercount
    sid = request.sid
    # Spawn at random or default position
    players[sid] = {"x": 100, "y": 100,}
    playercount = playercount + 1
    print(f"[SERVER] Player joined: {sid} and count = " + f" {playercount}")
    socketio.emit('player_update', {"players": players})
```
Notes:
- The server sets 'playercount' to a global variable, to allow communication between the front and backends.
    - Explanation: If the variable is local, it cannot be printed, sent, etc.
- In the instance someone joins, the server requests and generates a new id and assigns it to the player.
- The server then increases the player count, before printing it in the console.
![alt text](<Screenshot 2026-04-22 101721.png>)

### Disconnection
Similar to player connection, the server must handle the event of a player disconnecting.
```py
@socketio.on('disconnect')
def handle_disconnect():
    sid = request.sid
    if sid in players:
        del players[sid]
        print(f"[SERVER] Player disconnected: {sid} and count = " f"{playercount}")
        print(f"{playercount}")
        socketio.emit('player_left', {"sid": sid})
        socketio.emit('player_update', {"players": players})
```
Notes:
- In the event of a disconnection, the server looks up the "identification" of the player.
- It then deletes this person's SID
- This action effectively lowers the player count on its own, so there is no need to include it in this string.
---
## How do I add this to my game?
- First, update the .md file that generates your game level to contain this:
```
---
layout: opencs
title: Multiplayer
permalink: /gamify/mylevel
socket_io: true
--- 
```

- Then, implement the server into your .js file. Here's ours as an example if needed:
[]()
<button onclick="window.location.href="">Multiplayer.js</button>
<div class="button-container" id="btns">
  <a href="https://mgithub.com/Salma-Zag/Tri2team/blob/main/assets/js/projects/multiplayer/levels/GameLevelMultiplayer.js'; class="button large btn-s5">SPRINT 5</a>
</div>

<div class="button-container" id="btns">
  <a href="https://github.com/Salma-Zag/Tri2team/blob/main/assets/js/projects/multiplayer/levels/GameLevelMultiplayer.js" class="button large btn-start">Button</a>
</div>


Under your *const* definitions, add these strings of code.

```js
 // const socket = io("wss://flask-ws.opencodingsociety.com", { transports: ["websocket"] });
const socket = io("ws://localhost:8590", { transports: ["websocket"] });
        
        let myid = null;

        socket.on("connect", () => {
            console.log("connected:", socket.id);
        });
```
IMPORTANT TO NOTE:
This line, "const socket = io("ws://localhost:8590", { transports: ["websocket"] });" is for local host use. When committing to deployed use, comment out this previous line and uncomment the one above it ("const socket = io("wss://flask-ws.opencodingsociety.com", { transports: ["websocket"] });").

For context, when you deploy your level, this portion of code should now look like:
```js
const socket = io("wss://flask-ws.opencodingsociety.com", { transports: ["websocket"] });
// const socket = io("ws://localhost:8590", { transports: ["websocket"] });
        
        let myid = null;

        socket.on("connect", () => {
            console.log("connected:", socket.id);
        });
```

## Further Developements
Our game level and engine are dynamic and are bound to update in the future. Keep an eye out!

Additional features:
- Physical sprites per player
- Notifying the host when a player joins
- Lobbies (to help people find one another)
- Lobby codes
- Levels
- Gravity (jump logic, velocity)