import { DatabaseEnum } from "../../types";
import { IDatabaseSnippet } from "./IDatabaseSnippet";
import { MongoSnippet } from "./MongoSnippet";
import { PostgresSnippet } from "./PostgresSnippet";

export const DatabaseRegistry = new Map<string, IDatabaseSnippet>([
  [DatabaseEnum.MONGODB, MongoSnippet],
  [DatabaseEnum.POSTGRES, PostgresSnippet],
]);
