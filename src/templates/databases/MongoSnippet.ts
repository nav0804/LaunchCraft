import { IDatabaseSnippet } from "./IDatabaseSnippet";

export const MongoSnippet: IDatabaseSnippet = {
  serviceName: "mongo",
  serviceYaml: `
  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db`,
  volumeYaml: `
volumes:
  mongo_data:`
};
