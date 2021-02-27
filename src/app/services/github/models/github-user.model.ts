export interface IGitHubUser {
  login: string;
  id: number;
  node_id: string;
}

export interface IGitHubUserPublic extends IGitHubUser {
  name: string;
}

export interface IGitHubUserAuthd extends IGitHubUserPublic {
  disk_usage: number;
}

export function toGitHubUser(data) {
  return {
    login: data.login,
    id: data.id,
    node_id: data.node_id,
  };
}

export function toGitHubUserPublic(data) {
  let user = toGitHubUser(data);
  (user as IGitHubUserPublic).name = data.name;

  return user;
}

export function toGitHubUserAuthd(data) {
  let user = toGitHubUserPublic(data);
  (user as IGitHubUserAuthd).disk_usage = data.disk_usage;

  return user;
}
