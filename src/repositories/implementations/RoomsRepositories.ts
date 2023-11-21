import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import IRoomsRepository from '../IRoomsRepositories';
import { v4 as uuidv4 } from "uuid";
import Rooom from 'src/models/Room';
import Person from "src/models/Person";
import ClientError from "src/errors/ClientError";

const firebaseConfig = {
    apiKey: "AIzaSyAugWyvlqfPQi0Z2COhoLv7O6JH0unUQkk",
    authDomain: "model-projeto-piloto.firebaseapp.com",
    projectId: "model-projeto-piloto",
    storageBucket: "model-projeto-piloto.appspot.com",
    messagingSenderId: "983743934853",
    appId: "1:983743934853:web:df99daf3653a681e5954ec",
    measurementId: "G-VXCT19PXRT"
};

const app = initializeApp(firebaseConfig);

class RoomsRepositories implements IRoomsRepository{
    private readonly db = getFirestore(app);

    async create(qtd_camas: number): Promise<void> {

        //Generate UUID (Universally Unique Identifier)
        // Or its just a random string
        const uuid = uuidv4();
        
        // Add a new document with a generated id. And create a new collection called "pessoas" inside the document
        // the object doesn't need to have any data, just an ID to reference a person from the main people collection
        await setDoc(doc(this.db, "quartos", uuid), {});

        // Add a new document in the "quartos" collection with the generated ID
        // and set the data of the document to the object passed as parameter
        await setDoc(doc(this.db, "quartos", uuid), {
            qtd_camas: qtd_camas
        });

        return undefined;
    }

    async findAll(): Promise<Rooom[]> {

        const quartosCollection = collection(this.db, 'quartos');
        const quartoSnapshot = await getDocs(quartosCollection);

        const quartoList = Promise.all(quartoSnapshot.docs.map(async doc => {
                const pessoasCollection = collection(this.db, 'quartos', doc.id, 'pessoas');
                const pessoasSnapshot = await getDocs(pessoasCollection);
                const pessoas = pessoasSnapshot.docs.map(doc => doc.data());
                return {
                    id: doc.id,
                    qtd_camas: doc.data().qtd_camas,
                    pessoas: pessoas
                }
            })
        );

        return quartoList as unknown as Rooom[];
    }

    async findById(id: string): Promise<Rooom> {
        const quartoDoc = await getDoc(doc(this.db, 'quartos', id));

        if (!quartoDoc.exists())
            return undefined;

        const pessoasCollection = collection(quartoDoc.ref, 'pessoas');

        const pessoasSnapshot = await getDocs(pessoasCollection);

        const listaPessoas = pessoasSnapshot.docs.map((pessoaDoc) => ({
            nome: pessoaDoc.data().nome,
            empresa: pessoaDoc.data().empresa,
        }));
        const room = {
            id: quartoDoc.id,
            qtd_camas: quartoDoc.data().qtd_camas,
            pessoas: listaPessoas,
        };
      return room;
    }

    async update(room_id: string, qtd_camas: number): Promise<void> {
        await setDoc(doc(this.db, "quartos", room_id), {
            qtd_camas: qtd_camas
        });
        return undefined;
    }

    async insertPerson(room: Rooom, Person: Person): Promise<void> {
        await setDoc(doc(this.db, "pessoas", Person.email), {
            nome: Person.nome,
            email: Person.email,
            empresa: Person.empresa,
            com_quarto: true,
            senha: Person.senha,
            id_quarto: room.id
        });
        await setDoc(doc(this.db, "quartos", room.id, "pessoas", Person.email), {});
        await setDoc(doc(this.db, "quartos", room.id, "pessoas", Person.email), {
            nome: Person.nome,
            empresa: Person.empresa
        });
        return undefined;
    }

    async removePerson(room: Rooom, email: string): Promise<void> {
        const docRef = doc(this.db, "quartos", room.id, "pessoas", email);
        await deleteDoc(docRef);
        return undefined;
    }
    
    async delete(room: Rooom): Promise<void> {
        const docRef = doc(this.db, "quartos", room.id);
        await deleteDoc(docRef);
        return undefined;
    }

    async roomIsFull (room: Rooom): Promise<boolean> {
        const document = await getDoc(doc(this.db, "quartos", room.id));
        if(!document){
            throw new ClientError("Document not found!");
        }

        const pessoas = collection(this.db, "quartos", room.id, "pessoas");
        const pessoasSnapshot = await getDocs(pessoas);

        if (pessoasSnapshot.size >= document.data().qtd_camas) {
            return true;
        }
        return false;
    }

    async roomIsEmpty (room: Rooom): Promise<boolean> {
        const document = await getDoc(doc(this.db, "quartos", room.id));
        if(!document.exists()){
            return undefined
        }

        const pessoas = collection(this.db, "quartos", room.id, "pessoas");
        const pessoasSnapshot = await getDocs(pessoas);

        if (pessoasSnapshot.empty) {
            return true;
        }
        return false;
    }   

    async listPeopleInsideRoom(room: Rooom): Promise<string[]> {
        const pessoas = collection(this.db, "quartos", room.id, "pessoas");
        const pessoasSnapshot = await getDocs(pessoas);

        const listaPessoas = pessoasSnapshot.docs.map((pessoaDoc) => pessoaDoc.id);
        return listaPessoas;
    }
}


export default RoomsRepositories;