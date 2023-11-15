import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import NotFoundError from "src/errors/NotFoundError";
import { ok } from "src/utils/Returns";

const findRoom = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
    const { id } = JSON.parse(event.body);
    if (id === undefined)
        throw new NotFoundError("Id não encontrado!");

    const database = new RoomsRepositories();

    const room = await database.findById(id);
    
    return ok("message", room);
  };
  
  export const handler = Handler(findRoom);