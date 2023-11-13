import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import NotFoundError from "src/errors/NotFoundError";
import { ok } from "src/utils/Returns";

const findPerson = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
    const { name } = JSON.parse(event.body);
    if (name === undefined)
        throw new NotFoundError("Nome não encontrado!");

    const database = new PeopleRepositories();

    const person = await database.findByName(name);
    
    console.log(person);
    return ok("Pessoa criada com sucesso!", "message");
  };
  
  export const handler = Handler(findPerson);