import upload from "../config/multer.js";
import ApiError from "../utils/ApiError.js";

/**
 * ==========================================
 * Single File Upload
 * ==========================================
 */
export const uploadSingle = (fieldName) => {
  return (req, res, next) => {
    const middleware = upload.single(fieldName);

    middleware(req, res, (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return next(
            new ApiError(
              400,
              "File size should not exceed 10 MB."
            )
          );
        }

        return next(
          new ApiError(
            400,
            err.message || "File upload failed."
          )
        );
      }

      next();
    });
  };
};

/**
 * ==========================================
 * Multiple Files Upload
 * ==========================================
 */
export const uploadMultiple = (
  fieldName,
  maxCount = 5
) => {
  return (req, res, next) => {
    const middleware = upload.array(
      fieldName,
      maxCount
    );

    middleware(req, res, (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return next(
            new ApiError(
              400,
              "One or more files exceed the 10 MB limit."
            )
          );
        }

        return next(
          new ApiError(
            400,
            err.message || "File upload failed."
          )
        );
      }

      next();
    });
  };
};

/**
 * ==========================================
 * Mixed Fields Upload
 * ==========================================
 */
export const uploadFields = (fields) => {
  return (req, res, next) => {
    const middleware = upload.fields(fields);

    middleware(req, res, (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return next(
            new ApiError(
              400,
              "One or more files exceed the 10 MB limit."
            )
          );
        }

        return next(
          new ApiError(
            400,
            err.message || "File upload failed."
          )
        );
      }

      next();
    });
  };
};