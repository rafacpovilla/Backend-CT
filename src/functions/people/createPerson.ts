import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
//import ClientError from "src/errors/ClientError";
import { ok } from "src/utils/Returns";

const createRoom = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
    const { name, email, empresa, password  } = JSON.parse(event.body);

    const database = new PeopleRepositories();

    database.create(name, email, password, empresa);
        
    return ok("Pessoa criada com sucesso!", "message");
  };
  
  export const handler = Handler(createRoom);