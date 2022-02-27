
export const pagination = (model,selected) => {
    return async (req,res,next ) => {
        try{
            let query = model.find().select(selected).sort({ createdAt: -1 });
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * pageSize;
            const total = await model.countDocuments();
            const pages = Math.ceil(total / pageSize);

            query = query.skip(skip).limit(pageSize);
            if(page>pages){
                res.status(404).json({
                    status: "error",
                    message: "Page not found"
                });
            }
            const result = await query;
            req.paginatedData = {
                total,
                pages,
                page,
                pageSize,
                result
            };
            next();
        }catch (e) {
            console.log(e);
        }

    }
}
