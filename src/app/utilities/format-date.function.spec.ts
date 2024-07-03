import { formatDateWithYYYYMMDD } from "./format-date.function";

describe('adsfdfs', ()=> {
    it('asdfadff', ()=> {
        const date = new Date('2024-01-01T00:00:00');

        expect(formatDateWithYYYYMMDD(date)).toEqual('2024-01-01');
    })
})