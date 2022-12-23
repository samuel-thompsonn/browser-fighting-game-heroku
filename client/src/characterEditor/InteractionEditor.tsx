import Interaction, { Condition, Effect } from './Interaction';
import ConditionsEditor from './ConditionsEditor';
import EffectsEditor from './EffectsEditor';
import { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';

import './InteractionEditor.css';

interface InteractionEditorProps {
  interaction: Interaction;
  onChange: (newValue: Interaction) => void;
}

function InteractionEditor(props: InteractionEditorProps) {

  function handleConditionChange(newValue: Condition, index: number) {
    props.interaction.conditions[index] = newValue;
    props.onChange({...props.interaction});
  }

  function handleEffectChange(newValue: Effect, index: number) {
    props.interaction.effects[index] = newValue;
    props.onChange({...props.interaction});
  }

  function handleNameChange(newValue: string) {
    props.interaction.name = newValue;
    props.onChange({...props.interaction});
  }

  return (
    <div className="Condition-Effect-Editors">
      <TextField
        variant="outlined"
        value={props.interaction.name}
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleNameChange(event.target.value)}
      />
      <ConditionsEditor
        conditions={props.interaction.conditions}
        onChange={handleConditionChange}
      />
      <EffectsEditor
        effects={props.interaction.effects}
        onChange={handleEffectChange}
      />
    </div>
  );
}

export default InteractionEditor;
