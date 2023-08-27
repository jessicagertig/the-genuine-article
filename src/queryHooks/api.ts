import axios from "axios";
import { allKeysToSnake, allKeysToCamel } from "src/utils/structure";

const baseUrl: string | undefined = process.env.REACT_APP_API_URL;

type ReqParams = {
  method?: string;
  endpoint: string;
  variables?: any;
  contentType?: string;
  keysToSnake?: boolean;
};

// Retrieve the token from local storage
const checkForToken = localStorage.getItem("token");
console.log(checkForToken);

export async function apiGet<T>({ endpoint }: ReqParams): Promise<T> {
  const url = baseUrl + endpoint;
  console.log("URL", url);
  const token = localStorage.getItem("token");
  const { data } = await axios.get(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return allKeysToCamel(data);
}

// apiMutate used in apiPost and apiPut

async function apiMutate<T>({
  method,
  endpoint,
  variables,
  contentType = "application/json",
  keysToSnake = true,
}: ReqParams): Promise<T> {
  const url: string = baseUrl + endpoint;
  const token = localStorage.getItem("token");

  const { data } = await axios
    .request({
      method,
      url: url,
      headers: {
        Accept: contentType,
        "Content-Type": contentType,
        Authorization: `Bearer ${token}`,
      },
      data: keysToSnake ? allKeysToSnake(variables) : variables,
    })
    .catch(errorObject => {
      console.log("ERROR", errorObject);
      const { response } = errorObject;
      const responseData = response?.data
        ? allKeysToCamel(response.data)
        : null;
      const normalizedError = {
        ...response,
        data: responseData,
      };
      return Promise.reject(normalizedError);
    });

  return allKeysToCamel(data);
}

export async function apiPost<T>({
  endpoint,
  variables,
  contentType = "application/json",
  keysToSnake = true,
}: ReqParams): Promise<T> {
  return await apiMutate({
    method: "post",
    endpoint,
    variables,
    contentType,
    keysToSnake,
  });
}

export async function apiPut<T>({
  endpoint,
  variables,
  contentType = "application/json",
  keysToSnake = true,
}: ReqParams): Promise<T> {
  return await apiMutate({
    method: "put",
    endpoint,
    variables,
    contentType,
    keysToSnake,
  });
}

export async function apiDelete<T>({
  endpoint,
  variables,
}: ReqParams): Promise<T> {
  const url: string = baseUrl + endpoint;

  const { data } = await axios.request({
    method: "delete",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: allKeysToSnake(variables),
  });

  return allKeysToCamel(data);
}

/*
T is used as a type variable, also known as a generic type parameter. Generics are a way to provide type information to a function or a class so that it can work with different types of data while still providing type safety.

In our apiService, we use the generic type parameter T in the request, get, post, put, and deleteRequest functions to indicate that these functions can return data of any type, depending on how they are called.

When calling one of these functions, TypeScript will infer the type of T based on the context in which the function is called. For example, if you expect the get function to return an array of objects with a specific shape, you can use the type variable T to represent that specific shape:

interface User {
  id: number;
  name: string;
}

async function fetchUsers() {
  const users = await get<User[]>('/users');
  // Now, TypeScript knows that `users` is of type `User[]`
}
*/
