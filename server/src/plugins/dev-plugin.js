/*
 * @param {url, scheme} serverInfo object containing server information
 * @param {formattedName, description, version, author} packageData object containing package data
 */
export const createSwaggerOptions = (serverInfo, packageData) => ({
    host: serverInfo.url,
    swaggerUI: true,
    info: {
        title: `${packageData.formattedName} Documentation`,
        description: packageData.description,
        version: packageData.version,
        contact: {
            ...packageData.author
        }
    },
    securityDefinitions: {
        manageLicense: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
        }
    },
    grouping: 'tags',
    schemes: [serverInfo.scheme]
});

/*
 * @param {url, scheme} serverInfo object containing server information
 * @param {formattedName, description, version, author} packageData object containing package data
 */
const createDevPlugins = (serverInfo, packageData) => {
    const swaggerOptions = createSwaggerOptions(serverInfo, packageData);
    return [
        { plugin: 'inert' },
        { plugin: 'vision' },
        {
            plugin: {
                register: 'hapi-swagger',
                options: swaggerOptions
            }
        }
    ];
};

export default createDevPlugins;
