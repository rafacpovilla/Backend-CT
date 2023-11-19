import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import NotFoundError from "src/errors/NotFoundError";
import { ok } from "src/utils/Returns";
import ClientError from "src/errors/ClientError";

const updatePassword = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
  const { email, nova_senha } = JSON.parse(event.body);
  if (email === undefined)
      throw new ClientError("Pessoa não formatada!");

    if (nova_senha === undefined)
        throw new ClientError("Pessoa não formatada!");
      
  const database = new PeopleRepositories();
  const person = await database.findByEmail(email);

  if (person === undefined)
      throw new NotFoundError("Pessoa não encontrada!");

  await database.updatePassword(person, nova_senha);
    
  return ok("message", "Pessoa atualizada com sucesso!");
  };
  
  export const handler = Handler(updatePassword);