import { client } from "./axiosClient";


export function signup({ username, email, password }: { username:string, email:string, password:string }) {
  return client.post(
    "/auth/signup",
    { username, email, password },
    { headers: { authorization: false } }
  );
}

export function login({ username, password } : {username:string, password:string}) {
    return client.post(
      "auth/login",
      { username, password },
      { headers: { authorization: false }}
    );
  }

export function getProfile() {
  return client.get("/users/profile");
}
