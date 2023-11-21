import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import ClientError from "src/errors/ClientError";
import NotFoundError from "src/errors/NotFoundError";
import ValidationError from "src/errors/ValidationError";
import { ok } from "src/utils/Returns";

const removePerson = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
    const { id_quarto, email } = JSON.parse(event.body);
    if (id_quarto === undefined || email === undefined)
      throw new ValidationError("ID/email não formatado!");

    const database = new RoomsRepositories();
    const room = await database.findById(id_quarto);

    if (room === undefined)
      throw new NotFoundError("Quarto não encontrado!");

    database.removePerson(room, email);


    const database2 = new PeopleRepositories();
    const person = await database2.findByEmail(email);

    if (person.id_quarto === id_quarto) {
      database.removePerson(room, email);
      database2.removeRoom(person);
    }
    else if (room === undefined)
      throw new NotFoundError ("Quarto não encontrado");
    else
      throw new ClientError ("Pessoa não está dentro desse quarto");

        
    return ok("message", "Pessoa removida com sucesso!");
  };
  
  export const handler = Handler(removePerson);