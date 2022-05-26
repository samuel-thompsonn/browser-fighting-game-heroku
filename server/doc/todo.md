- Refactor "afterEnd" and "interrupt" modifiers on transitions to be object oriented
- Add reaction to damage and knockback when getting hit
- modify collision knockback effect and transition effect interface to
use a passed list of string args rather than magically knowing the names
properties to query in the collision entity.
  - cooler solution: build the names into the instance of the transition effect,
  since they are not expected to change over time.
- replace distinction between collisions and controls with a general interface
for transitions that have CONDITIONS and EFFECTS, just like in the 2D game
engine.
- make knockback strength of character affect knockback strength of
attacks
- make a generic factory to avoid code duplication between the existing
factories
  - Probably uses a parameterized class (so something with a < T > going on)
- fix the issue where "interrupt" and "afterEnd" can't be applied in
the effect for setting next state because next state doesn't know the
frame index. Communicate frame index all the way down to the factory for
effects.
- change interaction condition and interaction effect to not have to
re implement the constructor code for grabbing features from the given
parameter map. Instead make it an abstract class with access to methods
for grabbing info straight from the map. Then make things data driven
somehow? ehh maybe not.
- make it so that interaction effects can have their arguments interpreted
either as literals or as keys into the context (library) that is
handed to them.
- allow interchanging character files by having the character files
get sent in through a POST endpoint