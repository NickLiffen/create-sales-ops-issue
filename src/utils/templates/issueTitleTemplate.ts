export const issueTitleTemplate = ({
  client_name,
}: IssueBodyTemplate): string =>
  ` :lock: Enable GitHub Advanced Security Trial: ${client_name} :lock:`;
