// src/config/runtimeConfig.ts
import { getKeycloakConfig, getRuntimeAppConfig } from "../services/appconfig/appConfig.service";

let runtimeConfig: {
  keycloak_base_url: string;
  keycloak_realm: string;
  keycloak_client_id: string;
  keycloak_audience: string;
  keycloak_secret: string;
  dataverse_api_base: string;
  maintenance_mode: boolean
} | null = null;

export const loadRuntimeConfig = async () => {
  const configFromDB = await getRuntimeAppConfig();

  runtimeConfig = {
    keycloak_base_url: configFromDB.keycloak_base_url,
    keycloak_realm: configFromDB.keycloak_realm,
    keycloak_client_id: configFromDB.keycloak_client_id,
    keycloak_audience: configFromDB.keycloak_audience,
    keycloak_secret: configFromDB.keycloak_secret,
    dataverse_api_base: configFromDB.dataverse_api_base,
    maintenance_mode: configFromDB.maintenance_mode
  };

  console.log(runtimeConfig);
};

export const getRuntimeConfig = () => {
  if (!runtimeConfig) throw new Error("Runtime config not loaded yet");
  return runtimeConfig;
};
