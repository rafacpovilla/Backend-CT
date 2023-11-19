import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import ClientError from "src/errors/ClientError";
import NotFoundError from "src/errors/NotFoundError";
import { ok } from "src/utils/Returns";


const updateRoom = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
  const { room_id, qtd_camas } = JSON.parse(event.body);
  if (room_id  === undefined)
      throw new ClientError("Id não formatada!");
      
  const database = new RoomsRepositories();
  const room = await database.findById(room_id);

  if (room === undefined)
      throw new NotFoundError("Quarto não encontrado!");

  await database.update(room_id, qtd_camas);
    
  return ok("message", "Quarto atualizado com sucesso!");
  };
  
  export const handler = Handler(updateRoom);