import { User } from '../models/user';

export const usersMock: User[] = [
    {
        id: "1",
        name: "Pepe Gotera",
        street: "Chapuzas a domicilio",
        phone: "+34111111111",
        iban: "12345678901234567890",
        isAdmin: false,
    },
    {
        id: "2",
        name: "Otilio",
        street: "Chapuzas a domicilio",
        phone: "+34222222222",
        iban: "12345678901234567890",
        isAdmin: true,
    }
];
