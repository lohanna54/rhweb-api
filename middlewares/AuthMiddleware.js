const jwt = require('jsonwebtoken');

function authenticate(roles){
    return (req, res, next) => {
        
        const token = req.headers['authorization'];
        if(!token){
            res.status(401).json({ error: 'unauthorized' });
        }else{
            let bearerToken = token.split(' ')[1] || token.split(' ')[0];
            
            jwt.verify(bearerToken, process.env.ACCESS_SECRET, function(error, decodedInfo) {
                if(error){
                    res.status(401).json({ failure: 'unauthorized', "jwt": error });
                }else{
                    let userHasAccess = false;
                    
                    roles.forEach(role => {
                        if (role == decodedInfo.role) { 
                            userHasAccess = true
                        }
                    });
                    if(!userHasAccess){
                        res.status(401).json({failure: "unauthorized route for this user"});         
                    }
                    next();
                }
            });
        }  
    }
}

module.exports = authenticate;