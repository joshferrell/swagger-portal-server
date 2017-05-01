# swagger-portal-server

[![Join the chat at https://gitter.im/swagger-portal-server/Lobby](https://badges.gitter.im/swagger-portal-server/Lobby.svg)](https://gitter.im/swagger-portal-server/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
A backend API that allows the rendering of swagger files and search for API documentation.

## Routes

```
/docs
    get:
        returns a list of documents structured
        [{
            id: uuid
            title: string,
            description: string,
            swaggerUrl: string
        }]
    post:
        upload a document
        {
            title: string,
            description: string,
            swaggerDocument: file
        }

    /{uuid}
        get:
            return a swagger document
            {
                id: uuid
                title: string,
                description: string,
                swaggerUrl: string
            }
        patch:
            edit document
            {
                title: string,
                description: string,
                swaggerDocument: file
            }
```
