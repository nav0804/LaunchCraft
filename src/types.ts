export interface StackProfile {
  language:
    | languageEnum.NODE
    | languageEnum.JAVA
    | languageEnum.PYTHON
    | languageEnum.GO
    | "unknown";
  framework: string | null;
  hasDockerfile: boolean;
}

export interface UserChoices {
  stack: StackProfile;
  database:
    | "none"
    | languageEnum.POSTGRES
    | languageEnum.MYSQL
    | languageEnum.MONGODB
    | languageEnum.REDIS;
  cicd: "none" | "jenkins" | "github-actions";
  platform: "docker-only" | "railway" | "render" | "fly";
}

export enum languageEnum {
  NODE = "node",
  JAVA = "java",
  PYTHON = "python",
  GO = "go",
  POSTGRES = "postgres",
  MYSQL = "mysql",
  MONGODB = "mongodb",
  REDIS = "redis",
}
