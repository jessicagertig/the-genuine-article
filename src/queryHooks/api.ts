import axios from "axios";
import { allKeysToSnake, allKeysToCamel } from "src/utils/structure";

const baseUrl: string = "http://localhost:4000";

type ReqParams = {
  method?: string;
  endpoint: string;
  variables?: any;
  keysToSnake?: boolean;
};

export async function apiGet<T>({ endpoint }: ReqParams): Promise<T> {
  const url = baseUrl + endpoint;

  const { data } = await axios.get(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return allKeysToCamel(data);
}

// apiMutate used in apiPost and apiPut

async function apiMutate<T>({ method, endpoint, variables, keysToSnake = true }: ReqParams): Promise<T> {
  const url = baseUrl + endpoint;

  const { data } = await axios
    .request({
      method,
      url: url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // "X-CSRF-Token":
      },
      data: keysToSnake ? allKeysToSnake(variables) : variables,
    })
    .catch(errorObject => {
      const { response } = errorObject;
      const responseData = allKeysToCamel(response.data);
      const normalizedError = {
        ...response,
        data: responseData,
      };
      return Promise.reject(normalizedError);
    });

  return allKeysToCamel(data);
}

export async function apiPost<T>({ endpoint, variables, keysToSnake = true }: ReqParams): Promise<T> {
  const url: string = baseUrl + endpoint;

  return await apiMutate({ method: "post", endpoint: url, variables, keysToSnake });
}

export async function apiPut<T>({ endpoint, variables, keysToSnake = true }: ReqParams): Promise<T> {
  const url: string = baseUrl + endpoint;

  return await apiMutate({ method: "put", endpoint: url, variables, keysToSnake });
}

export async function apiDelete<T>({ endpoint, variables }: ReqParams): Promise<T> {
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
