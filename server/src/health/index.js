import createHealthRoutes from './health.routes';

export { makeCheckDatabase } from './health.service';
export { healthStatus, makeDependencyStatus } from './health.handler';
export default createHealthRoutes;
