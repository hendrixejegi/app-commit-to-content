export interface Commit {
  sha: string;
  author: {
    email: string;
    name: string;
  };
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
  created_at: string | null;
  username: {
    login: string;
  };
}
