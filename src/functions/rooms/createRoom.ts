import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import ClientError from "src/errors/ClientError";
import { created } from "src/utils/Returns";

const createRoom = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
    const { qtd_cama } = JSON.parse(event.body);
    if (!qtd_cama)
      throw new ClientError("Quantidade de camas não definida");

    const database = new RoomsRepositories();

    database.create(qtd_cama, "pioneira@gmail.com");
        
    return created("Quarto criado com sucesso!", "message");
  };
  
  export const handler = Handler(createRoom);