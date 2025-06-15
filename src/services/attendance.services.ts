import { request } from "./api";

export async function getAttendance() {
  return request("get", "/attendance");
}

export async function getAttendanceById(id: string) {
  return request("get", `/attendance/${id}`);
}

export async function getAttendanceUser(id_user?: string) {
  if (id_user) {
    return request("get", `/attendance/user/${id_user}`);
  }
  return request("get", "/attendance/user");
}

export async function getAttendanceUserHoy(id_user?: string) {
  if (id_user) {
    return request("get", `/attendance/user/${id_user}/today`);
  }
  return request("get", "/attendance/user/today");
}

export async function marcarEntrada() {
  return request("post", "/attendance/entry");
}

export async function marcarSalida() {
  return request("post", "/attendance/exit");
}

export async function getUserPresentes() {
  return request("get", "/attendance/user/present");
}