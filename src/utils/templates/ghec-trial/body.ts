function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const GHECTrialIssueBody = (
  data: IssueBodyTemplate,
  approverInput: string,
  issueNumberInput: string,
  salesOpsIssueNumber: string,
): string => {
  let orgs = "";
  // Providing a readable format for the PS Engineer
  const PSEngineer = data.ps_engineer
    ? `@${data.ps_engineer}`
    : "N/A : No PS Engineer Assigned";

  const enterpriseType = data.enterprise_type
    ? capitalizeFirstLetter(data.enterprise_type)
    : "Organisations";
  const startDate = data.start_date
    ? data.start_date
    : "N/A - Old Record, Please Check SF Manually";
  const endDate = data.end_date
    ? data.end_date
    : "N/A - Old Record, Please Check SF Manually";

  // Working out if there is orgs or enterprises
  const orgsOrEnterprise =
    !Array.isArray(data.github_org) || !data.github_org.length
      ? data.github_enterprise
      : data.github_org;

  // Providing a readable structure for the orgs
  orgsOrEnterprise.map((org, index) => {
    orgs += `**GitHub ${enterpriseType} ${index + 1}**: ${org} <br /> `;
  });

  // As we provie orgs not repos, a message asking to enable on the enterprises.
  const org = `${orgs} <br />`;

  // Putting all of the data into a table so it is readable // https://github.com/github/sales-operations/issues/29732
  const table = `
   **Item** | **Description**
   :--: | :--
   **Client/Prospect:** | ${data.client_name}
   **What type of Trial Request?** | Initial Request
   **Main License Type?** | <li>- [x] __GHE Cloud (Single Org)__</li>
   **Enterprise Account ?:** | No (see below)
   **If an Enterprise Account is being requested:** | No Enterprise Account Required 
   **Any Additional Products Needed?** | Yes, GHAS. See the Sales Ops Ticket for GHAS here: [sales-operations/${salesOpsIssueNumber}](https://github.com/github/sales-operations/issues/${salesOpsIssueNumber}), the advanced security field ticket for GHAS here: [advanced-security-field/${issueNumberInput}](https://github.com/github/advanced-security-field/issues/${issueNumberInput}) and the Salesforce PoC object for GHAS here: ${data.sfdc_poc_url}.
   **Additional Codespaces Trial Information:** | N/A
   **Please list any existing trial Cloud Orgs or Server Orgs:** | ${org}
   **Client / Prospect Admin Email?** | N/A (Automation can't do this right now, @${data.sales_rep} can you manually fill this in please)
   **Start Date of Trail:** | ${startDate}
   **End Date of Trial:** | ${endDate}
   **Trial/Extension Length:** | ${data.trial_duration} days
   **Links:** | 
   **Tag:** | Sales Rep: @${data.sales_rep} <br /> Solutions Engineer: @${data.solution_engineer} <br /> Professional Services Engineer: ${PSEngineer} <br /> Sales Support: @github/sales-support <br />
   
   Approved By: __@${approverInput}__
   
   ---
   `;

  // Formalising the whole issue response. Hiding some data at the bottom of the issue that is used downstream.
  const response = `
${table} 
<br />
<br /> 
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
\`\`\`json sales_ops_ghas_issue_number_input
${JSON.stringify({ salesOpsIssueNumber }, null, 2)}
\`\`\`
-->
`;

  console.log(
    "The final data which will will create in the issue is: ",
    response,
  );

  return response;
};
