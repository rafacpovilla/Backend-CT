import Person from "src/models/Person";

interface IPeopleRepositories {
    /**
     * Create a new person
     * @param name Name of the person
     * @param email Email of the person
     * @param password password of the person
     */
    create(name: string, email: string, password: string): Promise<void>;

    /**
     * Find a person by name
     * @param name Name of the person
     */
    findByName(name: string): Promise<void>;

    /**
     * List all people
     */
    list(): Promise<Person[]>;

    /**
     * Update a person
     * @param name Name of the person
     * @param email Email of the person
     */
    update(name: string, email: string): Promise<void>;

    /**
     * Delete a person
     * @param name Name of the person
     */
    delete(name: string): Promise<void>;
}

export { IPeopleRepositories };