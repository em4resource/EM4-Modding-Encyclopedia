# Emergency 4 Mod Creation Workflow

This guide explains how the major pieces of an EM4 mod fit together.

## Start With a Clean Mod Folder

Do not edit the base game directly. Create or install a mod folder under `Mods`, then mirror only the folders you need.

Common mod folders:

```text
Audio
Models
Prototypes
Scripts
Specs
UI
Units
Maps
```

## Add a Vehicle

A vehicle usually needs:

- Model and texture files.
- A vehicle prototype.
- Commands assigned in the prototype editor.
- Lights and doors configured in the editor.
- A unit browser entry if it should be buyable.
- Icons and cursors for custom commands.
- Scripts for special behavior.

## Add a Person

A person usually needs:

- Model and texture files.
- A person prototype.
- Correct person type and role.
- Commands assigned in the editor.
- Equipment compatibility.
- Vehicle enter/exit testing.

## Add a Deployable

A deployable usually needs:

- A deployed object or vehicle prototype.
- A person command that places it.
- Optional rotate/remove commands.
- Optional light commands.
- Optional equipment retrieval commands.
- Icon and cursor files.

## Add a Custom Callout

A custom callout usually needs:

- A mission/freeplay script to manage timers and state.
- Virtual objects or spawn logic.
- Spawned persons, vehicles, hazards, or objects.
- Audio dispatch.
- Ticker and on-screen notifications.
- Investigation or cleanup commands.
- Mission completion and cleanup logic.

## Testing Order

1. Confirm the mod loads.
2. Confirm icons are not white boxes.
3. Confirm commands appear.
4. Confirm commands can target the correct object.
5. Confirm the action starts.
6. Confirm the action completes.
7. Confirm normal commands are restored afterward.
8. Confirm cleanup happens.

If something fails, test the newest changed file first.
