import { DBTypes } from './DBTypes';

describe('Types', () => {
  describe('integer', () => {
    it('should validate integer', () => {
      const validate = DBTypes['integer'].validate.bind(DBTypes['integer']);

      expect(validate('12')).toBe(true);
      expect(validate(' 12')).toBe(false);
      expect(validate('12.')).toBe(false);
      expect(validate('12.01')).toBe(false);
      expect(validate('0x12')).toBe(false);
    });
  });

  describe('real', () => {
    it('should validate real', () => {
      const validate = DBTypes['real'].validate.bind(DBTypes['real']);

      expect(validate('12')).toBe(true);
      expect(validate(' 12')).toBe(false);
      expect(validate('12.')).toBe(false);
      expect(validate('12.01')).toBe(true);
      expect(validate('12.01.01')).toBe(false);
      expect(validate('0x12')).toBe(false);
    });
  });

  describe('char', () => {
    it('should validate char', () => {
      const validate = DBTypes['char'].validate.bind(DBTypes['char']);

      expect(validate('a')).toBe(true);
      expect(validate(' ')).toBe(true);
      expect(validate('')).toBe(false);
      expect(validate('12')).toBe(false);
    });
  });

  describe('string', () => {
    it('should validate string', () => {
      const validate = DBTypes['string'].validate.bind(DBTypes['string']);

      expect(validate('a')).toBe(true);
      expect(validate(' ')).toBe(true);
      expect(validate('')).toBe(true);
      expect(validate('12')).toBe(true);
    });
  });

  describe('charInvl', () => {
    it('should validate charInvl', () => {
      const validate = DBTypes['charInvl'].validate.bind(DBTypes['charInvl']);

      expect(validate('a-b')).toBe(true);
      expect(validate('a-z')).toBe(true);
      expect(validate('1-9')).toBe(true);
      expect(validate('z-a')).toBe(false);
      expect(validate('z-A')).toBe(false);
      expect(validate('z_A')).toBe(false);
      expect(validate('-az')).toBe(false);
    });
  });

  describe('string(charInvl)', () => {
    it('should validate string(charInvl)', () => {
      const validate = DBTypes['string(charInvl)'].validate.bind(
        DBTypes['string(charInvl)'],
      );

      expect(validate('a-zA-Z')).toBe(true);
      expect(validate('A-Za-z')).toBe(true);
      expect(validate('a-z')).toBe(true);
      expect(validate('a-zA_Za-z')).toBe(false);
      expect(validate('a-zA_Z')).toBe(false);
      expect(validate('z-aA-Z')).toBe(false);
      expect(validate('A-Zz-a')).toBe(false);
      expect(validate('')).toBe(false);
    });
  });
});
