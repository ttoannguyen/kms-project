import { AppConfig } from "../entities/AppConfig";
import { AppConfigKeys } from "./config";

type DefaultConfig = Pick<
  AppConfig,
  "key" | "value" | "type" | "isSecret" | "isClientExposed"
>;

export const defaultAppConfigs: DefaultConfig[] = [
  {
    key: AppConfigKeys.KEYCLOAK_BASE_URL,
    value: "",
    type: "string",
    isSecret: false,
    isClientExposed: true,
  },
  {
    key: AppConfigKeys.KEYCLOAK_REALM,
    value: "",
    type: "string",
    isSecret: false,
    isClientExposed: true,
  },
  {
    key: AppConfigKeys.KEYCLOAK_AUDIENCE,
    value: "",
    type: "string",
    isSecret: false,
    isClientExposed: true,
  },
  {
    key: AppConfigKeys.KEYCLOAK_CLIENT_ID,
    value: "",
    type: "string",
    isSecret: false,
    isClientExposed: false,
  },
  {
    key: AppConfigKeys.KEYCLOAK_SECRET,
    value: "",
    type: "string",
    isSecret: true,
    isClientExposed: false,
  },
  {
    key: AppConfigKeys.DATAVERSE_API_BASE,
    value: "",
    type: "string",
    isSecret: false,
    isClientExposed: false,
  },
  {
    key: AppConfigKeys.SITE_NAME,
    value: "My App",
    type: "string",
    isSecret: false,
    isClientExposed: true,
  },
  {
    key: AppConfigKeys.MAINTENANCE_MODE,
    value: "false",
    type: "boolean",
    isSecret: false,
    isClientExposed: true,
  },
];
