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

    async findByEmail(email: string): Promise<Person> {
        const document = await getDoc(doc(this.db, "pessoas", email));
        if(!document){
            throw new ClientError("Document not found!");
        }

        const person = {
            name: document.data().name,
            email: document.id,
            senha: document.data().password,
            empresa: document.data().empresa,
            com_quarto: document.data().com_quarto,
        }
        return person;
    }

    async list(): Promise<Person[]> {
        const peopleCollection = collection(this.db, 'pessoas');
        const peopleSnapshot = await getDocs(peopleCollection);

        const personList = peopleSnapshot.docs.map(doc => 
            ({
                name: doc.data().name,
                email: doc.id,
                senha: doc.data().password,
                empresa: doc.data().empresa,
                com_quarto: doc.data().com_quarto,
            })
        );

        return personList as unknown as Person[];
    }

    update(Person: Person, change: string, condition: number): Promise<void> {
        switch(condition){
            case 0:
                setDoc(doc(this.db, "pessoas", Person.email), {
                    com_quarto: false,
                    password: Person.senha,
                    empresa: Person.empresa,
                    name: Person.name
                });
                break;
            case 1:
                setDoc(doc(this.db, "pessoas", Person.email), {
                    com_quarto: true,
                    password: Person.senha,
                    empresa: Person.empresa,
                    name: Person.name
                });
                break;
            case 2:
                setDoc(doc(this.db, "pessoas", Person.email), {
                    password: change,
                    com_quarto: Person.com_quarto,
                    empresa: Person.empresa,
                    name: Person.name
                });
                break;
            case 3:
                setDoc(doc(this.db, "pessoas", Person.email), {
                    empresa: change,
                    password: Person.senha,
                    com_quarto: Person.com_quarto,
                    name: Person.name
                });
                break;
            default:
                throw new ClientError("Condição inválida!");
        }
        return undefined;
    }

    async delete(email: string): Promise<void> {
        const docRef = doc(this.db, "pessoas", email);
        await deleteDoc(docRef);
        return undefined;
    }
}

export default PeopleRepositories;