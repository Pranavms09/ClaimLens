import { HistoryEntry } from "../contexts/EDIContext";

export const MOCK_CLAIMS: HistoryEntry[] = [
  {
    id: "demo-837p-001",
    fileName: "20240319_ISA_CMS1500_PROF_PROV101.edi",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    analysis: {
      fileType: "837 Professional",
      fileInformation: {
        transactionId: "XPT-948201",
        senderId: "UTAH_HEALTH_NETWORK",
        receiverId: "AETNA_LIFE_INS",
        interchangeControlNumber: "000000452",
        functionalGroupControlNumber: "452",
        transactionSetControlNumber: "0001",
      },
      transactionOverview: {
        transactionType: "837 Professional",
        purchaseOrderNumber: "REF-55921",
        transactionDate: "2024-03-19",
        currency: "USD",
        totalLineItems: 4,
      },
      participants: {
        sender: "South Valley Medical Group",
        receiver: "Aetna Life Insurance",
        customer: "Sarah Jenkins",
        supplier: "Dr. Robert Wilson, MD",
      },
      importantDates: [
        { label: "Date of Service", value: "2024-03-15" },
        { label: "Claim Filing Date", value: "2024-03-19" },
      ],
      lineItems: [
        {
          itemNumber: "1",
          productName: "99213 - Office Visit, Est Pt, Level 3",
          quantity: 1,
          unitPrice: "115.00",
          totalPrice: "115.00",
        },
        {
          itemNumber: "2",
          productName: "36415 - Venipuncture, Routine",
          quantity: 1,
          unitPrice: "25.00",
          totalPrice: "25.00",
        },
        {
          itemNumber: "3",
          productName: "80053 - Comprehensive Metabolic Panel",
          quantity: 1,
          unitPrice: "95.00",
          totalPrice: "95.00",
        },
        {
          itemNumber: "4",
          productName: "85025 - CBC With Differential",
          quantity: 1,
          unitPrice: "45.00",
          totalPrice: "45.00",
        },
      ],
      errors: [],
    },
  },
  {
    id: "demo-837i-001",
    fileName: "ISA_UB04_INST_METRO_GEN_HOSP_ER.edi",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    analysis: {
      fileType: "837 Institutional",
      fileInformation: {
        transactionId: "HOS-77215",
        senderId: "METRO_GEN_HOSP",
        receiverId: "BLUE_CROSS_NE",
        interchangeControlNumber: "000008821",
      },
      transactionOverview: {
        transactionType: "837 Institutional",
        transactionDate: "2024-03-18",
        totalLineItems: 2,
      },
      participants: {
        sender: "Metropolitan General Hospital",
        receiver: "BCBS of Nebraska",
        customer: "Michael Thompson",
        supplier: "Emergency Dept Services",
      },
      importantDates: [
        { label: "Admission Date", value: "2024-03-17" },
        { label: "Discharge Date", value: "2024-03-18" },
      ],
      lineItems: [
        {
          itemNumber: "1",
          productName: "0450 - Emergency Room General",
          quantity: 1,
          unitPrice: "850.00",
          totalPrice: "850.00",
        },
        {
          itemNumber: "2",
          productName: "0250 - Pharmacy General",
          quantity: 3,
          unitPrice: "120.00",
          totalPrice: "360.00",
        },
      ],
      errors: [
        {
          segment: "REF",
          elementPosition: "2",
          description: "Missing Required Authorization Code for Institutional Claim",
          severity: "Warnings",
        },
      ],
    },
  },
  {
    id: "demo-835-001",
    fileName: "ISA_835_ERA_ADVICE_UHC_BATCH.edi",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    analysis: {
      fileType: "835 Payment",
      fileInformation: {
        transactionId: "PMT-88219",
        senderId: "UNITED_HEALTH_GROUP",
        receiverId: "METRO_GEN_HOSP",
        interchangeControlNumber: "000012239",
      },
      transactionOverview: {
        transactionType: "835 Payment",
        transactionDate: "2024-03-19",
        currency: "USD",
        totalLineItems: 1,
      },
      participants: {
        sender: "United Health Group",
        receiver: "Metropolitan General Hospital",
        customer: "Multiple Beneficiaries",
      },
      lineItems: [
        {
          itemNumber: "1",
          productName: "Total Batch Payment (8 Claims)",
          quantity: 1,
          unitPrice: "12450.50",
          totalPrice: "12450.50",
        },
      ],
      errors: [
        {
          segment: "REF",
          elementPosition: "2",
          description: "Missing Required Authorization Code for Institutional Claim",
          severity: "Warnings",
        },
      ],
    },
  },
  {
    id: "demo-277-001",
    fileName: "ISA_277_STATUS_ACK_HUMANA_INC.edi",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    analysis: {
      fileType: "277 Claim Status",
      fileInformation: {
        transactionId: "STAT-2210",
        senderId: "HUMANA_INS",
        receiverId: "CITY_MED_CTR",
      },
      transactionOverview: {
        transactionType: "277 Claim Status",
        transactionDate: "2024-03-19",
      },
      participants: {
        sender: "Humana Insurance Co",
        receiver: "City Medical Center",
      },
      errors: [
        {
          segment: "STC",
          elementPosition: "2",
          description: "Claim Pending: Additional Documentation Required for COB",
          severity: "Warnings",
        },
        {
          segment: "REF",
          elementPosition: "2",
          description: "Missing Required Authorization Code for Institutional Claim",
          severity: "Warnings",
        },
      ],
    },
  },
  {
    id: "demo-837p-err-01",
    fileName: "ISA_CMS1500_PROF_ERROR_NPI_01.edi",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    analysis: {
      fileType: "837 Professional",
      fileInformation: {
        transactionId: "XPT-ERR-001",
        senderId: "UNKNOWN_PROV",
        receiverId: "CIGNA_HEALTH",
      },
      transactionOverview: {
        transactionType: "837 Professional",
        transactionDate: "2024-03-18",
        totalLineItems: 1,
      },
      participants: {
        sender: "Unknown Provider Office",
        receiver: "Cigna Healthcare",
      },
      errors: [
        {
          segment: "NM1",
          elementPosition: "9",
          description: "Critical Error: Invalid or Missing Provider NPI (National Provider Identifier)",
          severity: "Critical",
        },
        {
          segment: "SVC",
          elementPosition: "1",
          description: "Invalid CPT Procedure Code detected in Service Line 1",
          severity: "Critical",
        },
      ],
    },
  },
  {
    id: "demo-834-001",
    fileName: "ISA_834_ENROLLMENT_ABC_CORP_BEN.edi",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    analysis: {
      fileType: "834 Enrollment",
      fileInformation: {
        transactionId: "ENR-9981",
        senderId: "ABC_CORP",
        receiverId: "CIGNA_HEALTH",
      },
      transactionOverview: {
        transactionType: "834 Enrollment",
        transactionDate: "2024-03-17",
        totalLineItems: 45,
      },
      participants: {
        sender: "ABC Corp Benefits Dept",
        receiver: "Cigna Healthcare",
      },
      lineItems: [
        {
          itemNumber: "1",
          productName: "Employee Enrollments",
          quantity: 32,
          unitPrice: "0.00",
          totalPrice: "0.00",
        },
        {
          itemNumber: "2",
          productName: "Dependent Enrollments",
          quantity: 13,
          unitPrice: "0.00",
          totalPrice: "0.00",
        },
      ],
      errors: [
        {
          segment: "NM1",
          elementPosition: "9",
          description: "Critical Error: Invalid or Missing Provider NPI (National Provider Identifier)",
          severity: "Critical",
        },
      ],
    },
  },
  {
    id: "demo-270-001",
    fileName: "ISA_270_ELIGIBILITY_REQ_BLUE_P1.edi",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    analysis: {
      fileType: "270 Eligibility",
      fileInformation: {
        transactionId: "ELIG-5512",
      },
      transactionOverview: {
        transactionType: "270 Eligibility",
        transactionDate: "2024-03-18",
      },
      participants: {
        sender: "Community Health Clinic",
        receiver: "BCBS of Texas",
      },
      errors: [],
    },
  },
  {
    id: "demo-837p-warn-01",
    fileName: "ISA_CMS1500_PROF_PROV_MODIFIER_WARN.edi",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
    analysis: {
      fileType: "837 Professional",
      fileInformation: {
        transactionId: "XPT-94850",
      },
      transactionOverview: {
        transactionType: "837 Professional",
        transactionDate: "2024-03-19",
        totalLineItems: 3,
      },
      participants: {
        sender: "North Park Orthopedics",
        receiver: "United Health",
      },
      errors: [
        {
          segment: "SVC",
          elementPosition: "3",
          description: "Missing Required Modifier for CPT 29881 in Surgery Service Line",
          severity: "Warnings",
        },
      ],
    },
  },
];
