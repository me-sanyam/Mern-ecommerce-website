class SearchFilterAPI {
    constructor(query, querystr) {
        this.query = query,
            this.querystr = querystr
    }

    search() {
        const keyword = this.querystr.keyword ? {
            name: {
                $regex: this.querystr.keyword,
                $options: 'i'
            }
        } : {}
        this.query = this.query.find({ ...keyword });
        return this;
    }


    filter() {
        const querycopy = { ...this.querystr };
        const removefeilds = ['keyword', 'limit', 'page'];
        removefeilds.forEach(el => delete querycopy[el]);

        let querystr = JSON.stringify(querycopy)

        // /...../ is a regular expression
        // \b...\b stands for matching before and after a word...
        // g stands for a global match means to match all variables rather than mathcing first only...
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        this.query = this.query.find(JSON.parse(querystr));
        return this;
    }

    paginate(ResultsPerPage) {
        const Currentpage = parseInt(this.querystr.page) || 1;
        const skip = (Currentpage - 1) * ResultsPerPage;
        this.query = this.query.find().limit(ResultsPerPage).skip(skip);
        return this;
    }
}

module.exports = SearchFilterAPI;