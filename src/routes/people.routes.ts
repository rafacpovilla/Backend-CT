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

    findPerson: {
        handler:
          "src/functions/people/findPerson.handler",
        events: [
          {
            http: {
              path: "person/find",
              method: "get",
              cors: true,
              // authorizer: {
              //   name: "authenticate",
              // },
            },
          },
        ],
    },

    deletePerson: {
        handler:
          "src/functions/people/deletePerson.handler",
        events: [
          {
            http: {
              path: "person/delete",
              method: "delete",
              cors: true,
              // authorizer: {
              //   name: "authenticate",
              // },
            },
          },
        ],
    },

    updatePerson: {
        handler:
          "src/functions/people/updatePerson.handler",
        events: [
          {
            http: {
              path: "person/update",
              method: "put",
              cors: true,
              // authorizer: {
              //   name: "authenticate",
              // },
            },
          },
        ],
    },
}