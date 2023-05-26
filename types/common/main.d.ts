type Languages =
  | "js_ts"
  | "java"
  | "c"
  | "csharp"
  | "python"
  | "go"
  | "ruby"
  | "swift"
  | "kotlin"
  | "other";
type SecurityTools =
  | "nothing"
  | "snyk"
  | "checkmarx"
  | "sonar"
  | "veracode"
  | "coverity"
  | "whitesource"
  | "fortify"
  | "other";
type CICDTools =
  | "ga"
  | "az"
  | "jenkins"
  | "circle"
  | "travis"
  | "gitlab"
  | "bb"
  | "none"
  | "other";
type Instance =
  | "GitHub Enterprise Server"
  | "GitHub Enterprise Cloud"
  | "GitHub AE"
  | "Azure DevOps";
type Region =
  | "amer_e_east"
  | "amer_e_central"
  | "amer_e_west"
  | "amer_e_pubsec"
  | "amer_canada"
  | "amer_latam"
  | "amer_c_mid"
  | "amer_c_sme"
  | "emea_e_n"
  | "emea_e_s"
  | "emea_c"
  | "apac_e"
  | "apac_c";
type Team = "se" | "ps";
type Plan = "team_free" | "other" | "enterprise";
type Enterprise_Type = "enterprise" | "org";

type IssueBodyTemplate = {
  client_name: string;
  instance_type: Instance;
  github_org: string[];
  github_enterprise: string[];
  trial_duration: number;
  team_responsbile: Team;
  region: Region;
  sales_rep: string;
  solution_engineer: string | null;
  ps_engineer: string | null;
  sfdc_poc_url: string;
  github_customers_url: string | null;
  core_languages: Languages[];
  current_sec_tools: SecurityTools[];
  current_ci_tools: CICDTools[];
  start_date: string;
  end_date: string;
  plan: Plan;
  enterprise_type: Enterprise_Type;
  would_like_a_project_board: boolean;
  team_responsible: string;
  repo_url: string | null;
  already_created_repo: boolean;
};
