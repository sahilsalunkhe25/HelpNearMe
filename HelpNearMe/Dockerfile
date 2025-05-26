# Use Eclipse Temurin JDK 21 base image
FROM eclipse-temurin:21-jdk-alpine

# Set working directory inside the container
WORKDIR /app

# Copy the built JAR file from the target directory
COPY build/libs/*.jar app.jar

# Expose the port Spring Boot runs on
EXPOSE 8080

# Start the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
