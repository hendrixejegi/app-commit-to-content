import { PushEventSlim } from "./types";

export default function mergeRepos(arr: PushEventSlim[]) {
  // Group events by repository Id
  const grouped = Map.groupBy(arr, (event) => event.repo.id);

  // Store the merged results per repository
  const merged = new Map<number, PushEventSlim>();

  // Iterate through each group of events belonging to the same repo
  grouped.forEach((group, key) => {
    // Reduce all events in the group into a single merged event
    const result = group.reduce((accumulator, current) => {
      // If there's no accumulated event yet, use the current one
      if (!accumulator) return current;

      // Merge the payload of two events:
      // - Sum up the sizes
      // - Concatenate the commits arrays
      const merge = {
        ...accumulator,
        payload: {
          size: accumulator.payload.size + current.payload.size,
          commits: accumulator.payload.commits.concat(current.payload.commits),
        },
      };

      return merge;
    });

    // Store the merged event for this repo ID
    merged.set(key, result);
  });

  // Convert the Map back into an array of merged results
  return Array.from(merged);
}
