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
    findByName(name: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Person[]> {
        throw new Error("Method not implemented.");
    }
    update(name: string, email: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(name: string): Promise<void> {
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

    /*async findByName(name: string): Promise<Person[]> {
        const querySnapshot =  await getDoc(doc(this.db, "quartos", id));
        const people: Person[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.name === name) {
                people.push({
                    name: data.name,
                    email: doc.id,
                    password: data.password,
                    empresa: data.empresa,
                    com_quarto: data.com_quarto,
                });
            }
        });
        return people;
    }

    async list(): Promise<Person[]> {
        const querySnapshot = await getDocs(collection(this.db, "pessoas"));
        const people: Person[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            people.push({
                name: data.name,
                email: doc.id,
                password: data.password,
                empresa: data.empresa,
                com_quarto: data.com_quarto,
            });
        });
        return people;
    }

    async update(email: string, name: string, empresa: string): Promise<void> {
        const docRef = doc(this.db, "pessoas", email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            await setDoc(docRef, { name, empresa }, { merge: true });
        } else {
            throw new ClientError("Pessoa não encontrada");
        }
    }

    async delete(email: string): Promise<void> {
        await deleteDoc(doc(this.db, "pessoas", email));
    }
}
        // Implement the delete method here
        throw new Error("Method not implemented.");
    }*/
}

export default PeopleRepositories;