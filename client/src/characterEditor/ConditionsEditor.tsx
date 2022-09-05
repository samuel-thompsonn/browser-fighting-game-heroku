import { Condition } from "./Interaction";
import ListSelect from "./ListSelect";
import { useState } from 'react';
import ConditionEditor from "./ConditionEditor";

interface ConditionsEditorProps {
  conditions: Condition[];
}


function ConditionsEditor(props: ConditionsEditorProps) {

  const [selectedCondition, setSelectedCondition] = useState<number>(0);

  return (
    <div>
      <h3>Conditions</h3>
      <ListSelect
        interactions={props.conditions.map((condition) => condition.conditionType)}
        value={selectedCondition}
        onChange={setSelectedCondition}
      />
      {
        props.conditions.length > 0 ?
        <ConditionEditor
          {...props.conditions[selectedCondition]}
        /> : null
      }
    </div>
  )
}

export default ConditionsEditor;