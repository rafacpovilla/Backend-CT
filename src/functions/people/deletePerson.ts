import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import NotFoundError from "src/errors/NotFoundError";
import { ok } from "src/utils/Returns";


const deletePerson = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
    const { name  } = JSON.parse(event.body);
    if (name === undefined)
        throw new NotFoundError("Pessoa não encontrada!");

    const database = new PeopleRepositories();

    database.delete(name);
        
    return ok("Pessoa deletada com sucesso!", "message");
  };
  
  export const handler = Handler(deletePerson);