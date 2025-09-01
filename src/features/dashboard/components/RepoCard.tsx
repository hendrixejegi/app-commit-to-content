import { PushEventSlim } from "../lib/types";

const RepoCard = ({
  activities,
  username,
}: {
  activities: PushEventSlim[];
  username: string;
}) => {
  return (
    <>
      {activities.map((activity) => (
        <div key={activity.id}>
          <h3>
            {activity.repo.name} <a href={activity.repo.url}>&#128279;</a>
          </h3>
          <p>
            <span>{activity.payload.size} commits</span>{" "}
            <span>{activity.payload.push_id}</span>
          </p>
        </div>
      ))}
    </>
  );
};

export default RepoCard;
