import CharacterInternal from '../../CharacterInternal';
import InteractionEffect from './InteractionEffect';

function resolveArgument(
  effectArgs: Map<string, string>,
  argName: string,
  defaultValue: string | undefined = undefined,
): string {
  const argValue = effectArgs.get(argName);
  if (argValue) {
    return argValue;
  }
  if (defaultValue) {
    return defaultValue;
  }
  throw new Error(`NextStateEffect: Missing required parameter "${argName}".`);
}

export default class NextStateEffect implements InteractionEffect {
  #nextStateID: string;

  #resolutionType: string;

  constructor(effectArgs: Map<string, string>) {
    this.#nextStateID = resolveArgument(effectArgs, 'destination');
    this.#resolutionType = resolveArgument(effectArgs, 'resolutionType', 'afterEnd');
  }

  execute(targetCharacter: CharacterInternal): void {
    targetCharacter.setNextState(this.#nextStateID, this.#resolutionType);
  }
}
