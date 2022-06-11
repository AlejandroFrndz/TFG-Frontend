import { IError } from "../logic/errors/IError";
import { FailureOrSuccess, success } from "../logic/FailureOrSuccess";
import client from "src/utils/api/axios";
import { handleAxiosError } from "src/utils/helpers";

export type ITriple = {
  id: string;
  project: string;
  fileId: number;
  noun1: {
    noun: string;
    tr: string | null;
    sc: string | null;
  };
  verb: {
    verb: string;
    domain: string | null;
  };
  noun2: {
    noun: string;
    tr: string | null;
    sc: string | null;
  };
  frame: string | null;
  problem: string | null;
  examples: string;
  pos: string | null;
  corpus: number;
  occurs: string;
  sources: string;
  pmiCorpus: number;
  diceCorpus: number;
  tCorpus: number;
};

export type ITripleNoun = {
  noun: string;
  tr: string | null;
  sc: string | null;
};

export type ITripleVerb = {
  verb: string;
  domain: string | null;
};

type AxiosTriplesResponse = {
  triples: ITriple[];
};
type AxiosTripleResponse = {
  triple: ITriple;
};

type TriplesResponse = FailureOrSuccess<IError, ITriple[]>;
type TripleResponse = FailureOrSuccess<IError, ITriple>;

type UpdateTripleRequest = Pick<
  ITriple,
  "id" | "noun1" | "verb" | "noun2" | "problem" | "project"
>;

export class Triple {
  private static prefix = "/triple" as const;

  static getAllForProject = async (
    projectId: string
  ): Promise<TriplesResponse> => {
    try {
      const response = await client.get<AxiosTriplesResponse>(
        `${this.prefix}/project/${projectId}`
      );

      return success(response.data.triples);
    } catch (error) {
      return handleAxiosError(error);
    }
  };

  static update = async (
    request: UpdateTripleRequest
  ): Promise<TripleResponse> => {
    try {
      const response = await client.patch<AxiosTripleResponse>(
        `${this.prefix}/${request.id}`,
        request
      );

      return success(response.data.triple);
    } catch (error) {
      return handleAxiosError(error);
    }
  };
}
