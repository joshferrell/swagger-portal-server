import { connect } from './orm';

describe('connecting to postgres', () => {
    it('should be able to configure the database', async () => {
        const success = await connect();
        expect(success).toBe(true);
    });
});
