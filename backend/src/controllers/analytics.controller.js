import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { getReportsData } from "../services/analytics.service.js";

/**
 * @desc Get Reports Data
 * @route GET /api/v1/analytics
 * @access Private (Admin)
 */
export const getReportsOverview = asyncHandler(async (req, res) => {
  const reportsData = await getReportsData();

  return res.status(200).json(
    new ApiResponse(
      200,
      "Reports data fetched successfully.",
      reportsData
    )
  );
});
