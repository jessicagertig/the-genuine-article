import 'isomorphic-fetch';
import * as e6p from 'es6-promise';
(e6p as any).polyfill();

const baseUrl: string = 'http://localhost:4000/';

async function request<T>(url: string, options: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const data = await response.json()
  return data as T;
}

export async function get<T>(endpoint: string): Promise<T> {
  const url = baseUrl + endpoint;
  return request<T>(url, { method: 'GET' });
}

export async function post<T>(endpoint: string, body: object): Promise<T> {
  const url = baseUrl + endpoint;
  return request<T>(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function put<T>(endpoint: string, body: object): Promise<T> {
  const url = baseUrl + endpoint;
  return request<T>(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function deleteRequest<T>(endpoint: string): Promise<T> {
  const url = baseUrl + endpoint;
  return request<T>(url, { method: 'DELETE' });
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