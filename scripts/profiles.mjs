/**
 * 20 IT professional profiles for batch coaching simulation.
 * Spread across 5 coaching tracks, 3–15 years experience,
 * and diverse career patterns: long-stayer, frequent-switcher,
 * tech-switcher, domain-switcher, internal-promoter, contractor.
 */

export const PROFILES = [
  // ─── TRACK 1: TECHNICAL DELIVERY ─────────────────────────────────────────
  {
    id: "ravi-java-6yr",
    label: "Java Backend · 6 yrs · one company",
    targetRole: "Senior Java Backend Engineer at Infosys — 7+ years Java/Spring Boot, microservices, AWS, strong delivery track record",
    cvText: `RAVI KUMAR | Bangalore | ravi.kumar@email.com
Senior Software Engineer — HCL Technologies (Apr 2022–Present)
- Was involved in migration of a monolithic banking application to microservices
- Worked on REST APIs using Spring Boot and Java 11
- Participated in code reviews and sprint planning
- Had exposure to AWS services like EC2 and S3
Software Engineer — HCL Technologies (Jun 2019–Mar 2022)
- Developed features for an e-commerce platform
- Worked on database queries using MySQL
- Assisted the team in fixing production bugs
Junior SE — Mphasis (Jul 2018–May 2019)
- Responsible for writing unit tests | Good knowledge of Git
Skills: Java, Spring Boot, Hibernate, MySQL, PostgreSQL, AWS, Docker, Maven
Education: B.Tech CS, VTU 2018, CGPA 7.8 | AWS Dev Associate 2023`
  },
  {
    id: "arjun-python-7yr",
    label: "Python/Data Eng · 7 yrs · three companies",
    targetRole: "Data Engineering Lead at Wipro — 7+ yrs Python/Spark, AWS/GCP, pipeline architecture, team leadership",
    cvText: `ARJUN MEHTA | Pune | arjun.mehta@email.com
Senior Data Engineer — Persistent Systems (Jan 2022–Present)
- Was responsible for building data pipelines for a retail analytics client
- Worked on PySpark jobs running on AWS EMR
- Participated in architecture discussions with the client team
- Was involved in migrating legacy ETL jobs to cloud-native pipelines
Data Engineer — Mindtree (Mar 2019–Dec 2021)
- Worked on Python-based ETL pipelines for financial services
- Assisted senior engineers in designing data models
- Was part of a 5-member data team
- Good knowledge of Apache Airflow and Kafka
Software Engineer (Python) — TCS (Jul 2017–Feb 2019)
- Was involved in building backend microservices
- Worked on REST APIs using Flask and FastAPI
Skills: Python, PySpark, Airflow, Kafka, AWS (EMR, S3, Glue), GCP BigQuery, dbt
Education: B.Tech IT, SPPU Pune 2017 | GCP Data Engineer certification 2022`
  },
  {
    id: "sanjay-dotnet-9yr",
    label: ".NET Architect · 9 yrs · one company (long stayer)",
    targetRole: ".NET Solutions Architect at IBM India — 8+ yrs .NET/Azure, enterprise architecture, multi-team technical leadership",
    cvText: `SANJAY IYER | Chennai | sanjay.iyer@email.com
Lead .NET Developer — Capgemini India (Aug 2015–Present)
- Was involved in designing enterprise solutions for insurance clients
- Worked on .NET Core applications deployed on Azure
- Participated in architecture reviews and technical steering committees
- Was responsible for leading a team of 8 developers
- Assisted in transitioning a monolithic .NET Framework app to microservices
- Was involved in client demos and requirement workshops
Senior .NET Developer — Capgemini India (Jun 2018–Jul 2020) [promoted internally]
- Worked on SOAP and REST integrations with third-party insurance systems
- Participated in code reviews
Junior .NET Developer — Capgemini India (Aug 2015–May 2018)
- Was part of a maintenance team for legacy VB.NET applications
Skills: .NET Core, C#, Azure (App Service, Functions, SQL), Entity Framework, Microservices, Docker
Education: B.E. IT, Anna University 2015 | Azure Solutions Architect Expert 2021`
  },
  {
    id: "sneha-react-4yr",
    label: "React/Node · 4 yrs · frequent switcher (3 companies)",
    targetRole: "Senior Frontend Engineer at Flipkart — 4+ yrs React/TypeScript, performance-critical consumer apps",
    cvText: `SNEHA REDDY | Hyderabad | sneha.reddy@email.com
Frontend Engineer — UrbanLadder (Mar 2023–Present)
- Was responsible for building React components for the product listing pages
- Worked on improving page load performance — reduced load time from 4s to 2.1s
- Participated in design system creation with the UX team
Frontend Developer — NoBroker (Aug 2021–Feb 2023)
- Was involved in rebuilding the property search UI using React and Redux
- Worked on A/B testing infrastructure with the growth team
- Was part of a 6-member frontend team
Junior Developer — Bounce (Jun 2020–Jul 2021)
- Worked on React Native mobile app features
- Assisted senior developers in resolving UI bugs
Skills: React, TypeScript, Redux, Next.js, Node.js, GraphQL, Webpack, Jest
Education: B.Tech CS, JNTU Hyderabad 2020`
  },
  // ─── TRACK 2: PLATFORM SPECIALIST ────────────────────────────────────────
  {
    id: "priya-sf-8yr",
    label: "Salesforce · 8 yrs · one company",
    targetRole: "Salesforce Technical Lead at Cognizant — 8+ yrs Salesforce, Sales/Service Cloud, Apex and LWC, client-facing delivery",
    cvText: `PRIYA SHARMA | Hyderabad | priya.sharma@email.com
Salesforce Senior Consultant — Wipro Digital (Jan 2021–Present)
- Was responsible for Salesforce implementations for insurance and retail clients
- Worked on Sales Cloud and Service Cloud configurations
- Involved in writing Apex classes and triggers
- Was part of a 6-member Salesforce team
- Assisted in preparing solution design documents
Salesforce Developer — Wipro Digital (Aug 2018–Dec 2020)
- Worked on customising Salesforce for a financial services client
- Was involved in data migration from legacy CRM to Salesforce
- Did LWC development for community portal
Salesforce Trainee — Hexaware Technologies (Jun 2016–Jul 2018)
- Was responsible for Salesforce admin tasks | Worked on reports and dashboards
Certifications: Platform Dev I, Admin, Sales Cloud Consultant, Service Cloud Consultant
Skills: Apex, LWC, Visualforce, SOQL, REST APIs, MuleSoft (basic)`
  },
  {
    id: "divya-sap-12yr",
    label: "SAP FICO · 12 yrs · two companies (internal promoter then switch)",
    targetRole: "SAP FICO Lead Consultant at Deloitte — 10+ yrs SAP FICO S/4HANA, full implementation lifecycle, client leadership",
    cvText: `DIVYA PATEL | Mumbai | divya.patel@email.com
SAP FICO Senior Consultant — Accenture (Jan 2020–Present)
- Was involved in S/4HANA greenfield implementation for a pharma client
- Worked on financial closing processes, asset accounting, profit centre accounting
- Participated in business blueprint workshops
- Was responsible for leading a team of 3 junior consultants
- Assisted the project manager in client status updates
SAP FICO Consultant — Infosys (Jul 2012–Dec 2019)
- Was part of multiple SAP ECC rollouts across APAC region
- Worked on accounts payable, accounts receivable, general ledger configuration
- Participated in user acceptance testing and training
- Was involved in post-go-live support activities
Skills: SAP FICO, S/4HANA, ECC 6.0, Asset Accounting, Profit Centre, COPA, ABAP (basic)
Education: CA Inter, ICAI | B.Com, Mumbai University 2012 | SAP FICO Certified 2015`
  },
  {
    id: "rahul-servicenow-6yr",
    label: "ServiceNow · 6 yrs · tech-switcher (Java→ServiceNow)",
    targetRole: "Senior ServiceNow Developer at Cognizant — 5+ yrs ServiceNow ITSM/ITOM, integrations, platform customisation",
    cvText: `RAHUL GUPTA | Noida | rahul.gupta@email.com
ServiceNow Developer — HCL Technologies (Mar 2021–Present)
- Was involved in ServiceNow ITSM implementation for a UK banking client
- Worked on incident, problem, change management modules
- Was responsible for building integration between ServiceNow and Jira
- Participated in daily standups and sprint reviews with the client team
- Was part of a 4-member ServiceNow team
ServiceNow Associate Developer — HCL Technologies (Jun 2019–Feb 2021)
- Worked on workflows and business rules
- Assisted senior developer in client-specific customisations
Software Engineer (Java) — TCS (Jul 2017–May 2019)
- Was involved in building REST APIs for a telecom client using Spring Boot
- Worked on Oracle DB queries and stored procedures
Certifications: ServiceNow Certified Application Developer (CAD), Certified System Administrator (CSA)
Skills: ServiceNow, JavaScript, Glide API, REST/SOAP integrations, Java, Spring Boot`
  },
  {
    id: "arun-pega-10yr",
    label: "Pega BPM · 10 yrs · two companies",
    targetRole: "Pega Lead Architect at Deloitte — 10+ yrs Pega PRPC/Infinity, case management, decisioning, team mentoring",
    cvText: `ARUN PILLAI | Bangalore | arun.pillai@email.com
Senior Pega Developer — Mphasis (Jan 2019–Present)
- Was responsible for Pega case management solution for a US insurance client
- Worked on Pega decisioning and Next Best Action
- Was involved in conducting design reviews and code walkthroughs
- Participated in pre-sales solution demonstrations
- Was part of Pega Centre of Excellence at Mphasis
Pega Developer — Cognizant (Aug 2014–Dec 2018)
- Worked on Pega PRPC implementations for BFSI clients
- Was involved in requirements gathering and process flow design
- Assisted architects in solution design
- Worked on integration with external systems using REST and SOAP
Certifications: Pega CSSA (Certified Senior System Architect), CPBA (Certified Business Architect)
Skills: Pega Infinity, PRPC 7.x/8.x, Case Management, Decisioning, BPM, REST, SOAP`
  },
  // ─── TRACK 3: MANAGEMENT DELIVERY ────────────────────────────────────────
  {
    id: "vikram-dm-11yr",
    label: "Delivery Manager · 11 yrs · one company",
    targetRole: "Programme Manager at Accenture — 10+ yrs IT delivery, programme governance, P&L ownership, client relations at VP/Director level",
    cvText: `VIKRAM NAIR | Mumbai | vikram.nair@email.com
Delivery Manager — TCS (Sep 2019–Present)
- Managed delivery of IT projects for a UK banking client
- Was responsible for managing a team of 35+ engineers and BAs
- Responsible for project planning, risk management, and stakeholder reporting
- Worked with client leadership on roadmap discussions
- Was involved in P&L management for the account
- Ran weekly governance meetings
Project Manager — TCS (Mar 2016–Aug 2019)
- Managed agile delivery for a retail client in the US
- Was responsible for a team of 18 people
- Tracked risks and issues using RAID log
Senior BA — TCS (Jun 2013–Feb 2016)
- Was involved in requirements gathering for core banking transformation
Certifications: PMP, Prince2 Practitioner, CSM
Education: MBA Operations, Symbiosis 2013 | B.Tech Electronics, KTU 2011`
  },
  {
    id: "anand-scrummaster-8yr",
    label: "Agile/Scrum · 8 yrs · four companies (switcher)",
    targetRole: "Enterprise Agile Coach at Infosys — 8+ yrs Scrum Master/Agile, scaled frameworks (SAFe/LeSS), coaching multiple teams",
    cvText: `ANAND KUMAR | Bangalore | anand.kumar@email.com
Scrum Master — Mindtree (Jul 2022–Present)
- Was responsible for facilitating scrums for 3 development teams
- Worked on impediment removal and stakeholder communication
- Participated in PI Planning ceremonies under SAFe framework
- Was involved in coaching teams on agile practices
Scrum Master — NIIT Technologies (Jan 2020–Jun 2022)
- Was part of an agile transformation programme for a logistics client
- Worked on Sprint ceremonies and retrospectives
- Assisted the RTE in organising PI Planning
Scrum Master / BA — Tech Mahindra (Apr 2017–Dec 2019)
- Was responsible for dual role as Scrum Master and Business Analyst
- Worked with product owners on backlog refinement
Agile Analyst — Mphasis (Jun 2015–Mar 2017)
- Was involved in supporting the transition from waterfall to agile
Certifications: CSM, SAFe SPC 5.0, PSM II, PMI-ACP
Education: B.Tech CS, VTU Bangalore 2015`
  },
  {
    id: "pooja-pmo-14yr",
    label: "PMO → Programme Mgr · 14 yrs · long stayer (one company)",
    targetRole: "VP Delivery at Capgemini — 12+ yrs IT programme governance, executive stakeholder management, P&L above INR 50Cr",
    cvText: `POOJA JOSHI | Pune | pooja.joshi@email.com
Programme Manager — Wipro (Apr 2019–Present)
- Was responsible for oversight of a portfolio of 6 projects for a BFSI client
- Worked with C-suite stakeholders on quarterly business reviews
- Was involved in P&L management — portfolio budget of INR 48 crore
- Participated in resource planning and capacity management
- Was part of Wipro's delivery excellence committee
Delivery Manager — Wipro (Jan 2015–Mar 2019)
- Managed delivery for a European retail transformation programme
- Was responsible for a team of 28 people across 3 geographies
Project Manager — Wipro (Jun 2011–Dec 2014)
- Was involved in managing waterfall and hybrid-agile projects
- Participated in bid management and proposal writing
PMO Analyst — Wipro (Aug 2009–May 2011)
- Was responsible for tracking project status and preparing dashboards
Certifications: PgMP, PMP, ITIL v4 Expert
Education: MBA, Symbiosis Pune 2009 | B.E. CS, Pune University 2007`
  },
  // ─── TRACK 4: BUSINESS ANALYSIS ──────────────────────────────────────────
  {
    id: "neha-ba-5yr",
    label: "Business Analyst · 5 yrs · two companies",
    targetRole: "Senior Business Analyst at Capgemini — 5+ yrs BA in financial services, process mapping, stakeholder management",
    cvText: `NEHA SINGH | Pune | neha.singh@email.com
Business Analyst — Infosys BPM (Mar 2021–Present)
- Was responsible for gathering and documenting requirements for a UK insurance client
- Worked with stakeholders to understand as-is processes
- Prepared process flow diagrams and BRDs
- Was involved in UAT coordination and defect tracking
Business Analyst — Infosys BPM (Jul 2019–Feb 2021)
- Worked on a claims processing automation project
- Was responsible for documenting functional requirements
Junior BA — Syntel (Jun 2018–Jun 2019)
- Was involved in supporting senior BAs
- Responsible for maintaining requirement traceability matrix
Skills: BRD, User Stories, Process Mapping, MS Visio, JIRA, BPMN
Certifications: ECBA (IIBA 2020) | Education: B.Com Finance, Pune University 2018 | 68%`
  },
  {
    id: "meera-sr-ba-10yr",
    label: "Senior BA/Functional · 10 yrs · domain-switcher (insurance→banking→retail)",
    targetRole: "BA Manager at HSBC India — 10+ yrs BA, financial services domain, team leadership, process optimisation",
    cvText: `MEERA IYER | Chennai | meera.iyer@email.com
Lead Business Analyst — Tata Consultancy Services (Jan 2020–Present)
- Was responsible for business analysis for a digital banking transformation
- Worked with senior stakeholders across product, technology, and compliance
- Was involved in leading a team of 4 junior BAs
- Participated in Agile Release Trains and SAFe ceremonies
- Was responsible for managing product backlog with the product owner
Senior BA — Capgemini (May 2016–Dec 2019)
- Was part of a core banking replacement programme for a Middle East bank
- Worked on process mapping for trade finance and lending workflows
- Participated in vendor evaluation for digital banking platforms
Business Analyst — Accenture (Aug 2014–Apr 2016)
- Was involved in insurance claims automation for a US insurer
- Worked on requirement elicitation and process redesign
Skills: BRD, FSD, UML, Process Mapping, SQL, JIRA, Confluence, Agile/SAFe
Education: MBA Finance, IIM Kozhikode 2014 | B.Tech IT, Anna University 2012`
  },
  // ─── TRACK 5: INFRASTRUCTURE / OPS ───────────────────────────────────────
  {
    id: "kiran-devops-6yr",
    label: "AWS DevOps · 6 yrs · three companies + startup",
    targetRole: "Cloud Architect at Mindtree — 6+ yrs AWS/Terraform/Kubernetes, infrastructure design, zero-downtime deployments",
    cvText: `KIRAN RAO | Bangalore | kiran.rao@email.com
DevOps Engineer — Hasura.io (startup) (Mar 2022–Present)
- Was involved in building and maintaining CI/CD pipelines on GitHub Actions
- Worked on Kubernetes clusters on AWS EKS — managed clusters for 15+ microservices
- Was responsible for infrastructure-as-code using Terraform
- Participated in on-call rotation and incident response
- Was involved in reducing deployment time from 45 mins to 8 mins
DevOps Engineer — Persistent Systems (Jun 2020–Feb 2022)
- Worked on migrating on-premises workloads to AWS for a healthcare client
- Was part of a 4-member DevOps team
Cloud Analyst — TCS (Aug 2018–May 2020)
- Was involved in AWS infrastructure setup for new projects
- Worked on monitoring using CloudWatch and Grafana
Certifications: AWS Solutions Architect Professional, CKA (Kubernetes)
Skills: AWS, Terraform, Kubernetes, Docker, GitHub Actions, Jenkins, Python, Prometheus`
  },
  {
    id: "preethi-sre-9yr",
    label: "SRE/Platform Eng · 9 yrs · one company (long stayer, internal growth)",
    targetRole: "SRE Lead at Google India — 9+ yrs SRE, production systems at scale, SLO ownership, toil reduction",
    cvText: `PREETHI M | Bangalore | preethi.m@email.com
Senior SRE — Flipkart (Jan 2020–Present)
- Was involved in owning SLOs and error budgets for the Flipkart payments platform
- Worked on reducing MTTR for Tier-1 incidents from 47 mins to 11 mins
- Was responsible for building runbooks and postmortem culture
- Participated in capacity planning for Big Billion Days — handled 3x normal traffic spike
- Was involved in migrating alert pipelines from Nagios to Prometheus/Alertmanager
SRE — Flipkart (Apr 2016–Dec 2019)
- Worked on on-call engineering for the search and discovery platform
- Was part of the team that moved search from bare metal to Kubernetes
Platform Engineer — Flipkart (Jun 2015–Mar 2016)
- Was involved in automation scripts for infra provisioning using Ansible
Skills: Linux, Kubernetes, Prometheus, Grafana, Python, Go (basic), Terraform, Chaos Engineering
Education: B.Tech CS, NITK Surathkal 2015 | GPA 8.4`
  },
  {
    id: "raj-netsec-13yr",
    label: "Network/Security · 13 yrs · domain-switcher (telco→BFSI→consulting)",
    targetRole: "CISO Advisory Lead at Deloitte India — 12+ yrs cybersecurity/network, enterprise risk, regulatory compliance (RBI/SEBI)",
    cvText: `RAJ KRISHNAMURTHY | Mumbai | raj.k@email.com
Information Security Manager — Ernst & Young (Jan 2020–Present)
- Was responsible for conducting cyber risk assessments for BFSI clients
- Worked on regulatory compliance programmes (RBI IT Framework, SEBI Cybersecurity)
- Was involved in leading client workshops on zero-trust architecture
- Participated in incident response engagements for two major banks
- Was part of EY's Financial Services Cybersecurity practice
Information Security Lead — HDFC Bank (Mar 2015–Dec 2019)
- Was responsible for managing a team of 6 security analysts
- Was involved in implementing SIEM solution (Splunk) across the bank
- Worked on vulnerability management and penetration testing programme
Network Security Engineer — Vodafone India (Jun 2010–Feb 2015)
- Was involved in designing and maintaining network security architecture
- Worked on firewall policy management and IDS/IPS deployment
Certifications: CISSP, CISM, CEH, ISO 27001 Lead Implementer
Education: B.E. Electronics, Pune University 2010`
  },
  {
    id: "vivek-qa-11yr",
    label: "Test Automation → QA Lead · 11 yrs · three companies",
    targetRole: "QA Lead at Accenture — 10+ yrs test automation, Selenium/Cypress/API testing, QA strategy, team leadership",
    cvText: `VIVEK SHARMA | Hyderabad | vivek.sharma@email.com
QA Lead — Infosys (Feb 2020–Present)
- Was responsible for setting up test automation framework from scratch for a retail client
- Was involved in leading a team of 8 QA engineers
- Worked on Selenium WebDriver, Cypress, and API testing using Postman/RestAssured
- Participated in sprint reviews and contributed to shift-left testing strategy
- Was involved in reducing regression cycle from 5 days to 8 hours
Senior Test Engineer — HCL Technologies (Aug 2016–Jan 2020)
- Worked on performance testing using JMeter for banking applications
- Was part of a 6-member QA team
- Was involved in building keyword-driven test framework
Test Engineer — Wipro (Jun 2013–Jul 2016)
- Was responsible for manual testing of insurance web applications
- Participated in test case preparation and defect reporting
Skills: Selenium, Cypress, TestNG, JMeter, RestAssured, Jenkins, JIRA, SQL
Education: B.Tech CS, JNTU Hyderabad 2013`
  },
  {
    id: "amit-analytics-8yr",
    label: "Data Analyst → Analytics Manager · 8 yrs · two companies",
    targetRole: "Analytics Manager at McKinsey & Company — 8+ yrs analytics, Python/SQL, client-facing insights, team leadership",
    cvText: `AMIT SHAH | Mumbai | amit.shah@email.com
Senior Data Analyst — Mu Sigma (Mar 2020–Present)
- Was responsible for delivering analytics solutions for a US retail client
- Worked on building customer segmentation models using Python and R
- Participated in weekly business reviews with client stakeholders
- Was involved in managing a team of 3 junior analysts
- Worked on reducing churn prediction model error from 28% to 14%
Data Analyst — Fractal Analytics (Jul 2016–Feb 2020)
- Was part of an analytics team serving CPG and FMCG clients
- Worked on demand forecasting and price elasticity models
- Was involved in data pipeline development using Python and SQL
- Participated in client presentations of analytical findings
Skills: Python, R, SQL, Tableau, Power BI, Machine Learning, A/B Testing, Google Analytics
Education: B.Stat, ISI Kolkata 2016 | GPA 8.1 | Currently pursuing CFA Level 2`
  },
  {
    id: "nisha-mulesoft-7yr",
    label: "MuleSoft/Integration · 7 yrs · tech-switcher (mainframe→MuleSoft)",
    targetRole: "Integration Lead at Persistent Systems — 7+ yrs MuleSoft/API integration, middleware, enterprise architecture",
    cvText: `NISHA THOMAS | Bangalore | nisha.thomas@email.com
MuleSoft Integration Lead — Persistent Systems (Apr 2021–Present)
- Was responsible for integration architecture for a pharma client's digital transformation
- Worked on designing and building MuleSoft API-led connectivity layers
- Was involved in managing a team of 4 MuleSoft developers
- Participated in API governance and standards definition
- Was part of Persistent's MuleSoft Centre of Excellence
MuleSoft Developer — Infosys (Jan 2019–Mar 2021)
- Was involved in migrating point-to-point integrations to MuleSoft Anypoint Platform
- Worked on REST and SOAP integrations with SAP and Salesforce
- Participated in client workshops on integration strategy
Mainframe Programmer — Syntel (Jun 2017–Dec 2018)
- Was responsible for COBOL batch jobs for a US banking client
- Worked on JCL and DB2 queries
Certifications: MuleSoft Certified Developer Level 1 & 2, MuleSoft Platform Architect
Skills: MuleSoft, Anypoint Platform, RAML, REST, SOAP, SAP integrations, Salesforce`
  },

  // ─── REAL CVs ────────────────────────────────────────────────────────────────
  {
    id: "janani-qa-7yr",
    label: "QA Lead/Senior Consultant · 7 yrs · one company (Virtusa) · real CV",
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
Certifications: ISTQB Foundation 2019 | Certified Scrum Master (Scrum Alliance 2023–2025) | QA Test Automation Certificate (ICIT 2023) | Career Essentials in Generative AI (Microsoft/LinkedIn 2023)`
  },

  {
    id: "deepa-qa-6yr",
    label: "QA Analyst · 6.8 yrs · Banking/SWIFT · Virtusa · real CV",
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
- Participated in all client and internal meetings, defect triage, and implementation calls`
  },
  {
    id: "hasitha-ux-8yr",
    label: "Senior UX Designer · 8+ yrs · Virtusa · BT/Verint/ServiceNow · real CV",
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
- Managed WordPress website for the digital team (images, pages, content)`
  },

  {
    id: "vanaja-rpa-6yr",
    label: "RPA Support Engineer · 6+ yrs · Virtusa · Citi Bank Banking · real CV",
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
- Gathered PSM details, scheduled RCA risk log calls, and generated weekly reports from ServiceNow CHG data`
  },

  {
    id: "indira-qa-7yr",
    label: "QA Engineer · 7.4 yrs · mobile/web · 4 companies · real CV",
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

Education: B.E. in Electronics and Communication Engineering, GEC Hassan (2010–2014), 66% aggregate`
  },
  {
    id: "shrayesh-ba-15yr",
    label: "Lead BA · 15+ yrs · Banking/BFS · UAE/Sweden/US/UK · real CV",
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

Achievements: Managed end-to-end requirement-to-delivery lifecycle for a leading UAE bank's digital transformation initiative | Multiple client appreciations for leading UAT teams under challenging timelines | Worked onsite with a leading Swedish bank, recognized for delivery excellence | Recognized for defect management, quality leadership, and process improvement | Awarded "High Flyer of the Month" twice in Banking & Financial Services Open House`
  },
  {
    id: "tooshi-rpa-9yr",
    label: "RPA Team Lead · ~9 yrs · Life Sciences · Virtusa/TCS · real CV",
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
- Conducted post-incident reviews to identify patterns and produce knowledge management documentation`
  },
  {
    id: "bhonagiri-em-18yr",
    label: "Assoc. Engineering Manager · 18+ yrs · Elastic/Observability · real CV",
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

Education: Bachelor of Science`
  },

  {
    id: "chandima-qa-8yr",
    label: "Lead SE / QA · 8+ yrs · Virtusa · PEGA Insurance · real CV",
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
- Played a leadership role guiding the team; designed and implemented the web application; conducted demos to client and leadership`
  },
  {
    id: "naveen-pm-20yr",
    label: "Project Manager / Delivery · 20+ yrs · Banking+Healthcare · real CV",
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
- Supported Merrill Lynch CLEAR ("Client Electronic Access and Reporting") for secure file exchange between Merrill Lynch and external trading/business partners`
  },
  {
    id: "anudeep-sdet-7yr",
    label: "Lead SDET / QA Automation · 7+ yrs · Virtusa · BNY/PEGA · real CV",
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

Education: B.Tech (Mechanical), Sri Indu College of Engineering and Technology, Hyderabad, 2012`
  },
  {
    id: "vaishnavi-analyst-3yr",
    label: "Associate Engineer / Data Analytics · ~3 yrs · Virtusa · Google · real CV",
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
- Used internal tools like EWOQ to track performance metrics and support campaign improvements`
  },

  // ─── REAL CVs (sourced from hireitpeople.com) ────────────────────────────────
  {
    id: "real-java-lead-10yr",
    label: "Java Full Stack Lead · 10+ yrs · real CV · AR",
    targetRole: "Principal Full Stack Engineer / Tech Lead — 10+ yrs Java/Spring Boot microservices, Kafka, React/Angular, AWS/Azure, Kubernetes, multi-cloud",
    cvText: `SENIOR FULL STACK JAVA LEAD DEVELOPER | Arkansas, USA
10+ years of IT experience in full-stack development across web, client/server, enterprise and distributed systems.

Full Stack Java Lead Developer — Confidential (Jan 2021–Present)
- Led requirements analysis, design, development and testing using Agile/Scrum
- Designed and developed microservices using Spring Boot with Spring Cloud, Spring Security
- Architected redesigned services using NGINX, Node.js, Express.js, MongoDB, MySQL
- Implemented real-time data streaming using EJB, Spark, Kafka; created Kafka producer/consumer apps with Zookeeper
- Configured Spark Streaming to receive Kafka data and store to HDFS via Scala
- Loaded data into Cassandra clusters via Java APIs; optimised schema for cluster performance
- Deployed Spring Boot microservices on Docker using AWS EC2 container services
- Designed cross-cloud solutions spanning Azure DevOps, AWS, Google, SoftLayer hybrid clouds
- Built Azure infrastructure via Pipelines and Resource Manager Templates; configured RBAC roles
- Managed Docker images and Kubernetes deployments across environments
- Integrated Drools and JBPM for dynamic knowledge base and business rules engine
- Developed Single Page Applications and responsive interfaces with Angular 6/7/8/9 and React
- Automated testing with Ruby/Cucumber; build automation via Maven; Jenkins CI/CD
Environment: Java 8, Python, Spring Boot, Spring Security, EJB, REST, Azure, Docker, Kubernetes, Kafka, Cassandra, React, Angular, Node.js, MongoDB, Bamboo, Jira, PCF, Drools, AWS, HTML5, SASS, Gradle, Splunk, Swagger

Senior Java Developer — Confidential (Feb 2018–Dec 2020)
- Developed Spring Boot microservices with REST and Kafka message-driven architecture
- Analysed Kafka message failures using Kibana and Elasticsearch
- Built full frontend/backend modules with Python/Django framework
- Deployed applications using Lambda, ECS, Docker containers with CI/CD
- Containerised Spring Boot microservices to AWS EC2 via console
- Built RESTful web services using Jersey, Spring, JAX-RS
- Developed Angular Single Page Applications with Angular-Router
- Implemented complex stored procedures, functions, triggers in SQL/PL-SQL
- Participated in Agile ceremonies; managed Git repositories via Stash with SSH key auth
Environment: Java, Spring Framework, Kafka, Kibana, Elasticsearch, Python, Angular, React, D3.js, Node.js, SASS, JSON, PCF, Jenkins, Eclipse, Karma, Jasmine

Java Developer — Confidential, Charlotte NC (Jul 2016–Jan 2018)
- Created and consumed RESTful web services; applied design patterns (Singleton, Factory, DAO)
- Built frontend using HTML5, CSS3, JavaScript, JSON, Node.js, AngularJS
- Created Angular services consuming REST APIs; built Analytics core with Node.js
- Followed Agile with bi-weekly sprints, daily standups, peer code reviews
Environment: Spring, Hibernate, EJB, Java, JSP, Node.js, Angular JS, JBoss, HTML, JavaScript, Maven, Eclipse, Oracle 10g

Java/UI Developer — Confidential (Jun 2014–Jun 2016)
- Implemented MVC architecture across Enroll, Accounts Overview, Account Opening, Funds Transfer modules
- Designed frontend using Angular.js, Node.js, object-oriented JavaScript
- Executed root-cause analysis on production issues via log file analysis in Linux/Unix
Environment: Java, J2EE, Struts 2, Spring MVC, Web Services, JSP 2.0, Servlets, JDBC, JBoss, Node.js, Angular JS, MS SQL

Skills: Java 8/7, Python, Spring Boot/MVC/Security/Cloud, Hibernate, Microservices, React, Angular, Node.js, AWS (EC2/S3/RDS/Lambda/ECS), Azure, Docker, Kubernetes, Kafka, Cassandra, MongoDB, Oracle, MySQL, Jenkins, Maven, Gradle, Git, ELK Stack`
  },
  {
    id: "real-cloud-arch-fed",
    label: "Sr Cloud Architect · Federal IT · AWS/Azure · real CV",
    targetRole: "Principal Cloud Architect / Program Director — enterprise AWS/Azure architecture, Federal IT transformation, $200M+ program leadership, petabyte-scale data systems",
    cvText: `SENIOR CLOUD ARCHITECT | USA (Federal IT focus)
20+ years leading cloud computing, enterprise architecture and systems engineering for Federal government agencies.

Senior Cloud Architect — Confidential (2019–Present)
- Cloud computing SME for Census Enterprise Data Collection and Processing (CEDCAP) program
- Provisioned AWS, Azure, and hybrid infrastructure services; led cloud suitability assessments
- Led CEDCaP Technical Integration Engineering Team; performance tested across 13 AWS clusters
- Supported Enterprise Censuses and Surveys Enabling (ECaSE) platform and Internet Survey Response systems
- Proposed Program Manager for Census Bureau's $600M Cloud BPA (Phase II)

Cloud Computing SME / Program Manager IV — Confidential (2016–2019)
- Provided strategic cloud support to Office of Assistant CIO for Weather (ACIO) at National Weather Service (NOAA)
- Architected enterprise-wide Desktop-as-a-Service (DaaS) capability for NOAA's National Weather Service
- Managed migration of 1,000+ NWS devices to NOAA Enterprise Corporate Services
- Founding member of NOAA's Cloud Computing Working Group
- Developed application migration process for IaaS, PaaS, SaaS models with enterprise-wide cost analyses

Senior Associate — Confidential (2013–2016)
- Drove strategic cloud business development for Civil, Borders, Transportation, Justice, Homeland Security portfolios
- Clients included DHS, FEMA, DOT, FAA, TSA, CBP, DOJ, FBI, and ICE
- Designed and deployed enterprise-wide IT systems across multiple Federal departments

Senior Cloud Solutions Architect — U.S. Agency for International Development / USAID (2012–2013)
- Senior architect for USAID Intranet Modernisation Initiative
- Conducted Analysis of Alternatives across PaaS, iPaaS, IaaS, SaaS models; evaluated open-source and Microsoft platforms
- Led sprint sessions for requirements definition; developed migration and consolidation strategy

Principal Technology Consultant & President — Confidential (2009–2012)
- Developed Federal IT proposals valued $50M–$400M for NASA, NOAA, DOD, DOT, GSA, Census Bureau, IRS, DHS
- Participated as blue/pink/red/gold team reviewer; provided technical expertise in cloud-computing services

Vice President, Engineering — U.S. Department of Transportation (2007–2009)
- CMS and Cloud-Computing SME for Research and Innovative Technology Administration (RITA)
- Implemented Apache Hadoop proof-of-concept for 30+ years of archived transportation statistics
- Managed Drupal 7 migration of 300,000+ HTML pages; developed iOS app in C++ for Transportation Pocket Guide
- Performed UNIX administration and LAMP stack configuration on Verizon/Terremark cloud

Project Manager / Systems Engineer V — U.S. Census Bureau (2004–2007)
- Led large teams for Field Data Collection Automation (FDCA) program ($600M, 5-year)
- Designed and deployed automated systems with near-real-time data delivery
- Built multi-layer security architecture including fingerprint authentication, encryption, firewalls
- Managed cost/schedule via EVMS; interfaced directly with Census Bureau leadership

Chief of Technology, Science Division — NASA Goddard Space Flight Center (2000–2004)
- Managed 100+ mission systems engineering tasks; authored Data Migration Plan for MSES II/A ($400M/5-year contract)
- Migrated ~25 terabytes of engineering data within a 1-month transition window
- Developed software in C, C#, C++, .NET, Perl, Java for spacecraft projects
- Applied IEEE, DoD STD-498, NASA, and CCSDS standards across engineering tasks

Chief Technology Engineer — NASA Goddard Space Flight Center (1997–2000)
- Advised corporate senior management on technology investment strategy; created 5-year technology execution plan
- Designed web/cloud-based systems for remote-sensing data (multiple petabytes in Nebula Cloud)
- Established Office of Science Utilisation (OSU); led interagency GIS and remote sensing conferences

Certifications/Standards: PMBOK (5th Ed), SEI CMMI, IEEE, DoD STD-498, NASA, CCSDS, Section 508
Methodologies: Agile, Waterfall, Spiral, RAD, RUP, XP, SOA, EVMS
Skills: AWS, Azure, Verizon/Terremark, Apache Hadoop, Drupal 7, LAMP, C/C#/C++/.NET/Perl/Java/PHP, DaaS, MapReduce, GIS, Remote Sensing, Enterprise Architecture, Systems Engineering, Program Management, Business Development`
  },
  {
    id: "real-sf-ba-11yr",
    label: "Salesforce BA/Scrum · 11 yrs · 5 companies · real CV · GA",
    targetRole: "Lead Salesforce Architect / Senior Business Analyst at Accenture — 11+ yrs Salesforce implementation, SAFe/Scrum, enterprise CRM, multi-cloud integrations",
    cvText: `LEAD SALESFORCE BUSINESS ANALYST & SCRUM MASTER | Georgia, USA
11+ years implementing and supporting Salesforce-based enterprise CRM across multiple industries and client organisations.

Lead Salesforce Business Analyst & Scrum Master — Confidential, GA (Jan 2020–Present)
- Led backlog grooming, sprint planning, stand-ups, demos, retrospectives and PI Planning sessions
- Managed Salesforce application development, deployment and support projects end-to-end
- Implemented Vlocity AppExchange solutions and OmniScripts for custom community UIs
- Migrated Visualforce-based custom community to Salesforce standard platform with ambassador allocations, order management, and R&D shipping integration
- Executed Salesforce-to-Conga Composer integration; worked with standard objects (Accounts, Opportunities, Quotes, Products)
- Configured access/data-level security: roles, profiles, OWDs, sharing settings
- Facilitated SAFe Agile, Scrum of Scrums and PI Planning ceremonies at program/portfolio level
- Led UAT and mid-sprint demos with business groups; tracked milestones for dev and test teams

Lead Business Analyst / Project Manager / Scrum Master — Confidential, VA/DC (Mar 2017–Dec 2019)
- Managed end-to-end project lifecycles from requirements definition through delivery sign-off
- Executed Salesforce-to-Eloqua integration for campaign and lead management
- Migrated legacy applications (Cold Fusion, SharePoint, .NET, Java) to Salesforce and Drupal with full data migrations
- Developed SOW, cost/schedule tracking, product roadmap and progress reporting
- Facilitated UAT sessions with State Board users; authored test cases aligned with user stories
- Configured custom tabs, validation rules, approvals, auto-response rules, workflow rules

Senior Salesforce Business Analyst — Confidential, NY/NJ (Jun 2015–Feb 2017)
- Led system design and object modelling including security architecture (sharing rules, permission sets)
- Managed procurement and installation of third-party AppExchange tools
- Trained and mentored junior analysts and testers on Salesforce technology
- Managed 24/7 support for offshore SFDC application team; developed internal CRM product
- Conducted JAD sessions, walkthroughs with dev, PM and QA teams; built cross-vendor requirements

Senior Salesforce BA / Admin — Confidential, Mountain View CA (Jan 2014–May 2015)
- Gathered user requirements via workshops, interviews and workflow storyboards
- Configured custom objects, junction objects, master-detail/lookup relationships, formula fields
- Managed 24/7 support model across SFDC cloud applications; interacted with Salesforce premium tech support
- Maintained BRDs, FRDs and technical design documentation; managed SFDC offshore team

Salesforce Consultant — Confidential, Chicago IL (Jul 2013–Dec 2013)
- Implemented Service Cloud solution: case management, Service Cloud Console, CTI
- Created summary, matrix and dashboard reports with role-based folder access
- Implemented complex approval processes for capital management authorisation
- Worked with debug logs to identify error messages; translated requirements into functional specs

Salesforce Business Analyst — Confidential, Chicago IL (Jun 2012–Jun 2013)
- Analysed CRM processes and mapped onto Salesforce for full lifecycle implementation
- Implemented Cost Guard and XO Communication integrations
- Configured custom objects, tabs, fields, validations, workflows, reports and dashboards
- Created user guides for four different user roles

Salesforce: Sales Cloud, Service Cloud, Communities, Knowledge Articles, Custom Applications, Vlocity/OmniScripts, Conga Composer, Eloqua, Lightning, Apex, Visual Force, Triggers, Process Builder, Workflow Rules, Data Loader, AppExchange
Methodologies: SAFe Agile, Scrum, Kanban, Waterfall; JIRA, Confluence
Documentation: BRDs, FRDs, RTM, system design docs, use-case diagrams, process flows`
  }
];
