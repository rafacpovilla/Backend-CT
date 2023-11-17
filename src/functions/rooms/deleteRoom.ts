import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import NotFoundError from "src/errors/NotFoundError";
import { ok } from "src/utils/Returns";


const deleteRoom = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
    const { id } = JSON.parse(event.body);
    if (id === undefined)
        throw new NotFoundError("Quarto não encontrado!");

    const database = new RoomsRepositories();
    const room = await database.findById(id);

    database.delete(room);

    return ok("Cama deletada com sucesso", "message");
  };

  export const handler = Handler(deleteRoom);