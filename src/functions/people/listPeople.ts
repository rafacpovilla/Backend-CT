import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import NotFoundError from "src/errors/NotFoundError";
import { ok } from "src/utils/Returns";


const listPeople = async (): Promise<APIGatewayProxyResult> => {
  
    const database = new PeopleRepositories();

    const list = await database.list();
        
    return ok ("message", list);
  };
  
  export const handler = Handler(listPeople);