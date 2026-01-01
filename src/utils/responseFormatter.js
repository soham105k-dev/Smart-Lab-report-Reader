// utils/responseFormatter.js

import { REPORT_STATUS } from "../constants/reportStatus.js";
import { MEDICAL_DISCLAIMER } from "../constants/disclaimers.js";

export const formatAIResponse = (aiResponse) => {
  if (!aiResponse || typeof aiResponse !== "object") {
    throw new Error("Invalid AI response format");
  }

  return {
    summary: aiResponse.summary || "Unable to generate summary.",
    tests: Array.isArray(aiResponse.tests)
      ? aiResponse.tests.map((test) => ({
          name: test.name || "Unknown Test",
          value: test.value || "N/A",
          unit: test.unit || "",
          referenceRange: test.referenceRange || "Not provided",
          status: normalizeStatus(test.status),
          explanation: test.explanation || "No explanation available."
        }))
      : [],
    generalAdvice: Array.isArray(aiResponse.generalAdvice)
      ? aiResponse.generalAdvice
      : [],
    disclaimer: MEDICAL_DISCLAIMER
  };
};

const normalizeStatus = (status) => {
  if (!status) return REPORT_STATUS.UNKNOWN;

  const normalized = status.toLowerCase();

  if (normalized.includes("normal")) return REPORT_STATUS.NORMAL;
  if (normalized.includes("high")) return REPORT_STATUS.HIGH;
  if (normalized.includes("low")) return REPORT_STATUS.LOW;
  if (normalized.includes("border")) return REPORT_STATUS.BORDERLINE;

  return REPORT_STATUS.UNKNOWN;
};
