import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import ValidationError from "src/errors/ValidationError";
import { created } from "src/utils/Returns";

const createRoom = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
    const { qtd_cama } = JSON.parse(event.body);

    if (qtd_cama === undefined)
      throw new ValidationError("Quantidade de camas não definida");

    const database2 = new RoomsRepositories();

    database2.create(qtd_cama);
        
    return created("message", "Quarto criado com sucesso!");
  };
  
  export const handler = Handler(createRoom);