const jwt = require ('jsonwebtoken')

exports.requireLogin = (req,res,next)=> {//Se necesita que el cliente/admin inicie sesión primero
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const client = jwt.verify(token, process.env.JSECRET);
        req.client = client;
    }else{
        return res.status(500).json({ message: 'Se necesita autorización'})
    }
    next();
}

exports.clientMiddleware = (req,res,next) =>{//No se le permite acceso si no es usuario
    if(req.client.nivel !== 'normal'){
        return res.status(400).json({ message: 'Acceso Prohibido al usuario'})
    }
    next();
}

exports.adminMiddleware = (req,res,next) =>{//No se le permite accesso si no es administrador
    if(req.client.nivel !== 'admin'){
        return res.status(400).json({ message: 'Acceso Prohibido al admin'})
    }
    next();
}