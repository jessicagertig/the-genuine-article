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
