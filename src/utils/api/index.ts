import { Auth } from "./resources/auth";
import { User } from "./resources/user";

export default class API {
  static auth = Auth;
  static user = User;
}
