# swagger-portal-server
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
    patch:
        edit document

    /{uuid}
        get:
            return a swagger document
            {
                id: uuid
                title: string,
                description: string,
                swaggerUrl: string
            }
```
