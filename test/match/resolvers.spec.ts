import { Query } from '../../src/match/resolvers';

// const queryStub = collection => {
//   if (q == 'SELECT * from tweets') {
//     return Promise.resolve({
//       rows: [
//         { id: 1, body: 'hello' },
//         { id: 2, body: 'world' }
//       ]
//     });
//   }
// };

// eslint-disable-next-line no-undef
describe('QUERY Match', () => {
  // eslint-disable-next-line no-undef
  it('Function matches()', async () => {
    const context = {
      collection: {
        orderBy: {
          get: {
            data: {
              matches: [
                {
                  idDoc: 'nUZgGlVIxfGmWRvOqdvA',
                  game: {
                    name: 'Zombicide: Black Plague',
                    imageUrl: 'https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559254904698-61gxfLrgk2L.jpg'
                  },
                  comments: null,
                  players: [
                    {
                      name: 'João Gabriel'
                    }
                  ]
                }
              ]
            }
          }
        }
      }
    };
    const data = await Query.matches(null, null, context);
    console.log('data => ', data);
    //         expect(typeof Query.friends()).toBe("object");
  });
//
//     it("Function friend()", () => {
//         expect(typeof Query.friend("", {id: 0})).toBe("undefined");
//     });
});
//
// describe("MUTATION Friend", () => {
//     it("Function createFriend()", () => {
//         const friend = Mutation.createFriend("", {uid: 1, name: "name"})
//         expect(typeof friend).toBe("object");
//         expect(friend.uid).toBe(1);
//         expect(friend.name).toBe("name");
//     });
// });
//
// describe("MODEL Friend", () => {
//     it("Property uid", () => {
//         const uid = Friend.uid({uid: "1"});
//         expect(typeof uid).toBe("string");
//         expect(uid).toBe("1");
//     });
//
//     it("Property name", () => {
//         const name = Friend.name({name: "name"});
//         expect(typeof name).toBe("string");
//         expect(name).toBe("name");
//     });
// });
