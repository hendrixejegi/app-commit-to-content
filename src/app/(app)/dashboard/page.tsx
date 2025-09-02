import { auth, currentUser } from "@clerk/nextjs/server";
import getUserActivity from "@/lib/api/github";
import Header from "@/components/Header";
import RepoCard from "@/features/dashboard/components/RepoCard";
import mergeRepos from "@/features/dashboard/lib/mergeRepos";

export default async function Page() {
  // const { userId } = await auth();

  // if (!userId) return <div>Sign in to view this page</div>;

  const user = await currentUser();

  const userActivities = await getUserActivity(user?.username ?? "Duubemmm");

  return (
    <>
      <Header />
      <main className="wrapper">
        <div className="p-4 space-y-4">
          <hgroup>
            <h1>Today&apos;s Activity</h1>
            <p className="text-lg">
              <strong>5 commits</strong> in 2 repositories
            </p>
          </hgroup>
          <section>
            <h2>Repos</h2>
            <div className="grid grid-cols-2">
              <RepoCard
                activities={mergeRepos(userActivities)}
                username={user?.username ?? "Dubemmm"}
              />
            </div>
          </section>
          <section>
            <h2>Commit Feed</h2>
            <ul>
              <li>Today I asked again on water it</li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
