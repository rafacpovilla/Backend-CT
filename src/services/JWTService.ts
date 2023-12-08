/*import ValidationError from "src/errors/ValidationError";

const { nome, email, empresa, senha } = JSON.parse(event body);
if (!nome || !email || !empresa || !senha)
    throw new ValidationError ("Algum campo não definido!");

const token = sign ({
    name: "Alex",
    role: "admin"
}, process.env.SECRET, {
    algorithm: process.env.ALG,
    expiresIn: "1h"
})

return ok("message", "OK");*/

//criar .env
//criar .env.example


/*import * as jwt from 'jsonwebtoken';

interface IJwtData{
    uid: number;
}

const sign = (data: IJwtData) => {
    if(!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';

    return jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '24h'});
};

const verify = (token: string): IJwtData | 'JWT_SECRET_NOT_FOUND' | 'INVALID_TOKEN' => {
    if(!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === 'string'){
            return 'INVALID_TOKEN';
        }

        return decoded;
    }catch (error){
        return 'INVALID_TOKEN';
    }
}; */