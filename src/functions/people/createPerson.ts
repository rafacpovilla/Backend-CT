import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import ClientError from "src/errors/ClientError";
import { created } from "src/utils/Returns";

const createPerson = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
    const { nome, email, empresa, senha  } = JSON.parse(event.body);
    if (nome === undefined || email === undefined || empresa === undefined || senha === undefined)
        throw new ClientError("Algum campo não definido!");

    const database = new PeopleRepositories();
    const exist = await database.findByEmail(email);
    if (exist !== undefined)
        throw new ClientError("Email já cadastrado!");

    database.create(nome, email, senha, empresa);
        
    return created("message", "Pessoa criada com sucesso!");
  };
  
  export const handler = Handler(createPerson);