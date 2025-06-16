import { request } from "./api";

export async function getUsers() {
  return request("get", "/users");
}

export async function getUserById(id: string) {
  return request("get", `/users/${id}`);
}

export async function createUser(data: { firstName: string; lastName: string; email: string; role: string; isActive?: boolean }) {
  return request("post", "/users", data);
}

export async function updateUser(id: string, data: { firstName?: string; lastName?: string; email?: string; role?: string; isActive?: boolean }) {
  return request("put", `/users/${id}`, data);
}

export async function deleteUser(id: string) {
  return request("delete", `/users/${id}`);
}