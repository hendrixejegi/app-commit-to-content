import { PushEventSlim } from "../lib/types";
import { FolderGit } from "lucide-react";

const RepoCards = ({
  activities,
}: {
  activities: [number, PushEventSlim][] | undefined;
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Array.isArray(activities) &&
        activities.map(([, event]) => (
          <div
            key={event.repo.id}
            className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <h3 className="text-gray-900 leading-tight mb-3">
              {event.repo.name}
            </h3>
            <p className="text-gray-900">{event.payload.size} commits</p>
          </div>
        ))}
    </div>
  );
};

export default RepoCards;
