import { useState } from "react";

import type { FormErrors, FormValues, SettingsValues } from "./types";
import {
  createFormValues,
  hasFormErrors,
  parseBlacklist,
  validateSettingsForm,
} from "./validation";

interface UseSettingsFormParams {
  initialValues: SettingsValues;
  onSave: (values: SettingsValues) => void;
}

export const useSettingsForm = ({ initialValues, onSave }: UseSettingsFormParams) => {
  const [values, setValues] = useState<FormValues>(() => createFormValues(initialValues));
  const [errors, setErrors] = useState<FormErrors>({});

  const setLogin = (login: string) => {
    setValues((prev) => ({ ...prev, login }));

    if (errors.login) {
      setErrors((prev) => ({ ...prev, login: undefined }));
    }
  };

  const setRepository = (repository: string) => {
    setValues((prev) => ({ ...prev, repository }));

    if (errors.repository) {
      setErrors((prev) => ({ ...prev, repository: undefined }));
    }
  };

  const setBlacklistInput = (blacklistInput: string) => {
    setValues((prev) => ({ ...prev, blacklistInput }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateSettingsForm(values);

    if (hasFormErrors(nextErrors)) {
      setErrors(nextErrors);
      return;
    }

    onSave({
      login: values.login.trim(),
      repository: values.repository.trim(),
      blacklist: parseBlacklist(values.blacklistInput),
    });

    setErrors({});
  };

  return {
    login: values.login,
    repository: values.repository,
    blacklistInput: values.blacklistInput,
    errors,
    setLogin,
    setRepository,
    setBlacklistInput,
    handleSubmit,
  };
};
