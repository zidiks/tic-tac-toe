import { v4 as uuidv4 } from 'uuid';

export class Profile {

    public id;
    public name: string;

    constructor() {
        this.id = uuidv4();
    }

}