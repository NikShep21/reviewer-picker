export interface FormValues {
  login: string;
  repository: string;
  blacklistInput: string;
}

export interface SettingsValues {
  login: string;
  repository: string;
  blacklist: string[];
}

export interface FormErrors {
  login?: string;
  repository?: string;
}
