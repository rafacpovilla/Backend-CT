import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import NotFoundError from "src/errors/NotFoundError";
import { ok } from "src/utils/Returns";


const listRooms = async (): Promise<APIGatewayProxyResult> => {
  
    const database = new RoomsRepositories();

    const findAll = await database.findAll();
        
    return ok ("message", findAll);
  };
  
  export const handler = Handler(listRooms);