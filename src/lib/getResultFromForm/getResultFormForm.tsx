import { FormInstance } from "antd";

const checkType = (
  key: string,
  value: any,
  scores: Record<string, FormResult>,
  split: string[]
) => {
  if (key.includes("real")) {
    scores[split[0]].WorksheetsModelInput = value as WorksheetsModelInput;
  } else if (key.includes("value")) {
    scores[split[0]].value = value as checkBoxSelect[];
  } else if (split[0] == key) {
    scores[split[0]].select = value as boolean;
  }
};

export const GetResultFromForm = (form: FormInstance<any>) => {
  let scores: Record<string, FormResult> = {};
  let formData = form.getFieldsValue();
  Object.entries(formData).forEach(([key, value]) => {
    let split = key.split("-");
    if (scores[split[0]] !== undefined) {
      checkType(key, value, scores, split);
    } else {
      scores[split[0]] = {
        key: split[0],
      };
      checkType(key, value, scores, split);
    }
  });
  return scores;
};
