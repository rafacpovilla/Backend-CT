import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import NotFoundError from "src/errors/NotFoundError";
import { ok } from "src/utils/Returns";


const deleteRoom = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
    const { qtd_cama } = JSON.parse(event.body);
    if (qtd_cama === undefined)
        throw new NotFoundError("Cama não encontrada!");

    const database = new RoomsRepositories();

    database.delete(qtd_cama);

    return ok("message", "Cama deletada com sucesso");
  };

  export const handler = Handler(deleteRoom);