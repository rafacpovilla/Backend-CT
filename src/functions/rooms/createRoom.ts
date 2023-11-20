import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import RoomsRepositories from "src/repositories/implementations/RoomsRepositories";
import ClientError from "src/errors/ClientError";
import { created, forbidden } from "src/utils/Returns";


const isAdministrator = (adminId: string): boolean => {
  const ADMIN_ID = "admin@gmail.com";
  return adminId === ADMIN_ID;
};

const createRoom = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
  
    const { qtd_cama, adminId } = JSON.parse(event.body);
    if (!isAdministrator(adminId)) {
      return forbidden("message", "Acesso não autorizado");
    }
    if (!qtd_cama)
      throw new ClientError("Quantidade de camas não definida");

    const database = new RoomsRepositories();

    database.create(qtd_cama);
        
    return created("message", "Quarto criado com sucesso!");
  };
  
  export const handler = Handler(createRoom);