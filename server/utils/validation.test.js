const expect = require('expect');
const {isRealString} = require('./validation.js');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var res = isRealString(99);
        expect(res).toBe(false);
    });
    it('should reject string with only spaces', () => {
        var res = isRealString('    ');
        expect(res).toBe(false);
    });
    it('should allow strings with non space characters', () => {
        var res = isRealString('  Arjun  ');
        expect(res).toBe(true);
    });
});