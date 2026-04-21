import type { FormErrors, FormValues, SettingsValues } from "./types";

export const parseBlacklist = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export const isValidRepository = (value: string) => /^[^/\s]+\/[^/\s]+$/.test(value);

export const createFormValues = (initialValues: SettingsValues): FormValues => ({
  login: initialValues.login,
  repository: initialValues.repository,
  blacklistInput: initialValues.blacklist.join(", "),
});

export const validateSettingsForm = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!values.login.trim()) {
    errors.login = "Укажите Логин.";
  }

  if (!isValidRepository(values.repository.trim())) {
    errors.repository = "Репозиторий должен быть в формате owner/repo.";
  }

  return errors;
};

export const hasFormErrors = (errors: FormErrors) => Object.values(errors).some(Boolean);
