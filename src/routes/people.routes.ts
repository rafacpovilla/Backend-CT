export const peopleRoutes = {
    createPerson: {
        handler:
          "src/functions/people/createPerson.handler",
        events: [
          {
            http: {
              path: "person",
              method: "post",
              cors: true,
              // authorizer: {
              //   name: "authenticate",
              // },
            },
          },
        ],
    },
}