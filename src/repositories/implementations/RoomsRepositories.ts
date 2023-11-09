import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import IRoomsRepository from '../IRoomsRepositories';
import { v4 as uuidv4 } from "uuid";
import Rooom from 'src/models/Room';
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

    async create(qtd_camas: number, email: string): Promise<void> {

        //Generate UUID (Universally Unique Identifier)
        // Or its just a random string
        const uuid = uuidv4();
        
        // Add a new document with a generated id. And create a new collection called "pessoas" inside the document
        // the object doesn't need to have any data, just an ID to reference a person from the main people collection
        await setDoc(doc(this.db, "quartos", uuid, "pessoas", email), {});

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

        const quartoList = quartoSnapshot.docs.map(doc => 
            ({
                id: doc.id,
                qtd_camas: doc.data().qtd_camas
            })
        );

        return quartoList as unknown as Rooom[];
    }

    async findById(id: string): Promise<Rooom> {

        const document = await getDoc(doc(this.db, "quartos", id));
        if(!document){
            throw new ClientError("Document not found!");
        }

        const room = {
            id: document.id,
            qtd_camas: document.data().qtd_camas
        }
        return room;
    }

    async update(room_id: string, qtd_camas: number): Promise<void> {
        await setDoc(doc(this.db, "quartos", room_id), {
            qtd_camas: qtd_camas
        });
        return undefined;
    }

    async insertPerson(room: Rooom, email: string): Promise<void> {
        await setDoc(doc(this.db, "quartos", room.id, "pessoas", email), {});
        return undefined;
    }

    async removePerson(room: Rooom, email: string): Promise<void> {
        const docRef = doc(this.db, "quartos", room.id, "pessoas", email);
        await deleteDoc(docRef);
        return undefined;
    }
    
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}


export default RoomsRepositories;