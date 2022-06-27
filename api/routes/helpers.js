exports.dummyMiddleware = (sampleData) => {
  return (_, res) => {
    res.json({
      data: sampleData,
    });
  };
};
