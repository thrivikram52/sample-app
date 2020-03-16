export const health_check = async(req,res,next) => {
	try{
        res.data = {
        };
        console.log("I am in heakth");
        next();
	}
	catch(err) {
		next(ErrorUtils.InternalServerError(err));
	}
}
