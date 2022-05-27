import {
  GHASTrialIssueBody,
  GHASTrialIssueTitle,
  GHECTrialIssueBody,
  GHECTrialIssueTitle,
  createIssue,
} from "./utils";

import * as core from "@actions/core";

const run = async (): Promise<void> => {
  try {
    const issueBody = JSON.parse(
      core.getInput("issueBodyPayload", { required: false })
    ) as IssueBodyTemplate;
    const approverInput = core.getInput("approver", { required: false });
    const issueNumberInput = core.getInput("issueNumber", { required: false });
    const githubRepositoryInput = core.getInput("githubRepository", {
      required: false,
    });

    const GHASIssueData = await GHASTrialIssueBody(
      issueBody,
      approverInput,
      issueNumberInput
    );

    const GHASIssueTitle = await GHASTrialIssueTitle(issueBody);

    const [ghas_sales_ops_issue_url, ghas_sales_ops_issue_number] =
      await createIssue(githubRepositoryInput, GHASIssueTitle, GHASIssueData);

    console.log(
      `The issue url for the GHAS Trial has been created here: ${ghas_sales_ops_issue_url}`
    );
    console.log(
      `The issue number for the GHAS Trial is: ${ghas_sales_ops_issue_number}`
    );

    if (issueBody.plan === "team_free" || issueBody.plan === "other") {
      const GHECIssueData = await GHECTrialIssueBody(
        issueBody,
        approverInput,
        issueNumberInput,
        ghas_sales_ops_issue_number
      );

      const GHECIssueTitle = await GHECTrialIssueTitle(issueBody);

      const [ghec_sales_ops_issue_url, ghes_sales_ops_issue_number] =
        await createIssue(githubRepositoryInput, GHECIssueTitle, GHECIssueData);

      console.log(
        `The issue url for the GHEC Trial has been created here: ${ghec_sales_ops_issue_url}`
      );
      console.log(
        `The issue number for the GHEC Trial is: ${ghes_sales_ops_issue_number}`
      );
    }

    core.setOutput("opsIssueNumber", ghas_sales_ops_issue_number);
    core.setOutput("opsIssueURL", ghas_sales_ops_issue_url);
  } catch (error) {
    console.error(error);
  }
};

run();
