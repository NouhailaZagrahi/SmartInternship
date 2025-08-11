FROM openjdk:17-jdk-slim
VOLUME /tmp
COPY target/service-stagiaire-0.0.1-SNAPSHOT.jar service-stagiaire.jar
ENTRYPOINT ["java", "-jar", "/service-stagiaire.jar"]
