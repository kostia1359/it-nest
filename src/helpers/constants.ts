import exp from 'constants';

export const errorTypes = {
  validationError: 'validationError',
};

export const errorMessages = {
  storageEngine: {
    save: 'Failed to save schema',
    read: 'Failed to read schema',
  },
  dbLevel: {
    alreadyExists: 'Database with same name already exist',
    notFound: 'There is no database with this name',
  },
  tableLevel: {
    alreadyExists: 'Table with same name already exist',
    notFound: 'There is no table with this name',
    typesNotFound: (fieldNames) =>
      `Unable to create ${fieldNames} with unknown type(s)`,
    emptySchema: 'Schema can not be empty',
    notSelected: 'No table is selected',
    schemasNotEqual: 'Unable to merge tables with different schemas',
  },
  rowLevel: {
    notValidAmountOfFields: 'Unable to create row with given amount of fields',
    notFoundFieldInRow: (fieldName) =>
      `Please, add value for field '${fieldName}'`,
    notValidFieldType: (fieldName, fieldType) =>
      `Value for '${fieldName}' is not assignable to ${fieldType}`,
    notFoundFieldInSchema: (fieldName) =>
      `Field '${fieldName}' does not exist in the table schema`,
    notFound: 'Field not found',
  },
  typeLevel: {
    saveError: (value, type) => `Failed to save ${value} for ${type}`,
    validateError: (value, type) => `Failed to validate ${value} for ${type}`,
  },
};

export const SUCCESS_STATUS = {
  status: 'success',
};
