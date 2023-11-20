import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import NotFoundError from "src/errors/NotFoundError";
import ClientError from "src/errors/ClientError";
import UnauthorizedError from "src/errors/UnauthorizedError";
import ValidationError from "src/errors/ValidationError";
import { ok } from "src/utils/Returns";


const deleteRoom = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {

    const { login, senha_admin } = JSON.parse(event.body);
    if (login === undefined || senha_admin === undefined)
      throw new ValidationError("Login ou senha não definido!");

    const database2 = new PeopleRepositories();
    const admin = await database2.findByEmail(login);

    if (!(login === "ADMIN" && senha_admin === admin.senha))
      throw new UnauthorizedError("Sem permissão de acesso!");
  
    const { id } = event.pathParameters;
    if (id === undefined)
        throw new ValidationError("Quarto não formatado!");

    const database = new RoomsRepositories();
    const room = await database.findById(id);
    if (room === undefined)
        throw new NotFoundError("Quarto não encontrado!");

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