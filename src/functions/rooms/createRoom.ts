import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import ValidationError from "src/errors/ValidationError";
import { created, forbidden } from "src/utils/Returns";

const createRoom = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
    const { qtd_cama, adminId, adminSenha } = JSON.parse(event.body);

    const tryADM = new PeopleRepositories();
    if (! await tryADM.isAdministrator(adminId, adminSenha)) {
      return forbidden("message", "Acesso não autorizado");
    }
    if (qtd_cama === undefined)
      throw new ValidationError("Quantidade de camas não definida");

    const database = new RoomsRepositories();

    database.create(qtd_cama);
        
    return created("message", "Quarto criado com sucesso!");
  };
  
  export const handler = Handler(createRoom);