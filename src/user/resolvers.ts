const providers = {
    users: []
};

export const Query = {
    users: () => {
        return providers.users;
    },
    user: (_: any, {id}: any) => {
        // @ts-ignore
        return providers.users.find(item => item.id === Number(id));
    },
};

export const Mutation = {
    // @ts-ignore
    createUser(_, { name, repo, age }) {
        const user = {
            id: 1,
            name,
            repo,
            age
        };

        // @ts-ignore
        providers.users.push(user);

        return user;
    }
};

export const User = {
    id: (user: { id: any; }) => user.id,
    name: (user: { name: string; }) => user.name,
    repo: (user: { repo: string; }) => user.repo,
    age: (user: { age: number; }) => user.age,
};
