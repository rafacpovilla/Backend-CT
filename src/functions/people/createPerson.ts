import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import ClientError from "src/errors/ClientError";
import ValidationError from "src/errors/ValidationError";
import UnauthorizedError from "src/errors/UnauthorizedError";
import { created } from "src/utils/Returns";

const createPerson = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
    const { login, senha_admin } = JSON.parse(event.body);
    if (login === undefined || senha_admin === undefined)
      throw new ValidationError("Login ou senha não definido!");

    const database = new PeopleRepositories();
    const admin = await database.findByEmail(login);

    if (!(login === "ADMIN" && senha_admin === admin.senha))
      throw new UnauthorizedError("Sem permissão de acesso!");

    const { nome, email, empresa, senha  } = JSON.parse(event.body);
    if (nome === undefined || email === undefined || empresa === undefined || senha === undefined)
        throw new ValidationError("Algum campo não definido!");

    const exist = await database.findByEmail(email);
    if (exist !== undefined)
        throw new ClientError("Email já cadastrado!");

    database.create(nome, email, senha, empresa);
        
    return created("message", "Pessoa criada com sucesso!");
  };
  
  export const handler = Handler(createPerson);