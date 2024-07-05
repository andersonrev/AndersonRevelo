import { formatDateWithYYYYMMDD } from "./format-date.function";

describe('FormaDateWithFormat', ()=> {
    it('should format a date', ()=> {
        const date = new Date('2024-01-01T00:00:00');

        expect(formatDateWithYYYYMMDD(date)).toEqual('2024-01-01');
    })
})