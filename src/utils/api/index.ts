import instance from "src/utils/api/axios";
import { Auth } from "src/utils/api/resources/auth";
import { User } from "src/utils/api/resources/user";

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
