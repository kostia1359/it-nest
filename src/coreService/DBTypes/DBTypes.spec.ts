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
});
