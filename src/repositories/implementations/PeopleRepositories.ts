import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, getDoc, deleteDoc } from "firebase/firestore"; 
import IPeopleRepositories from '../IPeopleRepositories';
import { v4 as uuidv4 } from "uuid";
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
}

export default PeopleRepositories;