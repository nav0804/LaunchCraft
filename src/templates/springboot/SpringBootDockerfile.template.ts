import { UserChoices } from "../../types";

export const SpringBootDockerfileTemplate = (choices: UserChoices) =>
  `

# ==========================================
# ⚠️ DEVLAUNCH TODO: VERIFY JAVA VERSION
# This template defaults to Java 17. 
# If your pom.xml uses Java 21, change the '17' below to '21'.
# ==========================================
# Stage 1: Build the application
FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
# Build the jars, then immediately delete the useless plain jar so Docker doesn't copy it
RUN mvn clean package -DskipTests && rm target/*-plain.jar || true

# Stage 2: Run the application
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
# Now the wildcard will strictly grab the correct Fat Jar
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
`.trim();
