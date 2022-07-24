import { hello } from "../handler";

describe('hello', () => {
    it('works', async () => {
        const response = await hello({ body: { name: 'Didi'}}, undefined, undefined);
        expect(response.message).toEqual('Hello Didi, welcome to the exciting Serverless world!')
    })
})