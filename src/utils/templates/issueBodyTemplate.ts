export const issueBodyTemplate = (
  data: IssueBodyTemplate,
  approverInput: string,
  issueNumberInput: string
): string => {
  let orgs = "";

  // Providing a readable structure for the orgs
  data.github_org.map((org, index) => {
    orgs += `**GitHub Org ${index + 1}**: ${org} <br /> `;
  });

  // As we provie orgs not repos, a message asking to enable on the enterprises.
  const org = `${orgs} <br /> (**If possible**, enaling GHAS on the enterprise of these orgs would be great)`;

  // Providing a readable format for the PS Engineer
  const PSEngineer = data.ps_engineer
    ? `@${data.ps_engineer}`
    : "N/A : No PS Engineer Assigned";

  // Deciding what to put a tick next to or a X next to.
  const ghecCustomerResponse =
    data.instance_type === "GitHub Enterprise Cloud"
      ? ":white_check_mark:"
      : ":x:";
  const ghesCustomerResponse =
    data.instance_type === "GitHub Enterprise Server"
      ? ":white_check_mark:"
      : ":x:";
  const ghaeCustomerResponse =
    data.instance_type === "GitHub AE" ? ":white_check_mark:" : ":x:";

  // Putting all of the data into a table so it is readable
  const table = `
 **Item** | **Description**
 :--: | :--
 **Client/Prospect:** | ${data.client_name}
 **GHEC Customer?:** | ${ghecCustomerResponse}
 **GHES Customer?:** | ${ghesCustomerResponse}
 **GHAE Customer?:** | ${ghaeCustomerResponse}
 **:stop_sign: Add-ons?** | <li>- [x] __Advanced Security__</li>
 **Orgs to Enable GHAS:** | ${org}
 **Trial/Extension Length:** | ${data.trial_duration} days
 **Additional details:** | _(i.e. why does your customer need an extension)_
 **POC Issue:** | [advanced-security-field/${issueNumberInput}](https://github.com/github/advanced-security-field/issues/${issueNumberInput})
 **Salesforce POC Object:** | ${data.sfdc_poc_url}
 **Links:** | 
 **Tag:** | Sales Rep: @${data.sales_rep} <br /> Solutions Engineer: @${data.solution_engineer} <br /> Professional Services Engineer: ${PSEngineer}
 
 Approved By: __@${approverInput}__
 
 ---
 **Mention:** _@github/sales-support_ _@github/revenue_ (for :eyes: and :+1: on all day 46-90 requests)`;

  // Formalising the whole issue response. Hiding some data at the bottom of the issue that is used downstream.
  const response = `
  ${table} <br /><br /> 
  <!--
  \`\`\`json ghas_data
  ${JSON.stringify(data, null, 2)}
  \`\`\`
  \`\`\`json approver_input
  ${JSON.stringify({ approverInput }, null, 2)}
  \`\`\`
  \`\`\`json issue_number_input
  ${JSON.stringify({ issueNumberInput }, null, 2)}
  \`\`\`
  -->
  `;
  return response;
};
