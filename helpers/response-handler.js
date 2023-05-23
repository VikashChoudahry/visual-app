module.exports = {
    /* for all the success response */
    success: async (response, payload, statusCode = 200) => {
      response.status(statusCode).json({
        success: true,
        payload
      });
    },
    /* for all the error response */
    error: async (response, reason, statusCode = 400, details = {}) => {
      response.status(statusCode).json({
        success: false,
        reason,
        details
      });
    }
  };
  