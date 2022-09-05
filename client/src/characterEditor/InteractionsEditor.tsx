import { useState } from 'react';
import ConditionEditor from './ConditionEditor';
import Interaction, { Condition } from './Interaction';
import ListSelect from './ListSelect';

import './InteractionsEditor.css';
import ConditionsEditor from './ConditionsEditor';

interface InteractionsEditorProps {
  interactions: Interaction[];
}

function InteractionsEditor(props: InteractionsEditorProps) {

  const [selectedInteractionIndex, setSelectedInteraction] = useState<number>(0);

  const selectedInteraction = props.interactions[selectedInteractionIndex];

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
      <div className="Condition-Effect-Editors">
        <ConditionsEditor
          conditions={props.interactions[selectedInteractionIndex].conditions}
        />
        <div className="Effects-List">
          <h3>Effects</h3>
          <select name="effects">
            <option value="effect1">SetNextState</option>
          </select>
          <div className="Effect-Description">
            <p>Destination state:</p>
            <input type="text" value="idleLeft"/>
            <p>Transition type:</p>
            <input type="text" value="interrupt"/>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}        

export default InteractionsEditor;