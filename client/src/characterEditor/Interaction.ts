export interface InteractionArg {
  argName: string;
  value: string;
};

export interface Condition {
  conditionType: string;
  args: InteractionArg[];
};

interface Interaction {
  name: string;
  id: string;
  priority: string;
  conditions: Condition[];
};

export default Interaction;
