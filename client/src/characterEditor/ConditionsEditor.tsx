import { Condition } from "./Interaction";
import ListSelect from "./ListSelect";
import { useState } from 'react';
import ConditionEditor from "./ConditionEditor";
import Typography from '@mui/material/Typography';

interface ConditionsEditorProps {
  conditions: Condition[];
  onChange: (newValue: Condition, index: number) => void;
}


function ConditionsEditor(props: ConditionsEditorProps) {

  const [selectedCondition, setSelectedCondition] = useState<number>(0);

  return (
    <div>
      <Typography variant="h4">Conditions</Typography>
      <ListSelect
        interactions={props.conditions.map((condition) => condition.conditionType)}
        value={selectedCondition}
        onChange={setSelectedCondition}
      />
      {
        props.conditions.length > 0 ?
        <ConditionEditor
          condition={props.conditions[selectedCondition]}
          onChange={(newValue: Condition) => props.onChange(newValue, selectedCondition)}
        /> : null
      }
    </div>
  )
}

export default ConditionsEditor;