import fileDownload from "js-file-download";
import { EmptyResponse, success } from "../logic";
import client from "src/utils/api/axios";
import { handleAxiosError } from "src/utils/helpers";

export type IGroupedTriples = {
  projectId: string;
  combinationNum: number;
  args1: {
    nouns: string;
    tr: string | null;
    sc: string | null;
  };
  verbs: {
    verbs: string;
    domain: string | null;
  };
  args2: {
    nouns: string;
    tr: string | null;
    sc: string | null;
  };
};

export type GroupedTriplesFileFormat = "tsv" | "csv" | "txt";

export class GroupedTriples {
  private static prefix = "/groupedTriples" as const;

  static getFile = async (params: {
    projectId: string;
    fileFormat: GroupedTriplesFileFormat;
    domainName: string;
  }): Promise<EmptyResponse> => {
    const { projectId, fileFormat, domainName } = params;
    try {
      const response = await client.get(
        `${this.prefix}/${projectId}/download?fileFormat=${fileFormat}`,
        { responseType: "blob" }
      );

      fileDownload(response.data, `${domainName}-grouped.${fileFormat}`);

      return success(null);
    } catch (error) {
      return handleAxiosError(error);
    }
  };
}
