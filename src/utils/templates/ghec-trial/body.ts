function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const body = (
  data: IssueBodyTemplate,
  issueNumberInput: string,
  salesOpsIssueURL: string
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

  const enterpriseType = data.enterprise_type
    ? capitalizeFirstLetter(data.enterprise_type)
    : "Organisations";
  const startDate = data.start_date
    ? data.start_date
    : "N/A - Old Record, Please Check SF Manually";
  const endDate = data.end_date
    ? data.end_date
    : "N/A - Old Record, Please Check SF Manually";

  // Putting all of the data into a table so it is readable // https://github.com/github/sales-operations/issues/29732
  const table = `
   **Item** | **Description**
   :--: | :--
   **Client/Prospect:** | ${data.client_name}
   **What type of Trial Request?** | Initial Request
   **:stop_sign: Add-ons?** | <li>- [x] __Advanced Security__</li>
   **${enterpriseType} to Enable GHAS on:** | ${org}
   **Start Date of Trail:** | ${startDate}
   **End Date of Trial:** | ${endDate}
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

  console.log(
    "The final data which will will create in the issue is: ",
    response
  );

  return response;
};
