import { useState } from "react";

import { useSettingsForm } from "@/modules/settings/model/useSettingsForm";

import styles from "./SettingsPanel.module.css";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import type { SettingsValues } from "@/modules/settings/model/types";

interface SettingsPanelProps {
  initialValues: SettingsValues;
  onSave: (values: SettingsValues) => void;
}

export const SettingsPanel = ({ initialValues, onSave }: SettingsPanelProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const {
    login,
    repository,
    blacklistInput,
    errors,
    setLogin,
    setRepository,
    setBlacklistInput,
    handleSubmit,
  } = useSettingsForm({
    initialValues,
    onSave,
  });

  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Настройки</h2>
          <p className={styles.description}>
            Укажите текущего пользователя, репозиторий и исключения.
          </p>
        </div>

        <Button
          variant="secondary"
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? "Скрыть настройки" : "Показать настройки"}
        </Button>
      </div>

      {isOpen && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputFields}>
            <Input
              id="login"
              label="Логин"
              value={login}
              onChange={(event) => setLogin(event.target.value)}
              placeholder="user"
              error={errors.login}
            />

            <Input
              id="repository"
              label="Репозиторий"
              value={repository}
              onChange={(event) => setRepository(event.target.value)}
              placeholder="owner/repository"
              error={errors.repository}
            />
          </div>

          <Textarea
            id="blacklist"
            label="Список исключений"
            value={blacklistInput}
            onChange={(event) => setBlacklistInput(event.target.value)}
            placeholder="user1, user2, user3"
            rows={4}
          />

          <div className={styles.actions}>
            <Button type="submit">Сохранить настройки</Button>
          </div>
        </form>
      )}
    </section>
  );
};
