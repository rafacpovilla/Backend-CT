import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import NotFoundError from "src/errors/NotFoundError";
import { ok } from "src/utils/Returns";
import ClientError from "src/errors/ClientError";

const updatePerson = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
  const { name, change, condition } = JSON.parse(event.body);
  if (name === undefined)
      throw new ClientError("Pessoa não formatada!");
    
      
  const database = new PeopleRepositories();
  const person = await database.findByName(name);
  
  if (person === undefined)
      throw new NotFoundError("Pessoa não encontrada!");

  await database.update(person, change, condition);
    
  return ok("message", "Pessoa atualizada com sucesso!");
  };
  
  export const handler = Handler(updatePerson);