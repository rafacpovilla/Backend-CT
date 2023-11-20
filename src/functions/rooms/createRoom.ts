import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import PeopleRepositories from "src/repositories/implementations/PeopleRepositories";
import UnauthorizedError from "src/errors/UnauthorizedError";
import ValidationError from "src/errors/ValidationError";
import { created } from "src/utils/Returns";

const createRoom = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    const { login, senha_admin } = JSON.parse(event.body);
    if (login === undefined || senha_admin === undefined)
      throw new ValidationError("Login ou senha não definido!");

    const database = new PeopleRepositories();
    const admin = await database.findByEmail(login);

    if (!(login === "ADMIN" && senha_admin === admin.senha))
      throw new UnauthorizedError("Sem permissão de acesso!");


    const { qtd_cama } = JSON.parse(event.body);
    if (!qtd_cama)
      throw new ValidationError("Quantidade de camas não definida");

    const database2 = new RoomsRepositories();

    database2.create(qtd_cama);
        
    return created("message", "Quarto criado com sucesso!");
  };
  
  export const handler = Handler(createRoom);