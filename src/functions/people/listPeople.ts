import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import NotFoundError from "src/errors/NotFoundError";
import { noContent } from "src/utils/Returns";


const listPeople = async (): Promise<APIGatewayProxyResult> => {
  
    const database = new PeopleRepositories();

    const list = await database.list();
    console.log(list);
        
    return noContent ();
  };
  
  export const handler = Handler(listPeople);