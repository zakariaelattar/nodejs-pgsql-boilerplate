const getPagingData = (_data, page, limit) => {
    const { count: totalItems, rows: data } = _data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, data, totalPages, currentPage };
};


module.exports = {
    getPagingData
}