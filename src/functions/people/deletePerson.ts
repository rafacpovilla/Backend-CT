import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import ValidationError from "src/errors/ValidationError";
import NotFoundError from "src/errors/NotFoundError";
import UnauthorizedError from "src/errors/UnauthorizedError";
import { ok } from "src/utils/Returns";
import ClientError from "src/errors/ClientError";


const deletePerson = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    const { login, senha_admin } = JSON.parse(event.body);

    const database = new PeopleRepositories();
    const admin = await database.findByEmail(login);

    if (!(login === "ADMIN" && senha_admin === admin.senha))
      throw new UnauthorizedError("Sem permissão de acesso!");
    
    const { email  } = event.pathParameters;
    if (email === undefined)
        throw new ValidationError("Pessoa não formatada!");

    const person = await database.findByEmail(email);
    if (person === undefined)
        throw new NotFoundError("Pessoa não encontrada!");


    if (person.id_quarto !== null) {
      const database2 = new RoomsRepositories();
      const room = await database2.findById (person.id_quarto);
      await database2.removePerson (room, email);
    }

    database.delete(email);
        
    return ok("message", "Pessoa deletada com sucesso!");
  };
  
  export const handler = Handler(deletePerson);