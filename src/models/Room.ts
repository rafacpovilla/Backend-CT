import Person from "./Person";

type QuartoPerson = {
    nome: string;
    empresa: string;
};

type Rooom = {
    id: string;
    qtd_camas: number;
    pessoas: QuartoPerson[];
};

export default Rooom;