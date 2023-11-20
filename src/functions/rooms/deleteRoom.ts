import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import NotFoundError from "src/errors/NotFoundError";
import ClientError from "src/errors/ClientError";
import { ok, forbidden } from "src/utils/Returns";


const isAdministrator = (adminId: string): boolean => {
    const ADMIN_ID = "admin@gmail.com";
    return adminId === ADMIN_ID;
  };

const deleteRoom = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
    const { id } = event.pathParameters;
    if (id === undefined)
        throw new ClientError("Quarto não formatado!");

    const isAdmin = isAdministrator(event.headers?.["X-Admin-Id"] || "");
    if (!isAdmin) {
        return forbidden("message", "Acesso não autorizado");
    }

    const database = new RoomsRepositories();
    const room = await database.findById(id);
    if (room === undefined)
        throw new NotFoundError("Quarto não encontrado!");

    const database2 = new PeopleRepositories();
    const listaEmail = await database.listPeopleInsideRoom(room);
    for (let i = 0; i < listaEmail.length; i++) {
        const person = await database2.findByEmail(listaEmail[i]);
        await database.removePerson (room, listaEmail[i])
        await database2.removeRoom(person);
    }
    
    database.delete(room);

    return ok("Quarto deletado com sucesso", "message");
  };

  export const handler = Handler(deleteRoom);