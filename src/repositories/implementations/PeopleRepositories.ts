import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, getDoc, deleteDoc } from "firebase/firestore"; 
import IPeopleRepositories from '../IPeopleRepositories';
import Person from "src/models/Person";

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
            nome: name,
            senha: password,
            empresa,
            com_quarto: false, // Define como false por padrão
            id_quarto: null
        });

        return undefined;
    }

    async findByEmail(email: string): Promise<Person> {
        const document = await getDoc(doc(this.db, "pessoas", email));
        if (!document.exists()) {
            return undefined;
        }

        const person = {
            nome: document.data().nome,
            email: document.id,
            senha: document.data().senha,
            empresa: document.data().empresa,
            com_quarto: document.data().com_quarto,
            id_quarto: document.data().id_quarto
        }
        return person;
    }

    async list(): Promise<Person[]> {
        const peopleCollection = collection(this.db, 'pessoas');
        const peopleSnapshot = await getDocs(peopleCollection);

        const personList = peopleSnapshot.docs.map(doc => 
            ({
                nome: doc.data().nome,
                email: doc.id,
                //senha: doc.data().senha,
                empresa: doc.data().empresa,
                com_quarto: doc.data().com_quarto,
                id_quarto: doc.data().id_quarto
            })
        );

        return personList as unknown as Person[];
    }

    async updatePassword(Person: Person, new_password: string): Promise<void> {
        await setDoc(doc(this.db, "pessoas", Person.email), {
            nome: Person.nome,
            senha: new_password,
            empresa: Person.empresa,
            com_quarto: Person.com_quarto,
            id_quarto: Person.id_quarto
        });
        return undefined;
    }

    async delete(email: string): Promise<void> {
        const docRef = doc(this.db, "pessoas", email);
        await deleteDoc(docRef);
        return undefined;
    }

    async removeRoom (Person: Person): Promise<void> {
        await setDoc(doc(this.db, "pessoas", Person.email), {
            nome: Person.nome,
            email: Person.email,
            senha: Person.senha,
            empresa: Person.empresa,
            com_quarto: false,
            id_quarto: null
        });
        return undefined;
    }
}

export default PeopleRepositories;