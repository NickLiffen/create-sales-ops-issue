import { Octokit } from "@octokit/action";

export const createIssue = async (
  githubRepository: string,
  issueTitle: string,
  issueBody: string,
  instance_type: Instance
): Promise<string[]> => {
  const octokit = new Octokit();
  const [owner, repository] = githubRepository.split("/");
  const repo =
    instance_type === "Azure DevOps" ? "advanced-security-field" : repository;
  const {
    data: { html_url, number },
  } = await octokit.request("POST /repos/{owner}/{repo}/issues", {
    owner,
    repo,
    title: issueTitle,
    body: issueBody,
  });

  return [html_url, number.toString()];
};
