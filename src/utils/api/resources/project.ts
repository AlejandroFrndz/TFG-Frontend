export enum ProjectLanguage {
  English = "English",
  Spanish = "Spanish",
  French = "French",
}

export type IProject = {
  id: string;
  owner: string;
  language: ProjectLanguage | null;
  domainName: string | null;
  isUsingSubdomains: boolean;
};
