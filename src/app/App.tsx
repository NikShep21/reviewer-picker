import { useState } from "react";

import styles from "./App.module.css";

import {
  getSettings,
  saveSettings,
  SettingsPanel,
  type SettingsValues,
} from "@/modules/settings";
import { ReviewerWorkspace } from "@/modules/reviewer";

export const App = () => {
  const [settings, setSettings] = useState<SettingsValues>(() => getSettings());

  const handleSaveSettings = (nextSettings: SettingsValues) => {
    setSettings(nextSettings);
    saveSettings(nextSettings);
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Find Reviewer</h1>
          <p className={styles.pageSubtitle}>
            Поиск случайного ревьюера среди контрибьюторов GitHub-репозитория.
          </p>
        </header>

        <SettingsPanel initialValues={settings} onSave={handleSaveSettings} />

        <ReviewerWorkspace
          login={settings.login}
          repository={settings.repository}
          blacklist={settings.blacklist}
        />
      </div>
    </div>
  );
};
