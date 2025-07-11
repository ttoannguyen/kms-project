import { AppConfigRepository } from "../../repositories/AppConfigRepository";
import { AppDataSource } from "../../config/db/data-source";
import { AppConfig } from "../../entities/AppConfig";
import { AppConfigKeys } from "../../config/config";

const repo = new AppConfigRepository(AppDataSource);

export const getPublicConfig = async () => {
  const result = await repo.findPublic();

  const parseValue = (value: string, type: string) => {
    if (type === "boolean") return value === "true";
    if (type === "number") return Number(value);
    if (type === "json") {
      try {
        return JSON.parse(value);
      } catch {
        console.warn("Invalid JSON config value:", value);
        return value;
      }
    }
    return value;
  };

  return Object.fromEntries(result.map((c) => [c.key, parseValue(c.value, c.type)]));
};

export const getAll = async (): Promise<AppConfig[]> => {
  return repo.findAll();
};

export const saveConfig = async (data: Partial<AppConfig>[]) => {
  await repo.bulkUpsert(data);
};

export const getKeycloakConfig = async () => {
  const entries = await repo.findByKeys([
    AppConfigKeys.KEYCLOAK_BASE_URL,
    AppConfigKeys.KEYCLOAK_REALM,
    AppConfigKeys.KEYCLOAK_AUDIENCE,
  ]);

  const configMap: Record<string, string> = {};
  entries.forEach((e) => {
    configMap[e.key] = e.value;
  });

  return configMap;
};



export const getRuntimeAppConfig = async () => {
  const keys = [
    AppConfigKeys.KEYCLOAK_BASE_URL,
    AppConfigKeys.KEYCLOAK_REALM,
    AppConfigKeys.KEYCLOAK_CLIENT_ID, 
    AppConfigKeys.KEYCLOAK_AUDIENCE,
    AppConfigKeys.KEYCLOAK_SECRET,     
    AppConfigKeys.DATAVERSE_API_BASE,  
    AppConfigKeys.MAINTENANCE_MODE,
  ];

  const entries = await repo.findByKeys(keys);

  const configMap: Record<string, any> = {};

  for (const entry of entries) {
    let parsed: any = entry.value;

    switch (entry.type) {
      case "boolean":
        parsed = entry.value === "true";
        break;
      case "number":
        parsed = Number(entry.value);
        break;
      case "json":
        try {
          parsed = JSON.parse(entry.value);
        } catch {
          console.warn("Invalid JSON in config", entry.key);
        }
        break;
    }

    configMap[entry.key] = parsed;
  }

  return configMap;
};
