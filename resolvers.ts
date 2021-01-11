let id = 0;

module.exports = {
    // @ts-ignore
    user({ id }) {
        // @ts-ignore
        return providers.users.find(item => item.id === Number(id));
    },
    users() {
        return {
            users: []
        };
    },
    // @ts-ignore
    createUser({ name, repo, age }) {
        const user = {
            id: id++,
            name,
            repo,
            age
        };

        // @ts-ignore
        providers.users.push(user);

        return user;
    }
};
