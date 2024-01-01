import * as Yup from "yup";

export const logInSchema = Yup.object()
  .shape({
    email: Yup.string()
      .email("Must be a valid email")
      .required("Email is required")
      .test("email", "${path} is invalid", (value, context) => {
        if (value) {
          return true;
        } else {
          return context.createError({ path: "email" });
        }
      }),
    password: Yup.string()
      .required("Password is required")
      .test("password", "${path} is invalid", (value, context) => {
        if (value) {
          return true;
        } else {
          return context.createError({ path: "password" });
        }
      }),
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


