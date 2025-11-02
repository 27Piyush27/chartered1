export interface Service {
  id: string;
  icon: string;
  title: string;
  desc: string;
  features: Array<{
    icon: string;
    title: string;
    text: string;
  }>;
  timeline: Array<{
    title: string;
    text: string;
  }>;
  faqs: Array<{
    q: string;
    a: string;
  }>;
}

export const services: Service[] = [
  {
    id: "accounting",
    icon: "Calculator",
    title: "Accounting & Bookkeeping",
    desc: "Precision bookkeeping, financial statement preparation, and system design compliant with IAS, USGAAP, or IND AS to ensure your finances are always in order.",
    features: [
      {
        icon: "FileText",
        title: "Automated Bookkeeping",
        text: "AI-powered data entry and categorization for error-free books.",
      },
      {
        icon: "PieChart",
        title: "Financial Reporting",
        text: "Generate insightful monthly P&L, Balance Sheets, and Cash Flow statements.",
      },
      {
        icon: "Settings",
        title: "System Implementation",
        text: "We help you set up and manage accounting software like Tally, QuickBooks, etc.",
      },
      {
        icon: "CheckCircle",
        title: "Compliance Management",
        text: "Ensuring your books are compliant with all relevant accounting standards.",
      },
    ],
    timeline: [
      {
        title: "Onboarding & Data Sync",
        text: "Securely connect your bank accounts and upload initial documents.",
      },
      {
        title: "Monthly Processing",
        text: "Our AI and human experts categorize transactions and reconcile accounts monthly.",
      },
      {
        title: "Review & Reporting",
        text: "Receive clear, concise financial reports and insights at month-end.",
      },
      {
        title: "Year-End Finalization",
        text: "We prepare and finalize your books for annual auditing and tax filing.",
      },
    ],
    faqs: [
      {
        q: "What software do you work with?",
        a: "We are proficient in a wide range of accounting software including Tally, QuickBooks, Zoho Books, and more. We can adapt to your existing system or recommend one.",
      },
      {
        q: "How do I share my documents?",
        a: "Once you request the service, you can securely upload all documents like invoices and bank statements through your private client dashboard.",
      },
    ],
  },
  {
    id: "auditing",
    icon: "FileCheck",
    title: "Auditing & Assurance",
    desc: "Comprehensive statutory, internal, and tax audits to ensure financial accuracy, identify risks, and improve corporate governance.",
    features: [
      {
        icon: "Shield",
        title: "Statutory Audits",
        text: "Ensuring your financial statements comply with statutory requirements.",
      },
      {
        icon: "Search",
        title: "Internal Audits",
        text: "Comprehensive review of internal controls and operational efficiency.",
      },
      {
        icon: "AlertCircle",
        title: "Risk Assessment",
        text: "Identify potential financial and operational risks in your business.",
      },
      {
        icon: "TrendingUp",
        title: "Performance Review",
        text: "Detailed analysis of business performance and improvement areas.",
      },
    ],
    timeline: [
      {
        title: "Planning & Scoping",
        text: "Understanding your business and defining audit objectives.",
      },
      {
        title: "Fieldwork & Testing",
        text: "Detailed examination of financial records and internal controls.",
      },
      {
        title: "Analysis & Reporting",
        text: "Comprehensive audit report with findings and recommendations.",
      },
      {
        title: "Follow-up & Support",
        text: "Ongoing support to implement audit recommendations.",
      },
    ],
    faqs: [
      {
        q: "How long does an audit take?",
        a: "The duration depends on the size and complexity of your organization. Typically, a statutory audit takes 2-4 weeks.",
      },
      {
        q: "What documents do I need?",
        a: "You'll need financial statements, ledgers, invoices, bank statements, and supporting documentation.",
      },
    ],
  },
  {
    id: "tax",
    icon: "Receipt",
    title: "Tax Advisory & Compliance",
    desc: "Strategic tax planning, compliance, and advisory services to minimize liabilities while ensuring full regulatory compliance.",
    features: [
      {
        icon: "FileText",
        title: "Tax Planning",
        text: "Strategic planning to optimize your tax position legally.",
      },
      {
        icon: "Calculator",
        title: "Tax Filing",
        text: "Accurate and timely filing of all tax returns and forms.",
      },
      {
        icon: "Scale",
        title: "GST Compliance",
        text: "Complete GST registration, filing, and compliance management.",
      },
      {
        icon: "Users",
        title: "Tax Advisory",
        text: "Expert guidance on complex tax matters and regulatory changes.",
      },
    ],
    timeline: [
      {
        title: "Tax Assessment",
        text: "Review your current tax position and identify opportunities.",
      },
      {
        title: "Strategy Development",
        text: "Create a comprehensive tax strategy aligned with your goals.",
      },
      {
        title: "Implementation",
        text: "Execute tax planning strategies and file all required returns.",
      },
      {
        title: "Ongoing Support",
        text: "Continuous monitoring and updates on tax law changes.",
      },
    ],
    faqs: [
      {
        q: "Can you help with GST registration?",
        a: "Yes, we provide complete GST registration, filing, and compliance services.",
      },
      {
        q: "Do you handle TDS returns?",
        a: "Yes, we manage all aspects of TDS including deduction, payment, and return filing.",
      },
    ],
  },
];
