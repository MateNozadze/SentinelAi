# --- ეტაპი 1: კოდის აწყობა Java 25-ით ---
FROM eclipse-temurin:25-jdk-jammy AS build
WORKDIR /app

# Maven-ის ხელით გადმოწერა და დაყენება კონტეინერში, რადგან Maven-25 მზა იმიჯი არაა
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

# --- ეტაპი 2: აპლიკაციის გაშვება Java 25 JRE-ით ---
FROM eclipse-temurin:25-jre-jammy
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]