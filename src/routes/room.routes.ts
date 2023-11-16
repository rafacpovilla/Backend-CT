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
              path: "room/person",
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
              path: "room/person",
              method: "post",
              cors: true,
              // authorizer: {
              //   name: "authenticate",
              // },
            },
          },
        ],
    },

    listRooms: {
        handler:
          "src/functions/rooms/listRooms.handler",
        events: [
          {
            http: {
              path: "room",
              method: "get",
              cors: true,
              // authorizer: {
              //   name: "authenticate",
              // },
            },
          },
        ],
    },

    findRoom: {
        handler:
          "src/functions/rooms/findRoom.handler",
        events: [
          {
            http: {
              path: "room/find",
              method: "post",
              cors: true,
              // authorizer: {
              //   name: "authenticate",
              // },
            },
          },
        ],
    },

    updateRoom: {
      handler:
        "src/functions/rooms/updateRoom.handler",
        events: [
          {
            http: {
              path: "room",
              method: "put",
              cors: true,
              // authorizer: {
              //   name: "authenticate",
              // },
            },
          },
        ],
    }
}