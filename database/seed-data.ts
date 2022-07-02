//Informacion a insertar de forma automatica

interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry{
    description: string,
    status: string,
    createdAt: number
}

export const seedData: SeedData =  {
    entries: [
        {
            description: 'Pending: Entry 1',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'Progress: Entry 2',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            description: 'Finish: Entry 3',
            status: 'finished',
            createdAt: Date.now() - 10000,
        },
        {
            description: 'Finish: Entry 4',
            status: 'finished',
            createdAt: Date.now() - 1000,
        }
    ]
}