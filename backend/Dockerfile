# Use a base image with Java 17
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy maven wrapper and pom.xml
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Give execution rights to the wrapper
RUN chmod +x mvnw

# Download dependencies (this step isolates dependency downloading for caching)
RUN ./mvnw dependency:go-offline

# Copy the source code
COPY src ./src

# Build the application
RUN ./mvnw package -DskipTests

# Expose port 8080
EXPOSE 8080

# Run the jar file (the version 0.0.1-SNAPSHOT comes from pom.xml)
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
