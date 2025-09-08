export function formatRepoName(name: string) {
  return name
    .split("/")[1]
    .split("-")
    .map((string) => {
      const firstLetter = string.slice(0, 1);
      const rest = string.slice(1);

      return firstLetter.toUpperCase() + rest.toLowerCase();
    })
    .join(" ");
}
