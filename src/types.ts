export enum LanguageEnum {
  JAVASCRIPT = "javascript",
  TYPESCRIPT = "typescript",
  JAVA = "java",
  PYTHON = "python",
  GO = "go",
}

export enum DatabaseEnum {
  POSTGRES = "postgres",
  MYSQL = "mysql",
  MONGODB = "mongodb",
  REDIS = "redis",
}

export interface StackProfile {
  language:
    | LanguageEnum.JAVASCRIPT
    | LanguageEnum.TYPESCRIPT
    | LanguageEnum.JAVA
    | LanguageEnum.PYTHON
    | LanguageEnum.GO
    | "unknown";
  framework: string | null;
  hasDockerfile: boolean;
  dbConfig?: {
    url?: string;
    username?: string;
    password?: string;
    dbName?: string;
  };
}

export interface UserChoices {
  stack: StackProfile;
  database:
    | "none"
    | DatabaseEnum.POSTGRES
    | DatabaseEnum.MYSQL
    | DatabaseEnum.MONGODB
    | DatabaseEnum.REDIS;
  cicd: "none" | "jenkins" | "github-actions";
  platform: "docker-only" | "railway" | "render" | "fly";
}
