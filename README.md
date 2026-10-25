# Sunset City — playable browser open-world prototype

A self-contained original 3D open-world driving/action vertical slice built with Three.js. It uses procedural geometry and original placeholder characters/cars rather than GTA V assets.

## Run it

Because the game uses JavaScript modules, serve this folder over HTTP (not `file://`). With Node.js installed:

```bash
npx serve .
```

Then open the printed local URL in a modern desktop or mobile browser. The Three.js module is loaded from jsDelivr, so the first run needs an internet connection.

## Controls

- **WASD / arrow keys:** walk or drive
- **Mouse drag / pointer lock:** rotate view
- **Shift:** sprint
- **Space:** jump on foot / brake in a car
- **E:** enter/exit a nearby vehicle, or start a nearby job
- **1 / 2 / 3:** switch between Jax, Nova and Eli
- **Esc:** pause
- **M:** quick-save
- On phones, use the virtual stick and action buttons. When in a vehicle, use the directional pad.

## Implemented systems

- Procedurally built coastal city, downtown tower, beach, airport runway, park/countryside, road grid, sidewalks, lights, and building collision volumes.
- Third-person character movement, sprint, jump, character switching with distinct spawn locations and character appearance.
- Drivable generated cars, SUVs, pickup trucks, sports cars and motorcycles, follow camera, acceleration, steering, collisions and vehicle damage.
- Ambient pedestrians and moving AI traffic; wanted stars and pursuing police vehicles triggered by reckless collisions.
- Four original job markers, timed destinations, completion/failure, rewards, money, HUD, minimap and mission navigation markers.
- Day/night lighting cycle, alternating clear/rain weather, rain particles, local browser save/load.
- Keyboard/mouse and touch controls.

## Scope notes

This is a playable vertical slice, not a commercial-scale GTA V recreation. The world and systems are procedural and deliberately lightweight; traffic and pedestrians use simplified AI, and the combat system is omitted in this first slice. All source modules are under `src/` for extension.
