const erroHandler = (error, req, res, next) => {
  const status = res.statusCode ? res.statusCode : 500;
  return res.statusCode(status).json({ message: error.message });
};

// Export
export default erroHandler;
