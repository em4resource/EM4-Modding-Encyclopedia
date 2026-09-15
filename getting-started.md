# Getting Started With Emergency 4 Modding

This page is for a brand new modder who wants to install mods, open them in the editor, make safe changes, and understand what files matter.

## Installing a Mod

Emergency 4 mods are usually installed in one of two ways.

### ModInstaller Package

1. Open the Emergency 4 ModInstaller.
2. Select the mod package file.
3. Let the installer place it into the game's `Mods` folder.
4. Start the game.
5. Open `Modifications`.
6. Select the mod and wait for it to load.

### Manual Folder Install

1. Find the game's `Mods` folder.
2. Copy the complete mod folder into it.
3. Confirm the folder is not nested twice.
4. Start the game and load it from `Modifications`.

Bad nesting looks like this:

```text
Mods/MyMod/MyMod/Specs
```

Good nesting looks like this:

```text
Mods/MyMod/Specs
Mods/MyMod/Scripts
Mods/MyMod/Prototypes
```

## Loading a Mod in the Editor

1. Open the Emergency 4 editor.
2. Use `Modifications` to load the mod.
3. Wait until loading finishes.
4. Open the map or prototype you want to edit.
5. Save often.

The editor only edits the active loaded mod. If you forget to load the mod first, you may be looking at base-game files instead.

## The First Files to Learn

- `Scripts/Game/Command`: buttons and actions used by persons, vehicles, and objects.
- `Scripts/Game/Mission`: mission logic and freeplay startup logic.
- `Prototypes`: persons, vehicles, objects, equipment, and deployables.
- `Specs`: XML files that define unit lists, portraits, freeplay values, and other systems.
- `UI/Game/Icons/Commands`: command button icons.
- `UI/Game/Icons/Cursor`: command cursor icons.
- `Audio/FX`: sound effects and dispatch audio.

## First Safe Practice Edit

A safe first edit is adding an existing command to a copied prototype.

1. Duplicate a vehicle prototype.
2. Open it in the editor.
3. Add a known working command.
4. Save.
5. Test in freeplay.

If the command does not appear, check:

- The script loaded without errors.
- The command name matches exactly.
- The command's `CheckPossible` allows that caller.
- The vehicle has the required passengers or state.
- The icon and cursor files exist if the command uses custom UI.

## Reading logfile.txt

When the game crashes or a command disappears, check `logfile.txt`.

Common messages:

- `Could not load script`: the script failed to parse.
- `Symbol X is not defined`: a function, variable, or command name is being used out of scope.
- `Statement too long`: split the line into smaller variables.
- `cursor ... not found`: the cursor file is missing or misnamed.
- `already declared as different type`: a local variable name is being reused in a way EM4's parser dislikes.

## Recommended Backup Habit

Make backups constantly:

- Before editing a script.
- Before changing icons.
- Before renaming files.
- After a feature finally works.
- Before adding a second feature to a working script.

Emergency 4 is old and picky. Good backups are the difference between a ten-minute fix and losing an entire evening.
