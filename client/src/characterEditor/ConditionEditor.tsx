import { Condition, InteractionArg } from "./Interaction";
import { ConditionInfo, ArgInfo, ConditionInfoData } from "./ConditionInfo";
import conditionTypes from "./conditionTypes.json";

function ConditionArgEditor(
  arg: InteractionArg,
  argInfo: ArgInfo | undefined
) {
  return (
    <div className="Condition-Description">
      {
        argInfo? <p>{argInfo.argDescription}</p> : arg.argName
      }
      <input type="text" value={arg.value}/>
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

function ConditionEditor(condition: Condition) {

  const conditionInfoMap = constructConditionTypesMap(conditionTypes);

  const currentConditionInfo = conditionInfoMap.get(condition.conditionType);

  return (
    <div className="Condition-Item">
      <p>{currentConditionInfo? currentConditionInfo.conditionDescription : "(No description available)"}</p>
      {condition.args.map((arg: InteractionArg) => ConditionArgEditor(arg, currentConditionInfo? currentConditionInfo.args.get(arg.argName) : undefined))}
    </div>
  )
}

export default ConditionEditor;