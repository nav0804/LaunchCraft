export interface IDatabaseSnippet {
  serviceName: string;
  serviceYaml: (dbName: string, password: string) => string;
  volumeYaml: string;
}
