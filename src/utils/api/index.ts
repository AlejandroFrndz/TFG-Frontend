import instance from "src/utils/api/axios";
import { Auth } from "src/utils/api/resources/auth";
import { User } from "src/utils/api/resources/user";
import { Folder } from "src/utils/api/resources/folder";
import { File } from "src/utils/api/resources/file";
import { Project } from "src/utils/api/resources/project";
import { Search } from "./resources/search";
import { Triple } from "./resources/triple";
import { Tags } from "./resources/tags";
import { GroupedTriples } from "./resources/groupedTriples";

export default class API {
  static setToken(token: string): void {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  static deleteToken(): void {
    delete instance.defaults.headers.common["Authorization"];
  }

  static auth = Auth;
  static user = User;
  static folder = Folder;
  static file = File;
  static project = Project;
  static search = Search;
  static triple = Triple;
  static tags = Tags;
  static groupedTriples = GroupedTriples;
}
