import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import ClientError from "src/errors/ClientError";
import { ok } from "src/utils/Returns";

const insertPerson = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
    const { id_quarto, email } = JSON.parse(event.body);
    
    if (!id_quarto)
      throw new ClientError("ID errado!");

    const database = new RoomsRepositories();

    const room = await database.findById(id_quarto);
    if (!room)
      throw new ClientError("Quarto não encontrado!");

    /*if (database.roomIsFull(room)) 
      throw new ClientError("Quarto cheio!");*/

    if (room.qtd_camas > 0)
    {
      database.insertPerson(room, email);
      database.update(room.id, room.qtd_camas - 1);
    }
    else
      throw new ClientError("Quarto cheio!");
        
    return ok("message", "Pessoa adicionada com sucesso!");
  };
  
  export const handler = Handler(insertPerson);