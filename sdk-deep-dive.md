# Emergency 4 SDK Deep Dive

The SDK is the practical script API map for Emergency 4. This guide explains how to use the files rather than only listing them.

## How to Read the SDK

The SDK files are declarations. They show what scripts can call, which parameters functions expect, what enums exist, and which classes inherit from other classes.

Use the SDK like this:

- Check the exact function name.
- Check the parameter types.
- Check whether the method belongs to `GameObject`, `Person`, `Vehicle`, `Game`, `Mission`, or `ScriptInterface`.
- Check whether an enum already exists for the behavior you need.

## GameObject

`GameObject` is the main workhorse. Persons and vehicles inherit from it.

Common areas:

- Commands
- Position and rotation
- Equipment
- Flags
- Fire state
- Particles
- Physics
- Children
- Lights
- Triggers and virtual objects
- Action queues

Important functions:

```cpp
AssignCommand()
RemoveCommand()
HasCommand()
SetCommandable()
SetPosition()
GetPosition()
SetRotation()
SetEquipment()
RemoveEquipment()
IsFlagSet()
SetFlag()
ClearFlag()
Burn()
StopBurning()
EnableBlueLights()
EnableSpecialLights()
PushActionMove()
PushActionWait()
PushActionExecuteCommand()
```

## Action Queues

Most EM4 behavior is an action queue.

Use:

- `ACTION_NEWLIST` to start a new queue.
- `ACTION_APPEND` to add after the current queue.
- `PushActionExecuteCommand` to call a dummy command after movement or waiting finishes.

Example:

```cpp
p.PushActionMove(ACTION_NEWLIST, TargetPos);
p.PushActionTurnTo(ACTION_APPEND, Target);
p.PushActionWait(ACTION_APPEND, 2.5f);
p.PushActionExecuteCommand(ACTION_APPEND, "DummyNextStep", Target, 0, false);
```

## Person

`Person` controls people.

Important areas:

- Health and life
- Injured, comatose, dead states
- Arrest state
- Contamination
- Person role
- Person type
- Behavior
- Dogs
- Equipment visuals

Useful functions:

```cpp
GetLife()
SetLife()
Heal()
Injure()
Kill()
Revive()
IsInjured()
IsComatose()
IsDead()
Arrested()
IsArrested()
SetBehaviour()
SetFleeing()
PlaceObjectInRightHand()
RemoveObjectInRightHand()
SetBloodPuddle()
```

## Vehicle

`Vehicle` controls vehicles.

Important areas:

- Passengers
- Transported persons
- Vehicle type
- Doors
- Damage
- Hose connectors
- Siren file
- Vehicle category checks

Useful functions:

```cpp
GetPassengers()
AddPassenger()
RemovePassenger()
GetFreePassengers()
GetTransports()
AddTransport()
RemoveTransport()
GetFreeTransports()
GetVehicleType()
SetVehicleRole()
PlayAnimOpenDoor()
PlayAnimCloseDoor()
IsConnectorFree()
GetUsedConnectorPosition()
SetSirenFile()
```

## Game

`Game` is the global toolbox.

Useful functions:

```cpp
CreateObject()
CreatePerson()
CreateVehicle()
RemoveGameObject()
GetGameObjects()
GetGameObjectsWithPrefix()
ExecuteCommand()
CollectObstaclesOnVirtualObject()
IsSquadInVirtualObject()
IsCivilianInVirtualObject()
IsBurningObjectInVirtualObject()
FindFreePosition()
FindAvailablePosition()
GetTime()
SetTime()
IsFreeplay()
IsMission()
```

## Mission

`Mission` controls scenario logic.

Useful functions:

```cpp
AddObjective()
SetObjectiveAccomplished()
AllObjectivesAccomplished()
StartSingleTimer()
StartIntervalTimer()
StopTimer()
GetCounter()
IncCounter()
SetCounter()
PlayHint()
ShowMessageTickerText()
PlayComment()
StartCutScene()
EndCutScene()
```

## ScriptInterface

`ScriptInterface` controls the user interface.

Useful functions:

```cpp
ShowMessageTickerTextForAll()
ShowMessageTickerTextForSinglePlayer()
BlinkPopupMenuCommand()
SetCurrentCommand()
ShowVehicleBrowser()
HideVehicleBrowser()
ShowRadar()
HideRadar()
SetRadarTexture()
```

## Common Roleplay Patterns

### Traffic Stop

Use vehicle lights, vehicle passenger/transport checks, action queues, ticker updates, and dummy commands to store stop state.

### Advanced Custody

Use arrested person state, transport slots, dummy commands for charge markers, station/court/jail VOs, and delayed dummy commands.

### Homicide Callout

Use spawned persons, blood puddle state, detective commands, timers, objectives, and staged suspect logic.

### Fire Alarm Panel

Use object commands, special lights, burning-object checks in VOs, and separate acknowledge/silence commands.

### Deployable Equipment

Use object or vehicle creation, free-position checks, rotate/remove commands, and equipment flags.
