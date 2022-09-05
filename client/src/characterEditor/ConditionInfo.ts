export interface ConditionInfo {
  conditionType: string;
  conditionDescription: string;
  args: Map<String, ArgInfo>;
}

export interface ArgInfo {
  argName: string;
  argDescription: string;
}

export interface ConditionInfoData {
  conditionType: string;
  conditionDescription: string;
  args: ArgInfo[];
}
