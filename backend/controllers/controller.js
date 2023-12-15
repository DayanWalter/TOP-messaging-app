// GET home page(test)
exports.index_get = function (req, res, next) {
  res.json({ index: 'GET' });
};
// POST home page(test)
exports.index_post = function (req, res, next) {
  res.json({ index: 'POST' });
};
