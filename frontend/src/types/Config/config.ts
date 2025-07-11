export interface ConfigItem {
  key: string;
  value: string;
  type: string;
  isSecret: boolean;
  isClientExposed: boolean;
  updatedAt: string;
}