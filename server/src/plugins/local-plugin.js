
const createLocalPlugins = () => [
    {
        plugin: {
            register: 'tv',
            options: {
                endpoint: '/tv'
            }
        }
    }
];

export default createLocalPlugins;
