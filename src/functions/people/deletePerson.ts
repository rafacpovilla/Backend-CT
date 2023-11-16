import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import NotFoundError from "src/errors/NotFoundError";
import { ok } from "src/utils/Returns";


const deletePerson = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
    const { email  } = event.pathParameters;
    if (email === undefined)
        throw new NotFoundError("Pessoa não encontrada!");

    const database = new PeopleRepositories();

    database.delete(email);
        
    return ok("message", "Pessoa deletada com sucesso!");
  };
  
  export const handler = Handler(deletePerson);