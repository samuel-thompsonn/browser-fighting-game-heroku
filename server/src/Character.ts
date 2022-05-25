import {
  ControlsChange,
  Position,
  TransitionInfo,
} from './AnimationUtil';
import {
  AnimationState,
  FileCollisionItem,
  CharacterDimensions,
} from './CharacterFileInterface';
import { ResolvedCollisionEvent } from './CharacterDataInterfaces';
import CharacterListener from './CharacterListener';
import controlsLabels from './controls/ControlsLabels.json';
import { CollisionEvent } from './GameInterfaces';
import GameInternal from './GameInternal';
import CharacterInternal from './CharacterInternal';

const CHARACTER_SIZE = 64;

export default class Character implements CharacterInternal {
  #animationStates: Map<string, AnimationState>;

  #currentState: AnimationState;

  #listeners: CharacterListener[];

  #position: Position;

  #dimensions: CharacterDimensions;

  #movementSpeed: number;

  #knockbackStrength: number;

  #controlsMap: Map<string, boolean>;

  #characterID: string;

  #healthInfo: {
    health: number;
    maxHealth: number;
  };

  #currentCollision: ResolvedCollisionEvent| undefined;

  #nextStateID: string | undefined;

  #deltaPosition: Position;

  constructor(
    characterID: string,
    startPosition: Position,
    movementSpeed: number,
    knockbackStrength: number,
    maxHealth: number,
    animationStates: Map<string, AnimationState>,
    initialStateID: string,
  ) {
    this.#deltaPosition = {
      x: 0,
      y: 0,
    };
    this.#knockbackStrength = knockbackStrength;
    this.#nextStateID = undefined;
    this.#dimensions = {
      width: CHARACTER_SIZE,
      height: CHARACTER_SIZE,
    };
    this.#controlsMap = new Map<string, boolean>();
    this.#listeners = [];
    this.#characterID = characterID;
    this.#healthInfo = {
      health: maxHealth,
      maxHealth,
    };
    this.#position = startPosition;
    this.#movementSpeed = movementSpeed;
    this.#animationStates = animationStates;
    const initialState = this.#animationStates.get(initialStateID);
    if (!initialState) {
      throw new Error(`Initial state ${initialStateID} not found in states map!`);
    }
    this.#currentState = initialState;
  }

  getCharacterID(): string {
    return this.#characterID;
  }

  getPosition(): Position {
    return this.#position;
  }

  getDimensions(): CharacterDimensions {
    return this.#dimensions;
  }

  setPosition(newPosition: Position): void {
    this.#position = newPosition;
    this.#notifyListeners();
  }

  changePosition(deltaPosition: Position): void {
    this.#deltaPosition = {
      x: this.#deltaPosition.x + deltaPosition.x,
      y: this.#deltaPosition.y + deltaPosition.y,
    };
  }

  updateControls({ control, status }: ControlsChange): void {
    this.#controlsMap.set(control, status === 'pressed');
  }

  getCurrentHealth() {
    return this.#healthInfo.health;
  }

  setCurrentHealth(newHealth: number) {
    this.#healthInfo.health = newHealth;
  }

  #handlePendingCollision(): void {
    if (this.#currentCollision) {
      this.#consumeCollision(this.#currentCollision);
      this.#currentCollision = undefined;
    }
  }

  getKnockbackStrength() {
    return this.#knockbackStrength;
  }

  #consumeCollision(collision: ResolvedCollisionEvent): void {
    this.#currentState.transitions.collisions.forEach((collisionTransition) => {
      collisionTransition.handleCollision(collision, this);
    });
  }

  updateSelf(
    gameInterface: GameInternal,
    relevantInfo: TransitionInfo,
    elapsedSeconds: number,
  ): void {
    if (this.#currentState.effects) {
      if (this.#currentState.effects.move) {
        const movementAmount = this.#currentState.effects.move;
        this.changePosition({
          x: movementAmount.x * this.#movementSpeed * elapsedSeconds,
          y: movementAmount.y * this.#movementSpeed * elapsedSeconds,
        });
      }
    }
    gameInterface.moveCharacter(this, this.#deltaPosition);
    this.#deltaPosition = {
      x: 0,
      y: 0,
    };
    this.#nextStateID = this.#currentState.transitions.default;
    controlsLabels.forEach((controlID) => {
      if (this.#controlsMap.get(controlID) === true) {
        const controlTransitions = this.#currentState.transitions.controls;
        const destination = controlTransitions.get(controlID);
        if (destination) {
          this.#nextStateID = destination;
        }
      }
    });
    this.#handlePendingCollision();
    if (!this.#nextStateID) { return; }
    this.#setState(this.#nextStateID);
  }

  subscribe(listener: CharacterListener) {
    this.#listeners.push(listener);
    this.#notifyListener(listener);
  }

  setNextState(stateID: string) {
    this.#nextStateID = stateID;
  }

  #setState(newStateID:string) {
    const nextState = this.#animationStates.get(newStateID);
    if (!nextState) { return; }
    this.#currentState = nextState;
    this.#notifyListeners();
  }

  getCollisionData() {
    return this.#currentState.collisions;
  }

  #identifyEntities(collisionEvent:CollisionEvent) {
    let selfEntity = collisionEvent.firstEntity;
    let otherEntity = collisionEvent.secondEntity;
    if (collisionEvent.secondEntity.characterID === this.#characterID) {
      selfEntity = collisionEvent.secondEntity;
      otherEntity = collisionEvent.firstEntity;
    }
    return {
      selfEntity,
      otherEntity,
    };
  }

  registerCollision(collisionEvent:CollisionEvent): void {
    const { selfEntity, otherEntity } = this.#identifyEntities(collisionEvent);
    this.#currentCollision = {
      selfEntity: {
        type: selfEntity.collisionEntity.getEntityType(),
        entity: selfEntity.collisionEntity,
      },
      otherEntity: {
        type: otherEntity.collisionEntity.getEntityType(),
        entity: otherEntity.collisionEntity,
      },
    };
  }

  /**
   * Notifies all listeners of the up-to-date current state
   */
  #notifyListeners(): void {
    this.#listeners.forEach((listener) => this.#notifyListener(listener));
  }

  #serializeCollisions(): FileCollisionItem[] {
    const serializedCollisions:FileCollisionItem[] = [];
    this.#currentState.collisions?.forEach((collisionEntity) => {
      serializedCollisions.push(collisionEntity.getJSONSerialized());
    });
    return serializedCollisions;
  }

  /**
   * Notifies a listener of the current state
   * @param listener The listener to notify of the current state
   */
  #notifyListener(listener: CharacterListener): void {
    // TODO: Turn the collision entities back into something that is JSON
    // serializeable. Or make a serializer either inside the CollisionEntity
    // class or without. Probably inside right?
    listener.handleCharacterUpdate({
      characterID: this.#characterID,
      animationState: this.#currentState,
      position: this.getPosition(),
      healthInfo: this.#healthInfo,
      collisionInfo: this.#serializeCollisions(),
    });
  }
}
