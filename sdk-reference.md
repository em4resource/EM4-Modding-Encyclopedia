# Emergency 4 SDK Reference

The SDK folder is the script API reference for Emergency 4. It tells you what classes, enums, and functions scripts are allowed to use.

Your SDK folder contains 25 `.script` reference files:

```text
ActionInsertModes.script
Actor.script
Audio.script
Camera.script
Command.script
EActions.script
EquipmentNames.script
FireObject.script
Game.script
GameObject.script
Input.script
Interface.script
List.script
Math.script
Mission.script
Path.script
Person.script
ScriptSerializer.script
Spawn.script
Stdutil.script
System.script
Vector.script
Vehicle.script
Weather.script
XMLGui.script
```

## Core Object Model

### Actor

`Actor.script` is the base class for world actors. It deals with map objects at the broadest level: actor type, terrain, target points, names, placement, position, and rotation.

### GameObject

`GameObject.script` is one of the most important files. It is the gameplay object base class. Persons and vehicles inherit from it.

Common areas:

- Commands
- Action queues
- Lights
- Burning and damage state
- Physics
- Distance checks
- Object flags
- Carried objects
- Equipment actions
- Movement and interaction actions

### Person

`Person.script` covers people.

Common areas:

- Injury state
- Arrest state
- Person role
- Person type
- Equipment
- Carrying or linking patients
- Animations
- Behavior

### Vehicle

`Vehicle.script` covers vehicles.

Common areas:

- Passengers
- Transported persons
- Vehicle type and role
- Doors
- Sirens and lights
- Return to base
- Unload checks
- Landing and rope-drop checks
- Fire hose connector behavior

## Command Scripts

`Command.script` defines `CommandScript`, command groups, restrictions, targeting behavior, and movement checks.

A normal command usually uses:

- `CheckPossible`
- `CheckTarget`
- `PushActions`

Command scripts are best for player buttons.

## Mission Scripts

`Mission.script` defines `MissionScript`, mission states, mission time, scoring, objectives, results, and callbacks.

Mission scripts are best for:

- Timers
- Global state
- Callout schedulers
- Mission objectives
- Scenario progression
- Cutscenes and tutorials

## Game and Lists

`Game.script` exposes global functions such as:

- `CreateObject`
- `CreatePerson`
- `CreateVehicle`
- `ExecuteCommand`
- `FindFreePosition`
- `GetGameObjects`
- `GetGameObjectsWithPrefix`
- `CollectObstaclesOnVirtualObject`

`List.script` defines object list wrappers:

- `GameObjectList`
- `PersonList`
- `VehicleList`
- `FireObjectList`
- `OpenHouseList`
- `PathList`
- `SpawnPointList`

## UI, Audio, Camera, and Dialogs

`Interface.script` is used for player-facing UI features such as ticker text, vehicle browser behavior, tutorial instructions, and blinking order buttons.

`Audio.script` documents sound playback references.

`Camera.script` documents mission/tutorial camera control.

`XMLGui.script` documents game dialog support. It can be useful for advanced UI experiments, though freeplay custom UI can be difficult.

## Support Files

- `ActionInsertModes.script`: action queue modes.
- `EActions.script`: action callback results.
- `EquipmentNames.script`: equipment constants.
- `Vector.script`: 3D coordinate class.
- `Math.script`: math helpers.
- `Weather.script`: weather functions.
- `Path.script`: path actors.
- `Spawn.script`: spawn points.
- `ScriptSerializer.script`: saving and loading script references.
