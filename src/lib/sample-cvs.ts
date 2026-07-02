export interface SampleProfile {
  id: string;
  label: string;
  targetRole: string;
  cvText: string;
}

// The CV database — real, anonymised IT professional CVs (not synthetic),
// selectable from a dropdown instead of typing/pasting. Sourced partly from
// real Virtusa-consultant CVs and partly from hireitpeople.com.
export const SAMPLE_PROFILES: SampleProfile[] = [
  {
    id: "janani-qa-7yr",
    label: "Janani Wanigasuriya — QA Lead / Senior Consultant · 7 yrs",
    targetRole: "QA Manager / Test Lead at Accenture — 7+ yrs QA leadership, ERP/Salesforce domain, manual test strategy, Agile/Scrum, team management",
    cvText: `JANANI WANIGASURIYA | Senior Consultant - QA | Virtusa Corporation
7+ years of experience driving software quality in ERP and Insurance domains. Expertise in manual test strategy, comprehensive QA analysis, team leadership, and people management. Bridges gap between technical teams and business stakeholders. ISTQB certified. Certified Scrum Master.

Tools & Technologies: TFS, Azure DevOps, Selenium, Java, SQL, Salesforce, Eclipse, IntelliJ IDEA

VIRTUSA CORPORATION (Aug 2019 – May 2026)

EAG RFS Revamp (Feb 2025 – May 2026) | QA Lead | Manual Testing
- QA Lead for NextGen RFS (Request for Service) revamp programme
- Created and owned the comprehensive testing strategy and complete testing plan
- Led team execution, defect triage, and reporting end-to-end
- Implemented process improvements across the QA lifecycle

EAG Bright & EAG ITMagination Migration (Aug 2024 – Jan 2025) | QA Lead | Manual Testing
- Led QA for SFDC CTB section and Bright/ITMagination migration to new platform
- Drove testing strategy, team management, full execution cycle, triage, and reporting

EAG Sales & Delivery Enablement PL – SFDC (Apr 2023 – Apr 2024) | QA Lead | Manual Testing
- Performed QA Lead role for SFDC CTB (Change the Business) Project
- Contributed to testing strategy, designed complete testing plan, conducted defect triage meetings

EAG Tech Org Transformation (Jan 2023 – Mar 2023) | Senior QA Engineer | Manual Testing
- Senior QA role; contributed to testing strategy and designed full testing plan
- Led team management and defect triage to ensure quality of deliverables

EAG Internal Job Portal "Pathfinder" / Evolve (Jul 2022 – Dec 2022) | Senior QA Engineer | Functional Testing, API Testing
- Designed the entire testing plan and contributed to testing strategy
- Led team management and defect triage; first project with API testing scope

EAG Delivery & Billing PL (Oct 2021 – Jun 2022) | QA Engineer | Manual Testing
- Applied Agile methodologies to complete tasks accurately within sprint timeframes
- Participated in defect triage meetings to ensure quality

EAG Fusion ERP (Aug 2019 – Sep 2021) | QA Engineer | Manual Testing
- Sole responsible QA person for JSCORE and SFDC-to-RM Integration
- Developed test designs for JSCORE, RM functionalities, and related reports
- Executed test scenarios, tracked defects, and managed test data

EPIC LANKA PVT. LTD (Oct 2017 – Apr 2018) | Trainer / Software QA Engineer | Selenium, TestNG, Java
- Executed manual and automation testing for an insurance portal using Selenium, TestNG, and Java

Education: BSc (Hons) IT & Management, University of Moratuwa 2019 | MBA General, University of Bedfordshire 2022
Certifications: ISTQB Foundation 2019 | Certified Scrum Master (Scrum Alliance 2023–2025) | QA Test Automation Certificate (ICIT 2023) | Career Essentials in Generative AI (Microsoft/LinkedIn 2023)`,
  },

  {
    id: "deepa-qa-6yr",
    label: "Deepa Kusugal — QA Analyst · 6.8 yrs · Banking/SWIFT",
    targetRole: "Senior QA Engineer / Test Lead at Infosys — 7+ yrs manual QA, banking/SWIFT payments domain, automation (Robot Framework, Python), first lead opportunity",
    cvText: `DEEPA KUSUGAL | Software Engineer – QA | Virtusa Corporation
6.8 years of experience in manual testing in the banking domain. Expertise in SWIFT payments, test strategy, traceability matrix, defect management, and automation using Robot Framework and Python.

Tools & Technologies: HP-ALM, JIRA, Postman, Robot Framework, Python, Selenium

Certifications: ISTQB Foundation Level (2018) | ISTQB Agile (2024)
Awards: Virtusa Passion Award (July 2021) | Dream Team Award contributor | Top Performer Bonus (August 2022)
Education: B.E. Computer Science and Engineering, KLS's Vishwanathrao Deshpande Institute of Technology, Karnataka (2014–2018)

VIRTUSA CORPORATION

Project: Bank of Montreal – OLBB (Sep 2018 – Apr 2019 & Apr 2020 – Present) | QA Analyst
Technology: HP-ALM, Postman, Robot Framework, Python, Selenium | Manual and Automation Testing
- Identified and created test scenarios, test cases, traceability matrix, and defect tracker
- Prepared test plan documents
- Created and uploaded SWIFT payments and validated them across various reports
- Identified, logged and reported defects in HP-ALM and tracked them to closure
- Participated in all client and internal meetings, defect triage, and implementation calls
- Wrote and executed automation scripts using Robot Framework and Python
- Prepared data for migration projects

Project: Bank of Montreal – Payments (Apr 2019 – Apr 2020) | QA Analyst
Technology: HP-ALM, JIRA, SWIFT Payments | Manual Testing
- Identified and created test scenarios, test cases, traceability matrix, and defect tracker
- Prepared test plan documents and executed test cases
- Created and uploaded SWIFT payments and validated them in various reports
- Identified, logged and reported defects in HP-ALM/JIRA and tracked them to closure
- Participated in all client and internal meetings, defect triage, and implementation calls`,
  },

  {
    id: "hasitha-ux-8yr",
    label: "Hasitha Jayarathne — Senior UX Designer · 8+ yrs",
    targetRole: "UX Design Lead / Principal Designer at Thoughtworks — 8+ yrs enterprise UX, ServiceNow design system, BT Telco, Verint workforce management, user research to visual design",
    cvText: `HASITHA MADHUSHAN JAYARATHNE | Senior Consultant – UX Designer | Virtusa Corporation
8+ years in UX Design and User Research across Customer Experience Management, Telco, Banking, Insurance, and Retail. Expertise in user research, journey mapping, wireframes, visual design, prototyping, and Agile UX sprint planning.

Tools: Figma, Sketch, InvisionApp, Adobe Photoshop, Mural, Miro, UXPressia, ServiceNow, Usertesting.com, Zeplin, JIRA
Education: BSc (Hons) Software Engineering, Second Class Upper Division — University of Plymouth (UK), 2017

VIRTUSA CORPORATION

Verint Engineering & IT Services (May 2023 – Jan 2026) | Senior Consultant UX | Figma, Zeplin
Domain: Customer Experience and Workforce Management
- Led responsive design guidelines for the new LUX 2.0 design system
- Redesigned appointment booking and queue management features to comply with new Verint design system
- Migrated all Zeplin screens to Figma; researched design system inspirations
- Added multi-guest attending feature to existing appointment booking flow

Hitachi – OIA Licence & Implementation (Feb 2023 – Mar 2023) | Lead Designer | Figma, Miro
Domain: Pharma — revamping current website
- Collaborated with lead designers and sales team to define scope
- Planned questionnaires, prepared UX proposal presentation, identified AS-IS journeys, conducted competitor analysis

BT Capacity Management (Oct 2022 – Nov 2022) | Lead Designer | Figma, Miro
Domain: Telco — new feature for enterprise management portal (high utilisation alerts and BT recommendations)
- Collaborated with BAs to define scope and ran sprint planning
- Reviewed wireframes/visuals designed by UX team; connected with developers; demoed to stakeholders

BT GS Non-Javelin (Apr 2021 – Sep 2022) | Experience Designer | Figma, Mural, Usertesting.com
Domain: Telco — customer portal and agent workspace to bring incident management 90% digital via ServiceNow
- Joined user interview sessions and analysed insights into themes
- Designed customer portal wireframes/visuals and created Figma prototype
- Created user journey maps in UXPressia; conducted ServiceNow feasibility analysis
- Led UAT and usability testing via Usertesting.com; submitted requirements for ServiceNow developers

BT – My Account UX (Jun 2020 – Feb 2021) | UX Designer | Sketch, InvisionApp, Miro
Domain: Telco — uplifting My Account dashboard with new application widgets

BT Enterprise Portal Engineering (Apr 2020 – May 2020) | UX Designer | Sketch, InvisionApp
Domain: Telco — raising incidents and service requests through portal
- Joined user interview sessions; analysed insights, created themes and personas
- Created user journey maps, wireframes, visuals and InvisionApp prototype
- Conducted usability testing; submitted requirements and reviewed developed designs

BT Enterprise Portal Phase 2/3 (Jul 2019 – Apr 2020) | UX Designer | Sketch, InvisionApp, Miro
Domain: Telco — uplifting Enterprise Portal for helpdesk users and customers
- Collaborated with BAs on requirements; designed wireframes, visuals, and prototype
- Submitted requirements to developers; reviewed developed designs; demoed to stakeholders

BT Enterprise Portal (Mar 2019 – Jun 2019) | UX Designer | Sketch, InvisionApp
Domain: Telco — My Account dashboard with application widgets (favorites and add/remove)
- Designed wireframes and visuals; created prototype; reviewed developed designs

Brandix Shop Floor Control System (Sep 2018 – Feb 2019) | UX Designer | Sketch, InvisionApp, Miro
Domain: Apparel — systemising workflows across warehousing, cutting, sewing, packaging, delivery
- Joined user interview sessions; created themes, personas, and user journey maps
- Designed wireframes, visuals, and InvisionApp prototype; conducted usability testing

CSG MTN Steady L3/Dev (Mar 2018 – Apr 2018) | UX Designer | Sketch, InvisionApp
Domain: Telco — dashboard integrating all MTN solutions and customer care support portal
- Conducted user interviews, created journey maps, designed wireframes/visuals and prototype

Digital Lab (Aug 2017 – Mar 2018) | Associate UX Designer | Sketch, InvisionApp, WordPress
Domain: Digital — next-gen mobile solutions for banking, finance, healthcare, retail, services and telecom using AI and big data
- Joined user interviews; designed wireframes, visuals, and InvisionApp prototypes
- Managed WordPress website for the digital team (images, pages, content)`,
  },

  {
    id: "vanaja-rpa-6yr",
    label: "Vanaja Sidagam — RPA Support Engineer · 6+ yrs · Citi Bank",
    targetRole: "Senior RPA Engineer / Application Support Lead at Capgemini — 6+ yrs RPA production support, Automation Anywhere, Citi Bank banking domain, incident/problem/change management, CoE growth track",
    cvText: `VANAJA SIDAGAM | Software Engineer – RPA Application Support | Virtusa Corporation
6+ years specialising in Robotic Process Automation (RPA) production support. Expertise in incident management, root cause analysis, bot stability, change & release management, COB/DR exercises, and KB documentation across banking domain (Citi Bank).

Tools & Technologies: Automation Anywhere, Talend, Xceptor, Infinity, Celonis, Appian, Appzillon, Autosys, Oracle, MySQL, Linux, ServiceNow, Agile, Tectia, UDeploy, Harness, ITRS Geneos, SoapUI

Education: BTech in Computer Science & Engineering — Aditya Engineering College, Surampalem (2013–2017)
Certification: Azure Data Fundamentals (2020)

VIRTUSA CORPORATION

RPA Production Support — Citi Bank, Banking Markets & Services (Aug 2024 – Present) | Software Engineer
Technology: Automation Anywhere, ServiceNow, UCD, ITRS, Harness, Tectia, Xceptor, Celonis, Infinity, Appian, Appzillon, Talend, SQL, Unix

Incident Management:
- Investigated and resolved Automation Anywhere bot incidents by analysing logs, configurations, and runtime data
- Collaborated with L3 and SME teams for escalated issue resolution, ensuring minimal downtime and SLA adherence
- Maintained production stability across critical RPA processes

Problem Management:
- Identified root causes of recurring incidents and implemented preventive measures for long-term bot stability
- Participated in RCA reviews and contributed permanent fixes to the knowledge repository

Infrastructure Management:
- Coordinated with development and operations teams for code releases, infrastructure upgrades, and patch management
- Performed pre- and post-deployment checks and weekend sanity testing to ensure smooth rollouts

Change & Release Management:
- Reviewed change requests, obtained approvals, and ensured successful production deployments with zero disruption
- Conducted post-release health checks and prepared KT sign-off documentation for each implemented change

Service Management:
- Created and maintained Knowledge Base (KB) and Known Error Database (KEDB) documentation
- Monitored bot performance and job executions through ITRS and Autosys; participated in KT sessions to validate new process documents

COB (Continuity of Business) Management:
- Executed sanity checks and validations during COB and Pre-Test Execution (PTE) exercises
- Ensured Health Check (HC) validations and system readiness during Disaster Recovery (DR) drills

ICG-CPB Production Support — Citi Private Bank | Engineer
Technology: ServiceNow, Autosys, ITRS Geneos, Oracle, SQL, Unix, SoapUI
- Monitored application health via ServiceNow, Autosys batch scheduling, and ITRS Geneos for CPB applications
- Created and acknowledged incidents; performed application sanity health checks; handled ad-hoc requests

ICG-CPB SMF Service Health — Citi Private Bank | Software Engineer
Technology: ServiceNow, Microsoft Excel, PowerPoint
- Supported all CGW applications for Production Readiness Assessment (PRA) under Service Management Framework (SMF)
- Gathered PSM details, scheduled RCA risk log calls, and generated weekly reports from ServiceNow CHG data`,
  },

  {
    id: "indira-qa-7yr",
    label: "Indira K J — QA Engineer · 7.4 yrs · Mobile/Web",
    targetRole: "Senior QA Engineer / Mobile QA Lead at Cognizant — 7+ yrs mobile (Android/iOS) and web QA, API testing, cross-platform security product testing, first team-lead and training ownership",
    cvText: `INDIRA K J | Software Engineer – QA
7.4 years of experience in Mobile (Android & iOS), Web, and Windows application testing. Well versed in SDLC and STLC. Tests APIs across GET/PUT/POST/DELETE. Works in Agile environments with frequently changing requirements. Trains new joiners on the product.

Skills: Functional, Smoke, Regression, Integration, Field Validation Testing; Test Case Design and Execution; MySQL database testing; Bug Life Cycle
Tools: Test Rail, PractiTest, Bugzilla, JIRA, Android Studio (Logcat, Log Encrypted Tool, Test Flight), Mosaic-Databricks, VMware vSphere Client, MySQL, Oracle, Swagger UI, SOAP UI, Postman

VIRTUSA CORPORATION

Client: Reliance Matrix | Project: Matrix Absence Management (Dec 2023 – Present)
Domain: Health Insurance | Technology: Azure DevOps, Postman
Description: Online tool for requesting and managing professional leave; helps employees navigate absence journeys and file claims.
- Understood the application thoroughly using User Stories
- Prepared and documented test scenarios and test cases; reviewed and executed them
- Performed Functionality, E2E, and Regression testing
- Handled bug reporting, tracking, and regression of defects
- Attended scrum meetings and sprint meetings
- Prepared daily test summary reports for senior management

Client: McAfee | Project: McAfee Mobile Security – Core Team (Jul 2022 – Dec 2023)
Platform: Android (Chromebook) & iOS | Technology: Mosaic-Databricks, JIRA, MySQL, Swagger/Postman
Description: Antivirus application for smartphones and tablets with anti-virus scan, Wi-Fi scan, VPN, safe browsing, protect-more-device, transaction monitoring, PDC features.
- Prepared and documented test scenarios and test cases; reviewed and executed them
- Performed Functionality, Integration, and Regression testing; Compatibility testing across platforms
- Tested mobile across Android and iPhone with different OS versions
- Performed analytics testing using Mosaic-Databricks
- Performed accessibility testing using the talkback feature

Client: McAfee | Project: McAfee ePolicy Orchestrator (May 2021 – Jul 2022)
Platform: Web Application | Technology: JIRA, MySQL, Swagger/Postman
Description: Unified security management console across endpoints, networks, data, and compliance for McAfee and third-party solutions.
- Understood the application using User Stories and Wireframes; identified E2E scenarios and wrote test cases
- Performed E2E testing and Regression testing; Compatibility testing across browsers
- Reviewed peer test cases and provided feedback on coverage
- Prepared weekly status reports
- Took ownership of modules, ensuring the team delivered its best

TECHCHEFS SOFTWARE PRIVATE LIMITED

Client: Central Spaces, Australia | Project: Any Spaces (Feb 2018 – Dec 2018)
Platform: Web app, Mobile (Android & iOS native) | Technology: JIRA, MySQL, Swagger/Postman
Description: B2B application connecting Bookers with Listers of commercial space for rent/lease; three user types (Listers, Bookers, Node/Super Admin).
- Understood application via User Stories and Wireframes; identified E2E scenarios and wrote test cases
- Performed Build Verification Tests, E2E Testing, Regression testing
- Compatibility testing across browsers and platforms; reviewed peer test cases
- Prepared weekly status reports; took ownership of modules

IFOCUS SYSTEC INDIA PRIVATE LIMITED

Client: McAfee | Project: McAfee Mobile Security – Customization & Partner Standard Team (Feb 2017 – Jan 2018)
Platform: Android, iOS, Windows 8/10 | Technology: Bugzilla
Description: Consumer Engineering account delivering customized security products to 300+ active OEM/ISP partners across 32 locales (McAfee LiveSafe, Total Protection, Internet Security).
- Understood client requirements and project functionality; designed and executed test cases
- Tested security products across various OS and multiple locales
- Tested product behavior/customizations in Factory and User mode for OEM and Standard partners
- Performed installation, E2E, platform compatibility, negative, and uninstallation testing
- Bug reporting, tracking, and regression of defects

Client: One Tech Ventures | Project: JARVIZ (Sep 2016 – Feb 2017)
Platform: Web Application | Technology: Test Rail, JIRA
Description: Recruitment platform where recruiters search and shortlist candidates from lakhs of profiles using crawling, algorithms, and machine learning; company-ranking calibrator.
- Prepared keywords for modules from requirements; converted functional requirements into test documents
- Wrote and reviewed test cases; prepared test summary reports
- Performed UI, Functional, Integration, Regression, System, and Backend testing
- Used JIRA to centralize bugs and follow up on defect status
- Involved in review meetings and defect tracking until closure

Client: McAfee | Project: McAfee Mobile Security – Customization Team (Sep 2015 – Sep 2016)
Platform: Android, iOS | Technology: Bugzilla, VMware vSphere Client
Description: Antivirus application (Android, iOS, Blackberry, Symbian) with anti-theft, virus scan, app protection, site advisor, call/SMS filter, Wi-Fi security, battery optimizer.
- Reviewed requirements with product partner managers and converted them into test cases
- Tested and delivered Android APKs for partners using Agile methodology
- Carried out client, web, and home-level testing to ensure highest quality; handled readiness testing
- Extracted logs, identified root cause of issues, and reported in Bugzilla
- Took ownership of projects; conducted training sessions for team members and new joiners

Education: B.E. in Electronics and Communication Engineering, GEC Hassan (2010–2014), 66% aggregate`,
  },

  {
    id: "shrayesh-ba-15yr",
    label: "Shrayesh Sourav — Lead BA · 15+ yrs · Banking/BFS",
    targetRole: "Senior Business Analyst / Product Owner at Deloitte — 15+ yrs BFS domain, KYC/AML and mortgage lending transformation, SAFe Agile leadership, multi-region banking programs",
    cvText: `SHRAYESH SOURAV | Lead Consultant (Business Analyst)
15+ years of experience in Banking Financial Services (BFS), specializing in Customer Onboarding, KYC/AML compliance, Mortgage Lending, Digital Transformation, and Agile Delivery. Translates business needs into functional requirements, leads UAT programs, manages product backlogs, drives enterprise banking transformation. Certified SAFe Agilist, SAFe PO/PM, Pega CSA, and CPBA. Delivered across UAE, Swedish, US, and UK banking organizations.

Certifications: Lead SAFe 5.2 Agilist | SAFe 5.2 PO/PM | Pega Certified System Architect (CSA) | Certified Pega Business Architect (CPBA) | ISTQB Certified Software Test Engineer
Education: Bachelor of Engineering (Mechanical), RGPV, Bhopal

VIRTUSA CORPORATION

Top UAE Bank – Digital Onboarding, KYC/AML Transformation & Mortgage Product Integration (Apr 2021 – Present)
Domain: Banking (Retail & Business Banking) | Role: Lead Consultant (Business Analyst) | Technology: Jira, Pega, Agile, SAFe
Description: Led requirement gathering for digital onboarding journeys and KYC/AML transformation, defined business requirements and user stories, managed product backlogs, drove mortgage product integration, led UAT execution, supported Pega-based workflow automation.
- Led requirement gathering workshops for digital onboarding journeys and KYC/AML transformation initiatives
- Defined business requirements, use cases, process flows, and user stories in Jira; partnered with Product Owners to manage backlogs
- Drove mortgage product integration initiatives within core banking platforms
- Led UAT execution, business sanity validation, and production go-live support
- Supported Pega-based workflow automation and delivered major banking transformation programs

EXPERIENCE PRIOR TO VIRTUSA

Top Sweden Bank – Digital Lending Transformation & Banking Modernization (Jul 2016 – Apr 2021)
Domain: Banking (Retail & Wholesale) | Role: Senior Consultant (BA / Scrum Master) | Technology: Agile, Scrum, Jira, Confluence
Description: Served as Onshore Coordinator, Business Analyst, Scrum Master, Test Lead, and Quality Lead. Facilitated Agile ceremonies, conducted gap analysis, supported digital lending transformation and banking modernization for retail and wholesale platforms.
- Facilitated Agile ceremonies including sprint planning and backlog refinement
- Conducted gap analysis and process improvement initiatives for retail and wholesale banking platforms
- Supported digital lending transformation projects and banking modernization programs
- Translated business needs into functional requirements as Business Analyst
- Worked as Test Lead and Quality Lead, overseeing testing and UAT coordination

Top US & UK Banks – Banking Migration & Transformation Programs (Dec 2010 – Jun 2016)
Domain: Banking & Financial Services | Role: Associate | Technology: HP ALM, Waterfall, SQL
Description: Performed business requirement analysis for banking migration and transformation programs. Led end-to-end testing, defect management, and UAT coordination for large-scale BFS implementations.
- Performed business requirement analysis for banking migration and transformation programs
- Led end-to-end testing, defect management, and UAT coordination
- Supported large-scale BFS implementations across banking and financial services domains
- Collaborated with business users and technical teams to ensure alignment and successful execution
- Contributed to banking migration initiatives, emphasizing process optimization and system integration

Achievements: Managed end-to-end requirement-to-delivery lifecycle for a leading UAE bank's digital transformation initiative | Multiple client appreciations for leading UAT teams under challenging timelines | Worked onsite with a leading Swedish bank, recognized for delivery excellence | Recognized for defect management, quality leadership, and process improvement | Awarded "High Flyer of the Month" twice in Banking & Financial Services Open House`,
  },

  {
    id: "tooshi-rpa-9yr",
    label: "Tooshi Khare — RPA Team Lead · ~9 yrs · Life Sciences",
    targetRole: "RPA Delivery Manager / Automation Practice Lead at Accenture — 9+ yrs RPA operations, Automation Anywhere platform ownership, ITIL service governance, Life Sciences domain, team leadership",
    cvText: `TOOSHI KHARE | RPA Team Lead
Almost 9 years of specialized experience in enterprise operations, major incident management, digital transformation, and intelligent automation within Life Sciences and Manufacturing sectors. Proficient in Automation Anywhere (A360), UI Path, Power Automate, and Python. Expert in ITSM processes (Incident, Problem, Change, Request, Knowledge Management) aligned with ITIL best practices. Leads global support teams, drives service governance, manages escalations, ensures SLA/KPI compliance.

Core Competencies: Automation Anywhere (V11 & A360), UI Path, Power Automate, Autobot, Generative AI, Agentic AI, LLM Integration, Platform Upgrades/Migrations, SaaS Migration, ITIL Operations, Stakeholder Engagement, Agile Team Management, Vendor Coordination
Tools: Automation Anywhere, UI Path, Power Apps (Power Automate/Power BI/Canvas), AWS (EC2, DR), JIRA, Asana, SNOW, Splunk, Cyberark, SharePoint
Certifications: Automation Anywhere | Google Project Management | IBM Product Management | Foundations of SRE | Observability | AI Fluency | Prompt Engineering | Essentials of Gen AI
Education: Integrated B.E. + M.Tech, University Institute of Technology, RGPV, Bhopal

VIRTUSA CONSULTANCY | Project: Eli Lilly (Dec 2021 – Feb 2026)
Role: Senior Software Engineer / RPA Operations Team Lead – Automation Anywhere
- Led end-to-end delivery of enterprise automations across finance, HR, and supply chain operations; mentored a team of 7 analysts, fostering cross-training and ITIL adherence
- Served as first escalation point for the team supporting 120+ bots across Finance, HR, and Supply Chain operations in the Life Sciences domain
- Led end-to-end Incident and Problem Management: rapid root-cause analysis, stakeholder communication, SLA compliance, collaborating with DevOps/infrastructure teams on permanent fixes for recurring production issues
- Collaborated with business and technical stakeholders to gather service requirements, improve ITSM processes, and implement operational changes
- Enhanced incident recovery processes, contributing to a 25% reduction in annual incidents
- Governed weekly and monthly client communications, preparing incident reports, RCA documents, and performance dashboards for leadership and auditors
- Led planning and execution of Automation Anywhere platform upgrades (v11 → A360 v24 → v30), ensuring zero regulatory impact and strict change-control adherence
- Led migration from Automation Anywhere on-prem to cloud (SaaS migration), categorizing bots by risk (RC1 low to RC5 high) with appropriate control levels per category
- Managed planning, scheduling, and execution of migration of 80+ bot runner virtual machines from Windows 10 32-bit to Windows 11 64-bit, ensuring all dependencies were tested before cutover
- Drove platform maintenance: service account password rotation, CAPAs for Change Control, periodic license/account validations
- Facilitated quarterly Disaster Recovery drills on AWS control rooms, aligning with IT regulatory requirements; scheduled load balancer certificate renewals for operational continuity
- Contributed to planning and execution of quarterly DR plan for 5 Control Room AWS servers, ensuring failovers with minimal downtime

TATA CONSULTANCY SERVICES (Dec 2017 – Dec 2021)
Role: RPA Analyst | Technology: UI Path and Autobot
- Developed and supported 25+ automated processes via UI Path and Autobot, ensuring reliable daily runs and preventing reporting delays
- Delivered 15+ process enhancements, reducing recurring incidents and increasing reporting reliability
- Worked as primary incident manager for automation failures — triage, RCA, resolution within tight deadlines
- Maintained incident and change management records using ITIL frameworks for audit traceability
- Partnered with finance teams to validate bot output, ensuring data accuracy in reconciliations and compliance reviews
- Coordinated incident response with cross-functional teams, escalating high-severity issues to leadership
- Conducted post-incident reviews to identify patterns and produce knowledge management documentation`,
  },

  {
    id: "bhonagiri-em-18yr",
    label: "Bhonagiri Naveen Kumar — Assoc. Engineering Manager · 18+ yrs",
    targetRole: "Principal Engineering Manager / Director of Observability at Google — 18+ yrs enterprise observability and SRE, Elastic Stack architecture at scale, large team leadership (40 engineers), multi-cloud platform ownership",
    cvText: `BHONAGIRI NAVEEN KUMAR | Associate Engineering Manager | Elastic Stack Architect | Observability & Cloud Operations Leader
18+ years of IT experience specializing in Enterprise Observability, Elastic Stack (ELK), Cloud Operations, Platform Engineering, and IT Service Management. Deep expertise in Elasticsearch Cluster Administration, Logstash Pipeline Development, Kibana Dashboarding, Performance Tuning, Incident Management across AWS, GCP, Azure, and Kubernetes/EKS. Architected centralized logging and observability platforms from the ground up, managing 20+ Elasticsearch clusters supporting 1TB+ daily log ingestion, leading teams of up to 40 engineers.

Certifications: AWS Certified Solutions Architect | Google Cloud Associate Cloud Engineer | Microsoft Azure Solutions Architect | ITIL Foundation V3 | PMI-ACP
Core Competencies: Elasticsearch Cluster Administration, Logstash Pipeline Development, Kibana Dashboarding, Filebeat/Metricbeat, Elastic Agent, Watcher Alerting, Elastic Common Schema (ECS), Index Lifecycle Management (ILM), Elastic Security, SRE, Incident/Problem Management, RCA, Capacity Planning, High Availability Architecture, Disaster Recovery Planning, AWS, GCP, Azure, Kubernetes, Amazon EKS

Associate Engineering Manager – Observability & Cloud Operations — Virtusa (2022 – Present)
- Architected, implemented, and owned enterprise-scale Elastic Stack observability platforms supporting 1TB/day log ingestion across 20+ clusters
- Provided production support for Elastic Stack performance monitoring and tuning to ensure high availability
- Monitored and troubleshot Elasticsearch indexing failures, cluster health issues, shard allocation, and query performance bottlenecks
- Configured and maintained Logstash pipelines for log ingestion, enrichment, and transformation; managed Filebeat deployments across multiple servers and environments
- Created and maintained Kibana dashboards, visualizations, reports, and alerting solutions
- Performed RCA for missing logs, delayed events, and production incidents
- Monitored CPU, memory, disk usage, JVM health, and node status for cluster stability
- Managed index lifecycle management (ILM), rollover policies, retention, and archival strategies
- Onboarded logs from Linux, Windows, Cisco, F5, Palo Alto, Kubernetes, AWS, and enterprise applications into centralized Elastic platforms
- Responded to production incidents and ensured SLA compliance; documented SOPs, runbooks, and troubleshooting guides
- Managed AWS and GCP cloud operations, IAM, and governance activities; administered Jira and Confluence environments
- Led and mentored a team of 40 engineers across Elastic Stack operations, cloud support, and enterprise monitoring initiatives
- Implemented capacity planning and high availability strategies; performed disaster recovery planning and platform resiliency assessments
- Supported Kubernetes/EKS-based workloads and container monitoring; implemented ECS standards and Elastic Agent onboarding strategies

Technology Lead — Infosys (2012 – 2022)

Technology Lead – MFG ADM (2017–2022): Implemented enterprise centralized logging solutions using Elastic Stack for manufacturing and energy sector clients. Designed Kibana dashboards and operational monitoring solutions for business-critical applications. Set up multiple beats and established secure data transfers from client application sources. Configured alerts via ELK Watcher integrations per client requirements. Held working knowledge of AWS/GCP Cloud Services, managing user permissions, roadmap coordination in Jira, and infrastructure setup including Security Groups and IAM. Assisted users on Atlassian Dashboards and Gadgets; managed JIRA ticket queues for system issues and user requests; integrated JIRA with Confluence via plugins.

Operations Support – MFG IVS ERM DU 3 & 4 (2016–2017): Worked on revenue and volume analysis against BE targets, providing feedback to DMs, GPM, and SPM on respective projects. Participated in BE discussions and helped GPM gather and analyze reports. Handled operational metrics, bench and buffer management for MFG DU 3 and 4. Interacted with clients to understand technical issues and provide solutions.

Support Lead Offshore – BP Upstream (2013–2016): Led the GOO service line support team from offshore, handling custom application support, configuration, and release management. Handled tickets using ITIL processes within predefined SLAs. Took on configuration and release management responsibilities, correcting CMDB records and coordinating RFC approvals and testing after Microsoft patches (QR, ER, SFR). Interacted with clients on monthly updates for critical applications. Coordinated with multiple stakeholders on service improvements and standardized process implementation. Handled Tier 1 and MVS MSR for the entire Infosys BP Upstream account; provided training on Remedy Tool, Incident and Change Management.

Team Lead – BT OPRA FLS & OBIEE Team (2012–2013): Managed the FLS and OBIEE team, ensuring FTR and TAT targets were met per client requirements. Set targets/goals for the process and allocated daily work across team members. Prepared Monthly MSR and led daily/weekly client calls. As OBIEE Analyst, designed and implemented modules, converting and using Oracle BI Apps pre-built RPDs to business requirements.

Key Achievements: Designed and implemented enterprise-wide Elastic Observability Platform from scratch | Managed 20+ Elasticsearch clusters supporting 1TB/day log ingestion | Led a team of 40 engineers across observability, cloud operations, and support functions | Improved platform availability through proactive monitoring, capacity planning, and cluster performance tuning | Implemented enterprise logging standards using ECS and centralized monitoring architecture | Supported Kubernetes/EKS adoption and containerized application monitoring

Education: Bachelor of Science`,
  },

  {
    id: "chandima-qa-8yr",
    label: "Chandima Perera — Lead SE / QA · 8+ yrs · PEGA Insurance",
    targetRole: "QA Engineering Manager / Test Automation Lead at Cognizant — 8+ yrs manual + automation QA leadership, PEGA/insurance domain, Selenium/Java automation frameworks, mentoring and delivery ownership",
    cvText: `CHANDIMA PERERA | Lead Software Engineer | Virtusa Corporation
8+ years of experience in tool designing, developing, releases & support, manual/functional/API/UI/integration/E2E/regression testing. Strong programming in Java, JavaScript, PHP, C, C++. Team management, mentoring, and system design/implementation experience.

Core Competencies: Web Application Development, Manual Software Testing, Test Planning/Case Design/Defect Management, Team Leadership, System Design, Selenium WebDriver + Java automation, SDLC/Agile/Hybrid Testing
Tools: Java, PHP, Node.js, HTML5/CSS3/Bootstrap, JavaScript, REST API, jQuery, Hibernate, JSP, IoT, Jenkins, JIRA, TOAD for Oracle, Postman, IntelliJ IDEA, Eclipse, Apache Tomcat, SQL/MySQL, Selenium, AWS/Azure Cloud, JMeter, RTM
Education: B.Tech (Hons) Computer Engineering, The Open University of Sri Lanka, 2017
Certifications: AMIE (Sri Lanka) — Institution of Engineers Sri Lanka | ECSL (Sri Lanka) — Engineering Council Sri Lanka

VIRTUSA CORPORATION

NYL Insurance — VS 3YR FC Purchase Experience Tech (Mar 2026 – May 2026) | Senior Consultant
Technology: Manual Testing, Postman, JIRA, Toad for Oracle, Orchestrator App, WinSCP
Description: "Claims Central" — PEGA CRM application handling all claims processing for Life and Annuity policies, integrated payment systems and self-service portal.
- Attended Claims Prod Incidents & Problem Tickets Review sessions
- Played a leadership role coordinating with the Dev team to reproduce production defects on lower environments
- Validated Life & Annuity side production defects; clarified test scenarios with Product Owners

NYL Claims Transformation 2023 (Jun 2023 – Feb 2026) | Senior Consultant
Technology: NATS (NYL AI Test Synthesizer) App, Orchestrator App, Manual Testing, Automation with MABL, Postman, JIRA, Toad for Oracle, WinSCP
Description: "Claims Central" PEGA CRM for Life and Annuity claims processing
- Created detailed test cases from acceptance criteria; requested test data from the Lab team
- Executed manual functional, regression, and smoke testing; performed testing with mockup data when real data was unavailable
- Identified and tracked defects in JIRA; conducted correspondence-side demos to client
- Gave KT to new team members on the send-letter workflow; prepared letter defaulting matrix for correspondence
- Validated Life and Annuity side Letters & XMLs; worked with Claims Central's payment-related systems
- Studied automation with the MABL tool; participated in grooming, sprint planning, and retrospectives

Automation Flex – Enhancement Team (Sep 2022 – Jun 2023) | Consultant
Technology: Java, Selenium, AWS Management Console, HTML, CSS, Bootstrap, PHP, MySQL, JSON
Description: Accello DTA — Virtusa's award-winning proprietary test automation framework generating lean test scripts from a conceptual abstract model; supports Appium, SeeTest, Selenium, HP UFT across Web, Desktop, Database, Webservices, Mainframe, Mobile.
- Fixed vulnerabilities across AZUVTAFFLEX01, azuglobflex1, and AZUGLOBFLEX2 servers; resolved Azure VM access issues
- Generated AMI for Accello-DTA-RunTime instance; prepared Outlook Mail Trigger Configuration User Guide
- Designed and implemented the Accello Demo site end-to-end (UI, backend, database) for automation presales: login, customer register/manage, dashboard, bill payment, fund transfer, e-statement, transaction history with Excel/PDF download, bulk user data uploading with CSV templates
- Developed exchange-rate data integration from API into dashboard; built data filtering, pagination, and validation
- Gave KT to the domain team on vulnerability remediation after Apache server setup; fixed Jenkins and Nexus certificate issues

Coaching Portal – Enhancement (Aug 2022 – Sep 2022) | Consultant | Java, JavaScript, JSP, MySQL
Description: HR Leadership Development platform tracking individual coach behaviour and centralizing previously-manual activities to train senior Virtusa leaders as certified Leadership Coaches.
- Designed and implemented upload/view coach profile (JSP frontend, Java backend, MySQL database) and user profile sliding UI
- Conducted demos for the Indian team; provided production server support

Cloud Academy Project (Jun 2022 – Jul 2022) | Consultant | AWS CloudFormation
- Played a leadership role guiding the team to set up Accello DTA Labs, Exams, and Learning Path in Cloud Academy
- Created Labs, Exams & Learning Path for the Accello-DTA library category; conducted demos to senior leadership

IJP Enhancement – Backup Process (Mar 2022 – Apr 2022) | Consultant | JavaScript, HTML, CSS, Bootstrap, PHP, MySQL
- Designed and implemented timestamped backup capability for the Internal Job Portal's location RM data uploads
- Fixed post-enhancement defects; managed migration of the tool into domain servers

Coaching Portal (Jan 2021 – Mar 2022) | Associate Consultant | Java, JavaScript, JSP, MySQL
- Designed and implemented frontend (JSP), backend (Java), and database application; implemented AD authentication via SSO
- Integrated an RPA Bot for email triggering; created CSR file and installed server certificate
- Fixed defects across phases 1 and 1.1; participated in UAT sessions

IJP Enhancement – Data Uploader (Nov 2020 – Dec 2020) | Associate Consultant | JavaScript, HTML, CSS, Bootstrap, PHP, MySQL
- Designed and implemented the Internal Job Portal upload enhancement enabling employees to view and apply for internal vacancies

ROI Project (Aug 2020 – Oct 2020) | Associate Consultant | HTML, CSS, Bootstrap, PHP, MySQL
- Designed and implemented a Return on Investment evaluation system for account leadership project decisions
- Integrated an RPA Bot for email triggering to leadership

HNB Bank — Finacle Upgrade QA Project (Jan 2020 – May 2020) | Associate Consultant | Manual Test Design
Description: HNB's Finacle core banking system covering core banking, e-banking, treasury, wealth management, and CRM.
- Designed Mind Maps for HNB customization; wrote and peer-reviewed manual test cases
- Performed smoke, functional, regression, integration, and system testing; defect reporting and tracking

MERS Project (Oct 2019 – Dec 2019) | Engineer | HTML, CSS, Bootstrap, PHP, MySQL
Description: Mammographic Examination Registration System for the National Hospital, Colombo
- Played a leadership role guiding the team; designed and implemented the web application; conducted demos to client and leadership`,
  },

  {
    id: "naveen-pm-20yr",
    label: "Naveen Jeevan Kelkar — Project Manager / Delivery · 20+ yrs",
    targetRole: "Senior Program Manager / Delivery Director at Accenture — 20+ yrs IT service delivery leadership, banking and healthcare domains, data visualization and BI reporting, large-scale managed services",
    cvText: `NAVEEN JEEVAN KELKAR | Project Manager — Service Delivery Management, Delivery | Virtusa Corporation
20+ years of experience managing IT service delivery, data analytics/visualization, and project/program management in Banking and Healthcare domains.

Core Competencies: IT Service Delivery Management, Project Management, Data Visualization Principles, Data Connectivity & Integration, Business Process Reengineering, Team Leadership, DAX, Power Query, Data Storytelling, Power BI Dashboard Design, Data Modeling
Tools: MS Power BI, MS Office, MS Power Apps, MS Project, MS SharePoint, Shell, Perl, VB, Excel VBA, HTML, jQuery, CSS, SharePoint Site Development, JIRA, ServiceNow, BMC Remedy, CA Service Desk, MAXIMO, ITSM (Incident/Change Management)
Education: MBA (Information Systems), SMU-DE, 2019 | B.Sc (Information Technology), SMU-DE, 2014
Certifications: Certified Scrum Master (Scrum Alliance) | AWS Certified Solutions Architect – Associate | PL-300 Microsoft Power BI Data Analyst

VIRTUSA CORPORATION

AstraZeneca Account — EUIT BAU Managed Services (Aug 2025 – Present) | Project Manager - Delivery
Description: AstraZeneca Enabling Units IT (EUIT) — technology/digital division supporting internal non-scientific business functions, managing 200+ in-house and third-party applications globally across India, Mexico, and UK hubs.
- Oversaw corporate systems management for enterprise applications spanning Sustainability, Corporate Affairs, Legal, HR, and Finance
- Supported data and AI infrastructure — scalable data architectures driving operational excellence and generative AI functionality
- Contributed to enterprise integration, architecting pipelines linking internal platforms (ServiceNow, Concur) with global business processes

Citibank — Platinum Account: SBU Markets Technology & Data Engineering (Apr 2024 – Jul 2025) | Individual Contributor
Technology: Power BI, MS SharePoint
- Created and maintained SBU-level dashboards using Excel, SharePoint, and Power BI
- Delivered data visualization of Revenue, Margin, Training, and Operational Data received periodically
- Supported SBU Delivery Directors with day-to-day people management activities and efficient reporting for quick decision-making

Elevance Health (Anthem) — Healthcare (Jan 2020 – Mar 2024) | Project Manager - Delivery
Technology: Project Management, Agile Development Team Management, Power BI Dashboards
Description: Anthem serves 108M+ people including 42M+ within its health plans. Built Solution Central with PEGA Customer Service to centralize and contextualize customer service calls.
- Created and maintained Power BI Dashboards helping Management with People Management and various reporting

Citibank — Data Quality Portfolio: Trade Surveillance (Jun 2019 – Dec 2019) | Project Manager - Delivery
Description: Surveillance system monitoring market manipulation, fraud, and behavioral patterning across all asset classes — MANTAS (rules-based), APAMA (principles-based), SMARTS (exchange-based cash equities), Information Barrier Surveillance Group (MNPI misuse detection), Retail Brokerage Trade Surveillance (sales practice/portfolio suitability)
- Managed delivery consolidating multiple alert-generation engines onto one platform with consistent workflow across regions and LOBs

Citibank — Institutional Client Group: TTS Production Support (Nov 2018 – May 2019) | Project Manager - Delivery
Description: Citi Treasury and Trade Solutions (TTS) — cash management and trade finance for multinational corporations, financial institutions, and public sector organizations
- Delivery oversight for production support across 100+ applications supporting TTS information technology infrastructure

First Data Corporation — Banking (Jun 2016 – Oct 2018) | Project Manager - Delivery
Description: FDC re-platforming project implementing new MFT architecture for secure/diverse protocol file transfer (SFTP, FTPS, HTTPS)
- Delivered greater routing/protocol flexibility, security, faster partner onboarding, and consolidation of multiple MFT systems

EXPERIENCE PRIOR TO VIRTUSA

BA Continuum India Pvt. Ltd. — Sr. Analyst, Banking (Apr 2009 – Jun 2016) | Individual Contributor
Technology: Legacy CLEAR, IBM Sterling B2B Integrator (Gentran Integration Suite), IBM Sterling File Gateway/Secure Proxy/Control Center, ML Clear, BA Clear, IBM Connect:Direct, Mainframe TSO/ISPF, CA7, MOVEit, JMS
Description: Data Transaction/Transformation Services (DTS) for Bank of America — secure information movement serving 35,000+ institutional clients, 75,000+ accounts, 6M+ transactions executed monthly

Satyam Computer Services Ltd. — Sr. Systems Engineer, Banking (Nov 2007 – Apr 2009)
Technology: Legacy CLEAR, IBM Sterling B2B Integrator, IBM Connect:Direct, Mainframe TSO/ISPF, CA7, MOVEit, JMS
- Managed client account provisioning via JCL and control cards; job testing, abend resolution, Endevor
- Maintained client interaction for transmission/connectivity troubleshooting, incident monitoring, and change management
- Supported Merrill Lynch CLEAR ("Client Electronic Access and Reporting") for secure file exchange between Merrill Lynch and external trading/business partners`,
  },

  {
    id: "anudeep-sdet-7yr",
    label: "Anudeep Anugonda — Lead SDET / QA Automation · 7+ yrs",
    targetRole: "QA Automation Architect / SDET Lead at Deloitte — 7+ yrs Java-based automation frameworks, API testing, CI/CD pipeline ownership, banking domain, cross-functional quality leadership",
    cvText: `ANUDEEP ANUGONDA | Lead Software Engineer – Quality Engineering & Automation
7+ years of expertise in automation testing, API engineering, and end-to-end quality assurance. Strong Java-based automation frameworks, API testing, and test strategy design for complex integrated systems. Hands-on with Selenium, Rest Assured, UFT, Robot Framework, and BDD (Cucumber).

Achievements: Certificate of appreciation for on-time deliverable commitment | Super Squad Award for one of the most complex PEGA application upgrades with zero production defects

Technical Skills:
Automation Frameworks: Hybrid BDD Test Automation Framework (Cucumber + TestNG with Page Object Model), Selenium WebDriver, REST Assured
Other Tools: Microsoft Dynamics 365, PEGA, Windsurf (AI)
Languages: Java (Java 17)
Testing: UI/API/Functional/Regression Testing, Manual & Automated Testing, Risk-Based Testing, Defect Analysis, Debugging
API & Web Services: REST, SOAP, Postman
CI/CD: GitLab CI, Jenkins, Maven
Test Management: Zephyr Scale, Jira, Extent Reports
Data Handling: Apache POI (Excel), JSON, log4j2
Methodology: Agile

VIRTUSA CONSULTING SERVICES PVT. LTD., Hyderabad

Senior Lead Software Engineer (Aug 2024 – Present) | Client: Bank of New York (BNY)
- Designed and automated functional test cases, identified automation-ready scenarios, and delivered in-sprint automation, enabling faster regression cycles and improved release stability
- Monitored, maintained, and optimized GitLab CI pipelines executing Regression, Smoke, and Sanity test suites — analyzed failures, resolved test data issues, and significantly reduced pipeline flakiness
- Reviewed and approved GitLab Merge Requests as a senior team member, ensuring code quality, managing branch merges, and supporting the team on merge conflicts and integration issues
- Leveraged Zephyr test management integrated with Jira to create Traceability Matrices, Release Summary Reports, and Test Closure Reports (TCR), coordinating stakeholder reviews and securing formal sign-off from Project Management
- Actively participated in Agile ceremonies (Daily Stand-ups, Sprint Planning, Backlog Refinement, Sprint Reviews, Retrospectives)
- Analyzed production defects and delivered detailed Root Cause Analysis (RCA) to prevent recurrence and improve application quality

Lead Consultant - PEGA (Aug 2023 – Jul 2024) | Client: Elevance Health – NextGen-GBD – Health Care
- Worked on development of Pega Customer Service application "Solution Central" for Anthem
- Analyzed complex business requirements to architect comprehensive test strategies ensuring full feature coverage
- Conducted automation feasibility assessments to prioritize high-impact test cases, optimizing resource allocation and sprint velocity
- Developed modular automation scripts using Selenium and Cucumber, building a scalable and reusable testing framework
- Executed rigorous failure analysis identifying root causes, collaborating with developers to accelerate bug resolution
- Performed proactive impact analysis on shifting requirements to maintain script integrity and minimize technical debt

Other Projects at Virtusa:
- Elevance Health – NextGen Pega Upgrade (v8.4 to v8.8), Health Care | Consultant | PEGA | Mar 2023 – Aug 2023
- Elevance Health – Compass and Solution Central, Health Care | Consultant | PEGA | Jun 2021 – Jan 2023
- Elevance Health – NextGen Pega Upgrade (v7.2 to v8.4), Health Care | Associate Consultant | PEGA | Jul 2020 – Jun 2021
- Vodafone UK – Cove Canary, Telecom | Senior QA Engineer | Manual Testing | Jan 2020 – Apr 2020
- RBS – LDCR, Banking | Senior Consultant | Manual Testing | Oct 2019 – Dec 2019

Education: B.Tech (Mechanical), Sri Indu College of Engineering and Technology, Hyderabad, 2012`,
  },

  {
    id: "vaishnavi-analyst-3yr",
    label: "Malladi Vaishnavi — Associate Engineer / Data Analytics · ~3 yrs",
    targetRole: "Data Analyst / BI Developer at Accenture — 3+ yrs SQL/Python data analysis, Tableau/Power BI dashboard development, first step up from associate to full analyst ownership",
    cvText: `MALLADI VENKATA VAISHNAVI | Associate Engineer – Technology | Virtusa Corporation
Detail-oriented data analytics professional with strong SQL skills for data extraction, analysis, and reporting. Experienced in Tableau and Power BI dashboards for data-driven decision-making. Familiar with cloud fundamentals and modern analytics tools.

Tools & Technologies: Python, C, Core Java, Oracle DB, MySQL, HTML, CSS, Tableau, Power BI, ETL (basic), Microsoft Azure, Power Automate, Linux (basics), Generative AI

Technical Responsibilities:
- Delivered data analysis and BI solutions using SQL (Oracle, MySQL, PLX) and Python for business and product insights
- Designed and maintained Tableau and Power BI dashboards, converting stakeholder requirements into clear KPIs and visual reports
- Built end-to-end dashboards including requirement gathering, data extraction, transformation, and visualization
- Automated reporting and analytics workflows using Python and Google App Scripts, reducing manual effort and turnaround time
- Supported the project handling analytics requests, feature metrics, and dashboards via Buganizer, managing multiple projects within SLAs
- Collaborated with cross-functional analytics teams on dashboard development, automation, and data migration initiatives

Education: Professional Certificate in Data Analytics and Generative AI, IIT Kanpur | B.Tech Computer Science and Engineering, Geethanjali College of Engineering and Technology — 8.3 CGPA (2022) | Intermediate (MPC), Sri Chaitanya Junior College — 91.8% (2018)

Certifications: Microsoft Certified Power BI Data Analyst Associate (PL-300) 2025 | Microsoft Certified Azure AI Fundamentals (AI-900) 2025 | Oracle Certified Associate Java SE 8 Programmer 2024 | Oracle Database SQL Certified Associate (1Z0-071) 2023 | Career Essentials in Generative AI (Microsoft/LinkedIn) 2023 | Microsoft Certified Azure Fundamentals (AZ-900) 2023 | ITIL v4 Foundation 2022

PROJECTS AT VIRTUSA

Google Core Search (Aug 2025 – Present)
Technology: SQL (PLX Scripts), PLX, Buganizer, AppScript
- Developed data analysis and BI solutions supporting Google Core Search niche testing initiatives
- Built and maintained dashboards tracking KPIs, feature performance, and testing metrics for stakeholders
- Automated reporting workflows to improve efficiency and enable timely, data-driven decision-making

Google Ads – Automated Site Links (ASL) (Sep 2023 – Dec 2024) | Role: KPO Analyst
Technology: EWOQ
- Provided analytical and operational support to the Google Ads ASL team
- Assisted analysts in optimizing site link automation and ensuring quality standards
- Used internal tools like EWOQ to track performance metrics and support campaign improvements`,
  },
];
