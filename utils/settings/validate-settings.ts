// tslint:disable:no-console
import Ajv from 'ajv';
import { Settings } from './index.d';

export function validateSettings(file: string, data: Settings): boolean {
  const ajv = new Ajv({ allErrors: true, schemas: [schemas] });

  const isValid = ajv.validate(schemas, data);

  if (!isValid) {
    console.error(`Error while validating settings file ${file}`);
    console.error(
      ajv.errorsText(ajv.errors, { separator: '\n', dataVar: 'settings' })
    );
  }

  return isValid === true;
}

/*
 * Definition of settings.log schema
 */
const logSchema = {
  required: ['level'],
  additionalProperties: false,
  properties: {
    level: {
      type: 'string',
      enum: ['error', 'warn', 'info', 'verbose', 'debug'],
    },
    silent: { type: 'boolean' },
    console: { type: 'boolean' },
    outputFolder: { type: 'string' },
    outputFile: { type: 'string' },
    maxFiles: { type: 'number' },
  },
};

/*
 * Definition of settings schemas
 */
const schemas = {
  $id: 'schemas',
  additionalProperties: false,
  properties: {
    log: { $ref: 'schemas#/definitions/log' },
  },
  definitions: {
    log: logSchema,
  },
};
