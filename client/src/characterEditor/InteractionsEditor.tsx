import { useState } from 'react';
import Interaction, { Condition } from './Interaction';
import ListSelect from './ListSelect';

import './InteractionsEditor.css';
import InteractionEditor from './InteractionEditor';

interface InteractionsEditorProps {
  interactions: Interaction[];
  onChange: (newValue: Interaction, index: number) => void;
}

function InteractionsEditor(props: InteractionsEditorProps) {

  const [selectedInteractionIndex, setSelectedInteraction] = useState<number>(0);

  const selectedInteraction = props.interactions[selectedInteractionIndex];

  function handleInteractionChange(newValue: Interaction) {
    props.onChange({...selectedInteraction}, selectedInteractionIndex);
  }

  return (
  <div className="Interactions-Box">
    <h2>Interactions</h2>
    <div className="Interactions-Editor">
      <div className="Interactions-List">
        <ListSelect
          interactions={props.interactions.map((interaction) => interaction.name)}
          value={selectedInteractionIndex}
          onChange={setSelectedInteraction}
        />
      </div>
      <InteractionEditor
        interaction={selectedInteraction}
        onChange={handleInteractionChange}
      />
    </div>
  </div>
)
}        

export default InteractionsEditor;