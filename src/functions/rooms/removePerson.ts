import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import ClientError from "src/errors/ClientError";
import { ok } from "src/utils/Returns";

const removePerson = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
    const { id_quarto, email } = JSON.parse(event.body);
    if (!id_quarto)
      throw new ClientError("Quarto não achado!");

    const database = new RoomsRepositories();

    const room = await database.findById(id_quarto);
    database.removePerson(room, email);

    const database2 = new PeopleRepositories();
    database2.removeRoom(email);
        
    return ok("message", "Pessoa removida com sucesso!");
  };
  
  export const handler = Handler(removePerson);