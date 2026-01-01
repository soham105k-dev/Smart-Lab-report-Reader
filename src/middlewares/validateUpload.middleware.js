// middlewares/validateUpload.middleware.js

export const validateUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded. Please upload a lab report."
    });
  }

  next();
};
