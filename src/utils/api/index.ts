import instance from "./axios";
import { Auth } from "./resources/auth";
import { User } from "./resources/user";

export default class API {
  static setToken(token: string): void {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  static deleteToken(): void {
    delete instance.defaults.headers.common["Authorization"];
  }

  static auth = Auth;
  static user = User;
}
