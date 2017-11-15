import createDocRoutes from './docs.routes';

export { postFormat, responseFormat } from './docs.format';
export {
    makeGetAllDocuments,
    makeCreateDocument,
    makeGetDocument,
    makeUpdateDocument,
    makeDeleteDocument
} from './docs.handler';
export default createDocRoutes;
