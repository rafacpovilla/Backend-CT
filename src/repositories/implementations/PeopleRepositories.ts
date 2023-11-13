import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, getDoc, deleteDoc } from "firebase/firestore"; 
import IPeopleRepositories from '../IPeopleRepositories';
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

class PeopleRepositories implements IPeopleRepositories {
    list(): Promise<Person[]> {
        throw new Error("Method not implemented.");
    }
    update(name: string, email: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    private readonly db = getFirestore(app);

    async create(name: string, email: string, password: string, empresa: string): Promise<void> {
        await setDoc(doc(this.db, "pessoas", email), {
            name,
            password,
            empresa,
            com_quarto: false, // Define como false por padrão
        });

        return undefined;
    }

    async findByName(name: string): Promise<Person> {
        const document = await getDoc(doc(this.db, "pessoas", name));
        if(!document){
            throw new ClientError("Document not found!");
        }

        const person = {
            name: document.data().name,
            email: document.data().email,
            senha: document.data().senha,
            empresa: document.data().empresa,
            com_quarto: document.data().com_quarto,
        }
        return person;
    }

    async delete(name: string): Promise<void> {
        const docRef = doc(this.db, "pessoas", name);
        await deleteDoc(docRef);
        return undefined;
    }
}

export default PeopleRepositories;