# Emergency 4 Base Game Folder Reference

This reference explains the major folders inside the base game `Data` directory and how a mod usually mirrors them.

The base game folder scan used for this starter encyclopedia found these major folders:

| Folder | What It Usually Controls |
| --- | --- |
| `Audio` | Sound effects, sirens, dispatch audio, screams, music, UI clicks, and ambient sounds. |
| `basedata` | Lower-level engine/game data. Modders usually do not start here. |
| `Emitters` | Particle effects such as fire, smoke, water, sparks, foam, contamination, and explosions. |
| `Fonts` | Bitmap fonts and font definitions used by UI XML. |
| `Lang` | Language text, UI strings, mission text, help text, and translated labels. |
| `Maps` | Map files, paths, spawn points, exits, virtual objects, placed objects, and fire objects. |
| `Models` | Visual geometry and texture references. |
| `Prototypes` | Gameplay objects: vehicles, persons, equipment, buildings, deployables, traits, lights, doors, and commands. |
| `Save` | Save-related base files. |
| `Scripts` | Command scripts, mission scripts, editor scripts, and startup scripts. |
| `Specs` | XML configuration for vehicles, portraits, materials, freeplay, campaign, controls, and other systems. |
| `Textures` | Shared textures for terrain, objects, effects, and maps. |
| `UI` | Interface XML, menus, command icons, cursor icons, minimap markers, and button graphics. |
| `Units` | Unit browser files, equipment entries, buy-menu icons, big images, portraits, and `unit.xml` files. |
| `Video` | Menu and campaign videos. |

## How Mod Overriding Works Conceptually

Emergency 4 mods often mirror the base game directory structure. A mod file in the same relative location can replace or supplement base behavior depending on the file type and system.

For example:

```text
Data/Scripts/Game/Command/entercar.script
Mods/MyMod/Scripts/Game/Command/entercar.script
```

The mod script is the one you expect to affect gameplay while the mod is loaded. This is why script names matter. If you rename a base command script into a custom name, the base game command may still exist separately unless the prototype has been changed to use the new command.

## Folder Relationships

Most EM4 systems are not controlled by one file.

### A Vehicle

A working vehicle can involve:

- `Prototypes`: the vehicle prototype.
- `Models`: the model and textures.
- `Units`: buy menu and unit browser presentation.
- `Specs`: vehicle and portrait metadata.
- `Scripts`: commands assigned to the vehicle.
- `UI`: command icons and cursors.
- `Audio`: sirens, horns, dispatch, or special effects.

### A Custom Callout

A custom callout can involve:

- `Scripts/Game/Mission`: timer, state machine, and event startup.
- `Scripts/Game/Command`: investigation, control panel, or unit interaction commands.
- `Prototypes`: victims, suspects, objects, panels, markers, hazards.
- `Maps`: virtual objects, paths, spawn areas, exits, fire objects.
- `Audio`: dispatch and radio updates.
- `UI`: command icons and cursors.

### A Deployable Object

A deployable object can involve:

- A person command to place it.
- An object or vehicle prototype for the deployed item.
- Rotate/remove commands on the deployed item.
- Equipment retrieval commands if it acts like a tool cache.
- Icon and cursor DDS files.

## Important Lesson

If something does not work, identify which layer is failing:

- It does not appear: prototype command assignment, command visibility, or icon file.
- It appears but cannot be clicked: `CheckPossible`, `CheckTarget`, restrictions, or target type.
- It clicks but nothing happens: `PushActions`, action queue, missing dummy command, or invalid target.
- It crashes on load: parser error, missing symbol, bad DDS/TGA, or broken XML.
- It crashes during action: invalid object use, bad action chain, deleted object, missing prototype, or a command state conflict.
