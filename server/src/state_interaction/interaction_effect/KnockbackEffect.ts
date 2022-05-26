import CharacterInternal from '../../CharacterInternal';
import InteractionContext from '../interaction_data_library/InteractionLibrary';
import InteractionEffect from './InteractionEffect';

const DEFAULT_KNOCKBACK_STRENGTH = 20;

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

export default class KnockbackEffect implements InteractionEffect {
  #knockback: string;

  constructor(effectArgs: Map<string, string>) {
    this.#knockback = resolveArgument(effectArgs, 'knockback');
  }

  // eslint-disable-next-line class-methods-use-this
  execute(targetCharacter: CharacterInternal, interactionContext: InteractionContext): void {
    const knockbackString = interactionContext.getValue(this.#knockback);
    if (knockbackString) {
      const knockbackValue = parseFloat(knockbackString);
      targetCharacter.changePosition({
        x: DEFAULT_KNOCKBACK_STRENGTH * knockbackValue,
        y: 0,
      });
    }
  }
}
