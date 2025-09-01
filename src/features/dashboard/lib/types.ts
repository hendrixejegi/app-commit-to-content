interface Commit {
  sha: string;
  message: string;
  url: string;
}

export interface PushEventSlim {
  id: string;
  type: string;
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    push_id: number;
    size: number;
    commits: Commit[];
  };
}
