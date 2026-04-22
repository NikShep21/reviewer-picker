export const getApiErrorMessage = (error: unknown) => {
  if (!error || typeof error !== "object" || !("status" in error)) {
    return "";
  }
  if (error.status === 404) {
    return "Репозиторий не найден.";
  }

  if (error.status === 403) {
    return "Доступ ограничен или превышен лимит GitHub API.";
  }

  return "Произошла ошибка при получении данных.";
};
