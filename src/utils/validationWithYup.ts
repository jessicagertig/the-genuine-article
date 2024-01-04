import * as Yup from "yup";
import { camelToHumanReadable } from "src/utils/helpers";
// possible to do: use createStringRule for logInSchema
const createStringRule = (
  fieldName: string,
  type = "default"
) => {
  const name = camelToHumanReadable(fieldName);
  let rule = Yup.string()
    .required(`${name} is required`)
    .test(fieldName, `${name} is invalid`, (value, context) => {
      if (value) {
        return true;
      } else {
        return context.createError({ path: fieldName });
      }
    });

  switch (type) {
    case "email":
      rule = rule.email("Please enter a valid email");
      break;
    case "url":
      rule = rule.url("Please enter a valid URL");
      break;
    default:
      break;
  }

  return rule;
};

/* Login Schema & Validation Function
__________________________________________ */
export const logInSchema = Yup.object()
  .shape({
    email: createStringRule("email", "email"),
    password: createStringRule("password"),
  })
  .noUnknown();

export type LogInValues = Yup.InferType<typeof logInSchema>;

export type LoginField = { key: keyof LogInValues; value: string };

export const validateLoginField = async (
  field: LoginField
): Promise<string> => {
  let errorMessage = "";
  try {
    await (logInSchema.fields[field.key] as Yup.StringSchema).validate(
      field.value
    );
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      console.log(`${field.key} Error`, { error });
      errorMessage = error.message;
    }
  }
  return errorMessage;
};

/* Url Schema & Validation Function
__________________________________________ */
const urlOnlySchema = Yup.object().shape({
  url: Yup.string().url("Please enter a valid URL").required("URL is required"),
});

export const validateUrl = async (url: string): Promise<string> => {
  let errorMessage = "";
  try {
    await urlOnlySchema.validate({ url: url });
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      console.log(`Url Validation Error`, { error });
      errorMessage = error.message;
    }
  }
  return errorMessage;
};

/* Garment Schema & Validation Function
__________________________________________ */

const garmentSchema = Yup.object()
  .shape({
    garmentTitle: createStringRule("garmentTitle"),
    beginYear: createStringRule("beginYear"),
    cultureCountry: createStringRule("cultureCountry"),
    collection: createStringRule("collection"),
    collectionUrl: createStringRule("collectionUrl", "url"),
    itemCollectionNo: createStringRule("itemCollectionNo"),
  })
  .noUnknown();

export type GarmentValues = Yup.InferType<typeof garmentSchema>;

export type GarmentField = { key: keyof GarmentValues; value: string };

export const validateGarmentField = async (
  field: GarmentField
): Promise<string> => {
  let errorMessage = "";
  try {
    await (garmentSchema.fields[field.key] as Yup.StringSchema).validate(
      field.value
    );
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      console.log(`${field.key} Error`, { error });
      errorMessage = error.message;
    }
  }
  return errorMessage;
};
