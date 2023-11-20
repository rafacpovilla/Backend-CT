import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import NotFoundError from "src/errors/NotFoundError";
import { ok, forbidden } from "src/utils/Returns";


const isAdministrator = (adminId: string): boolean => {
  const ADMIN_ID = "admin@gmail.com";
  return adminId === ADMIN_ID;
};

const deletePerson = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
    const { email  } = event.pathParameters;
    if (email === undefined)
        throw new NotFoundError("Pessoa não encontrada!");
    
    const isAdmin = isAdministrator(event.headers?.["X-Admin-Id"] || "");
    if (!isAdmin) {
      return forbidden("message", "Acesso não autorizado!");
    }

    const database = new PeopleRepositories();
    const person = await database.findByEmail(email);
    if (person === undefined)
        throw new NotFoundError("Pessoa não encontrada!");

    const database2 = new RoomsRepositories();
    const room = await database2.findById (person.id_quarto);
    await database2.removePerson (room, email);

    database.delete(email);
        
    return ok("message", "Pessoa deletada com sucesso!");
  };
  
  export const handler = Handler(deletePerson);