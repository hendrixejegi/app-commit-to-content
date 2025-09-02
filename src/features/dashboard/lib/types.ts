interface Commit {
  sha: string;
  message: string;
  url: string;
}

export interface PushEventSlim {
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    size: number;
    commits: Commit[];
  };
}
