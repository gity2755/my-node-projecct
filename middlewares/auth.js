import jwt from "jsonwebtoken"
export const auth = async (req, res,next) => {
    let token = req.headers["xxx-token"];
    if (!token)
        return res.status(401).send({ type: "not authorized", message: "user not authorized" })
    try { 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    // if (!decoded)
    //     return res.status(401).send({ type: "not authorized", message: "user not authorized" })
    req.user=decoded;
    next();
}
    catch(err){
        return res.status(401).send({ type: "not authorized", message: "user not authorized" })

    }
 
}

export const authAdmin = async (req, res,next) => {
    let token = req.headers["xxx-token"];
    if (!token)
        return res.status(401).send({ type: "not authorized", message: "user not authorized" })
    try { 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    if (!decoded)
        return res.status(401).send({ type: "not authorized", message: "user not authorized" })
    req.user=decoded;
    if(decoded.role=="admin")
        next();
    else return res.status(403).send("you are not premitted")
}
    catch(err){
        return res.status(401).send({ type: "not authorized", message: "user not authorized" })

    }
 
}



