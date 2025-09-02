import { PushEventSlim } from "../lib/types";

const RepoCard = ({
  activities,
}: // username,
{
  activities: [number, PushEventSlim][];
  username: string;
}) => {
  console.log(Array.isArray(activities));
  return (
    <>
      {activities.map(([, event]) => (
        <div key={event.repo.id}>
          <h3>
            {event.repo.name} <a href={event.repo.url}>&#128279;</a>
          </h3>
          <p>{event.payload.size}</p>
        </div>
      ))}
    </>
  );
};

export default RepoCard;
