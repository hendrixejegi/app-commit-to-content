import { formatRepoName, formatDate } from "@/lib/utils";
import { PushEventSlim } from "../lib/types";
import { FolderGit, Hash } from "lucide-react";

const RepoCards = ({
  activities,
}: {
  activities: [number, PushEventSlim][] | undefined;
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Array.isArray(activities) &&
        activities.map(([repoId, event]) => {
          return (
            <div
              key={event.repo.id}
              className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow space-y-3"
            >
              <div className="flex items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                  <FolderGit className="text-gray-900" aria-hidden="true" />
                  <h3 className="text-gray-900 leading-tight">
                    {formatRepoName(event.repo.name)}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Hash className="w-4 h-4" />
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                    {repoId}
                  </code>
                  {/* <button
                    onClick={() => copyToClipboard(commit.sha, commit.sha)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                    title="Copy full SHA"
                  >
                    {copiedSha === commit.sha ? (
                      <Check className="w-3 h-3 text-green-600" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button> */}
                </div>
              </div>
              <p className="text-gray-900">
                {formatDate(event.created_at ?? null)}
              </p>
              <p className="text-gray-900">{event.payload.size} commits</p>
            </div>
          );
        })}
    </div>
  );
};

export default RepoCards;
