import jwt from "jsonwebtoken"

//like=>click like=>auth middleware(next)=> like controller

const Auth = async(req, res, next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth =token.length<500;

        let decodedData;
        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'medium')
            req.userId = decodedData?.id;
        }else{
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub;
        }
        next();

    }catch(e){
        console.log(e)

    }
}

export default Auth