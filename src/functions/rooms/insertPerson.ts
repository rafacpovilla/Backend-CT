import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import ClientError from "src/errors/ClientError";
import ValidationError from "src/errors/ValidationError";
import NotFoundError from "src/errors/NotFoundError";
import { ok } from "src/utils/Returns";

const insertPerson = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
    const { id_quarto, email } = JSON.parse(event.body);
    
    if (id_quarto === undefined)
      throw new ValidationError("ID não detectado!");

    const database = new RoomsRepositories();

    const room = await database.findById(id_quarto);

    if (room === undefined)
      throw new NotFoundError("Quarto não encontrado!");

    if (await database.roomIsFull(room)) 
      throw new ClientError("Quarto cheio!");

    const database2 = new PeopleRepositories();
    const person = await database2.findByEmail(email);

    if (person === undefined)
      throw new NotFoundError("Pessoa não cadastrada!");

    if (!person.com_quarto)
      database.insertPerson(room, person);

    else
      throw new ClientError("Pessoa já está em um quarto!");
        
    return ok("message", "Pessoa adicionada com sucesso!");
  };
  
  export const handler = Handler(insertPerson);