import { Condition, InteractionArg } from "./Interaction";
import { ConditionInfo, ArgInfo, ConditionInfoData } from "./InteractionEditorInfo";
import conditionTypes from "./conditionTypes.json";
import { ChangeEvent } from "react";

function ConditionArgEditor(
  arg: InteractionArg,
  argInfo: ArgInfo | undefined,
  onChange: (newValue: InteractionArg) => void
) {

  function handleNewArgValue(newArgValue: string) {
    onChange({
      argName: arg.argName,
      value: newArgValue
    });
  }

  return (
    <div className="Condition-Description">
      {
        argInfo? <p>{argInfo.argDescription}</p> : arg.argName
      }
      <input type="text" value={arg.value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleNewArgValue(event.target.value)}
      />
    </div>
  )
}

function constructArgInfoMap(argInfoList: ArgInfo[]): Map<String, ArgInfo> {
  const argInfoMap = new Map<String, ArgInfo>();
  argInfoList.forEach((argInfo: ArgInfo) => {
    argInfoMap.set(argInfo.argName, argInfo);
  });
  return argInfoMap;
}

function loadConditionInfo(conditionInfoData: ConditionInfoData): ConditionInfo {
  return {
    ...conditionInfoData,
    args: constructArgInfoMap(conditionInfoData.args)
  }
}

function constructConditionTypesMap(conditionInfos: ConditionInfoData[]): Map<String, ConditionInfo> {
  const conditionTypeMap = new Map<String, ConditionInfo>();
  conditionInfos.forEach(
    (conditionInfo) => conditionTypeMap.set(conditionInfo.conditionType, loadConditionInfo(conditionInfo))
  );
  return conditionTypeMap;
}

interface ConditionEditorProps {
  condition: Condition;
  onChange: (newValue: Condition) => void;
};

function ConditionEditor(props: ConditionEditorProps) {

  const conditionInfoMap = constructConditionTypesMap(conditionTypes);

  const currentConditionInfo = conditionInfoMap.get(props.condition.conditionType);

  function handleNewConditionArg(newValue: InteractionArg, index: number) {
    props.condition.args[index] = newValue;
    props.onChange(props.condition);
  }

  return (
    <div className="Condition-Item">
      <p>{currentConditionInfo? currentConditionInfo.conditionDescription : "(No description available)"}</p>
      {
        props.condition.args.map((arg: InteractionArg, index: number) => (
            ConditionArgEditor(
              arg,
              currentConditionInfo? currentConditionInfo.args.get(arg.argName) : undefined,
              (newValue: InteractionArg) => handleNewConditionArg(newValue, index)
            )
          )
        )
      }
    </div>
  )
}

export default ConditionEditor;