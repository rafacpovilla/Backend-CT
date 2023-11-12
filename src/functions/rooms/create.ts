import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import { ok } from "src/utils/Returns";

const createRoom = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
    const database = new RoomsRepositories();

    database.create(2, "teste@gmail.com");
        
  };
  
  export const handler = Handler(createRoom);