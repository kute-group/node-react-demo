module.exports = {
  format: function({ limit, page, count, list }) {
    return {
      limit,
      totalPage: Math.ceil(count / limit),
      page,
      count,
      list
    };
  }
};
