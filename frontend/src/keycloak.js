import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "myrealm", // remplace par ton nom de realm
  clientId: "myclient",
});

export default keycloak;
