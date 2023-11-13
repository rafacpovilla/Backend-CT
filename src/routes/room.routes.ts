export const roomRoutes = {
    createRoom: {
        handler:
          "src/functions/rooms/createRoom.handler",
        events: [
          {
            http: {
              path: "room",
              method: "post",
              cors: true,
              // authorizer: {
              //   name: "authenticate",
              // },
            },
          },
        ],
    },

    removePerson: {
        handler:
          "src/functions/rooms/removePerson.handler",
        events: [
          {
            http: {
              path: "room/remove",
              method: "delete",
              cors: true,
              // authorizer: {
              //   name: "authenticate",
              // },
            },
          },
        ],
    },

    insertPerson: {
        handler:
          "src/functions/rooms/insertPerson.handler",
        events: [
          {
            http: {
              path: "room/insert",
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