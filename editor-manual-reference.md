# Emergency 4 Editor Manual Reference

This reference summarizes practical lessons from the official `Editor Manual.pdf`.

## Creating a New Mod

The editor can create a new mod through the `Modifications` menu. After naming it, the new mod appears under the game's `Mods` directory. Load the mod through the same menu before editing.

Important rule: always confirm that the intended mod is loaded before changing maps or prototypes.

## Editing V3O Model Files

Emergency 4 model files use `.v3o`.

The editor manual explains that models are normally binary. Use:

- `Modifications > unpack file` to convert a V3O into editable ASCII.
- `Modifications > pack file` to convert it back.

These operations overwrite the file while keeping the same name, so make backups first.

## Terrain

Terrain editing is accessed with `Edit / Terrain` or `F2`.

Custom terrain texture rules from the manual:

- Width and height should be multiples of 512 pixels.
- Texture should be 24-bit TGA.
- The maximum terrain texture size is roughly 8192 by 8192 pixels.
- Scale is about 12.5 pixels per meter.

Terrain height can be edited with brushes or a black-and-white height map. Masks can protect areas or restrict editing to selected regions.

## Scene Mode

Scene mode is `F1`.

This is where you place objects and edit prototype or instance settings.

Controls:

- Left mouse: select, place, or move.
- `Alt` plus left mouse: move on the Z axis.
- Right mouse: rotate around local Z.
- `Shift` or `Ctrl` plus right mouse: rotate around world X or Y.
- `Pause`: free-fly camera.
- `Ctrl+C` and `Ctrl+V`: copy and paste objects in Scene mode.

## Prototypes and Instances

Prototypes define shared properties for objects, vehicles, persons, and houses.

Instance properties affect only the selected placed object and are saved into the map.

Best practice: clone a prototype before editing it heavily.

## Physics, Children, Fire Objects, and Lights

- Physics controls collision and routefinder geometry.
- Children attach additional objects to a prototype.
- Fire objects define burnable areas, burn marks, fire effects, and fire radiation.
- Lights define prototype lighting and can often be toggled per placed instance.

## Paths, Streets, and Spawn Points

- Paths (`F7`) guide civilians and civilian vehicles.
- Streets (`Shift+F7`) are needed for emergency vehicle routefinding.
- Spawn points (`F9`) place persons or cars onto paths at intervals.

Paths can be forward, backward, loop, or ping-pong. Vehicles and persons use the right side of the path or street, shown by the blue line.

## Map Properties

Map properties (`Shift+F9`) include:

- Light and weather effects.
- Camera start position.
- Entry and exit points for land, air, and water vehicles.
- Level boundaries.
- Travel map roads.
- Mission scoring table and budget.
- Camera positions for cutscenes.

## Water and Virtual Objects

Liquid mode is `F4`.

Virtual objects are `F5`. They define areas for accessibility and terrain behavior. They can overlap, but blocked terrain has priority.

In practical modding, virtual objects are also used for:

- Fire station parking spots.
- Turn-to points.
- Callout locations.
- Search areas.
- Alarm zones.
- Control panels.
- Spawn staging.

## Waiting Points, Triggers, Ambient Sounds, and Burning Objects

- Waiting points (`Shift+F3`) are used by civilians on paths.
- Triggers (`F3`) are script-controlled event areas.
- Ambient polygons (`Shift+F5`) define local background sounds.
- Additional burning objects (`F6`) can shape fire spread on a map.

## Mission Conditions

Mission conditions can track objects, persons, civilians, emergency resources, drowning persons, gangsters, animals, vehicles, houses, burning objects, dead persons, injured persons, contaminated persons, and casualty counts.

## Materials

Materials control fire behavior.

Important material values:

- Combustion
- Burn time
- Maximum temperature
- Charge time
- Cooling
- Resistance
- Blast force
- Blast radius
- Explode/burn behavior

Burnable objects need assigned material behavior.

## Loading, Saving, and Radar Maps

Map-specific data is stored in an `.e4m` file. The map file references the floor texture.

Radar maps are produced through a separate screenshot and image-processing workflow, then saved as DDS.
