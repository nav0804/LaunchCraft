import { UserChoices } from "../../../types";

export const SpringBootDockerfileTemplate = (choices: UserChoices) => {
  return `
# ==========================================
# Stage 1: Build the Application
# ==========================================
FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /app

# Copy the pom.xml and download dependencies first (caching optimization)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code and build the fat JAR
COPY src ./src
RUN mvn clean package -DskipTests

# ==========================================
# Stage 2: Production Runtime
# ==========================================
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy ONLY the built fat JAR from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Standard Spring Boot port
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
`.trim();
};
