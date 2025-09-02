import { Endpoints } from "@octokit/types";
import { PushEventSlim } from "@/features/dashboard/lib/types";
import { Octokit } from "octokit";
// import _, { merge } from "lodash";

type AllEvents =
  Endpoints["GET /users/{username}/events/public"]["response"]["data"];

type PushEvent = AllEvents[number] & {
  type: "PushEvent";
  payload: {
    size: number;
    commits: {
      sha: string;
      message: string;
      url: string;
    }[];
  };
};

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_AUTHORIZATION_TOKEN,
});

function isPushEvent(event: AllEvents[number]): event is PushEvent {
  return event.type === "PushEvent";
}

export default async function getUserActivity(
  username: string
): Promise<PushEventSlim[]> {
  const response = await octokit.request(
    "GET /users/{username}/events/public",
    {
      username,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  const pushEvents = response.data.filter(isPushEvent).map((event) => ({
    repo: {
      id: event.repo.id,
      name: event.repo.name,
      url: event.repo.url,
    },
    payload: {
      size: event.payload.size,
      commits: event.payload.commits.map((c) => ({
        sha: c.sha,
        message: c.message,
        url: c.url,
      })),
    },
  }));

  return pushEvents;
}
