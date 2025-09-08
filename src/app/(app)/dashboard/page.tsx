import { auth, currentUser } from "@clerk/nextjs/server";
import getUserActivity from "@/lib/api/github";
import Header from "@/components/Header";
import RepoCards from "@/features/dashboard/components/RepoCards";
import mergeRepos from "@/features/dashboard/lib/mergeRepos";
import { Commit, PushEventSlim } from "@/features/dashboard/lib/types";
import CommitMessageRenderer from "@/features/dashboard/components/CommitMessage";

export default async function Page() {
  // const { userId } = await auth();

  // if (!userId) return <div>Sign in to view this page</div>;

  const user = await currentUser();
  const userActivities = await getUserActivity(user?.username ?? "");

  const mergedActivities = mergeRepos(userActivities);
  const totalCommits = calcTotalCommits(mergedActivities);
  const commitsList = combineAllCommits(mergedActivities);

  return (
    <>
      <Header />
      <main className="wrapper">
        <div className="p-6 space-y-8">
          <hgroup>
            <h1>Today&apos;s Activity</h1>
            <p className="text-lg">
              <strong>{totalCommits} commits</strong> in{" "}
              {Array.isArray(mergedActivities) && mergedActivities.length}{" "}
              repositories
            </p>
          </hgroup>
          <RepoCards activities={mergedActivities} />
          {Array.isArray(commitsList) && (
            <CommitMessageRenderer activities={mergedActivities} />
          )}
        </div>
      </main>
    </>
  );
}

function calcTotalCommits(arr: [number, PushEventSlim][] | undefined) {
  if (!arr) return;

  let totalCommits = 0;

  arr.forEach(([, repo]) => {
    const numOfCommits = repo.payload.size;
    totalCommits += numOfCommits;
  });

  return totalCommits;
}

function combineAllCommits(arr: [number, PushEventSlim][] | undefined) {
  if (!arr) return;

  let combinedCommits: Commit[] = [];

  arr.forEach(([, repo]) => {
    const commits = repo.payload.commits;
    combinedCommits = combinedCommits.concat(commits);
  });

  return combinedCommits;
}
