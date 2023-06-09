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
    body: JSON.stringify(body);
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function put<T>(endpoint: string, body: object): Promise<T> {
  const url = baseurl + endpoint;
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