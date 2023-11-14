import Person from "src/models/Person";

interface IPeopleRepositories {
    /**
     * Create a new person
     * @param name Name of the person
     * @param email Email of the person
     * @param password password of the person
     */
    create(name: string, email: string, password: string, empresa: string): Promise<void>;

    /**
     * Find a person by name
     * @param name Name of the person
     * @returns A person with the given name
     */
    findByName(name: string): Promise<Person>;

    /**
     * List all people
     */
    list(): Promise<Person[]>;

    /**
     * Update a person
     * @param name Name of the person
     * @param change New value of the person
     * @param condition Condition to be changed (0 - com_quarto=false, 1 - com_quarto=true, 2 - password, 3 - empresa)
     */
    update(Person: Person, change: string, condition: number): Promise<void>;

    /**
     * Delete a person
     * @param name Name of the person
     */
    delete(name: string): Promise<void>;
}

export default IPeopleRepositories;