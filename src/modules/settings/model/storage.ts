import type { SettingsValues } from "./types";

const SETTINGS_STORAGE_KEY = "reviewer-settings";

const DEFAULT_SETTINGS: SettingsValues = {
  login: "",
  repository: "",
  blacklist: [],
};

export const getSettings = (): SettingsValues => {
  try {
    const rawValue = localStorage.getItem(SETTINGS_STORAGE_KEY);

    if (!rawValue) {
      return DEFAULT_SETTINGS;
    }

    const parsedValue = JSON.parse(rawValue) as Partial<SettingsValues>;

    return {
      login: parsedValue.login ?? DEFAULT_SETTINGS.login,
      repository: parsedValue.repository ?? DEFAULT_SETTINGS.repository,
      blacklist: Array.isArray(parsedValue.blacklist)
        ? parsedValue.blacklist
        : DEFAULT_SETTINGS.blacklist,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const saveSettings = (settings: SettingsValues) => {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
};
