// tslint:disable: no-console (settings can't use the logger system)
import { existsSync } from 'fs';
import { join } from 'path';
import { PATH_SETTINGS } from '../../constants/paths';

import { Settings } from './index.d';
import { readJsonSync } from '../read-json-sync';
import { extendObjectsOnly } from '../extend-objects-only';
import { validateSettings } from './validate-settings';

let initted = false;

export const settings = {} as Settings;

/**
 * Extend the current settings with the ones specified in a json file.
 *
 * @param filePath path of the json file with the options
 * @return resolved and set file path
 */
export function init(file?: string): void {
  if (initted) {
    return;
  }
  initted = true;

  // set the default settings first
  let resolved = setFile('data/settings/default.json');
  if (!resolved) {
    console.error(`Can\'t find default settings. Exiting...`);
    process.exit(-1);
  }

  // extend the default settings with the provided one if any
  resolved = setFile(file);
  if (resolved) {
    console.info(`Loaded settings from ${resolved}`);
  }

  // console.debug(`Settings initializated: ${JSON.stringify(settings, null, 2)}`);
}

/**
 * Locate a file, read and set it extending the current settings object
 *
 * @param file path of the json file with the settings
 * @returns resolved path of the `file` or `undefined` if not found
 */
function setFile(file: string): string {
  if (!file) {
    return;
  }

  const resolved = locateSettingsFile(file);
  if (!resolved) {
    return;
  }

  const data = readJsonSync<Settings>(resolved);
  if (!validateSettings(resolved, data)) {
    process.exit(-1);
  }

  extendObjectsOnly(settings, data);

  return resolved;
}

/**
 * Given a file name tries to resolve its path.
 * It will try both as it is, or with `.json` extension (in that order), in the following locations
 * 1. As given
 * 2. As a relative path to `cwd`
 * 3. As a file in the settings folder (provided by the app)
 *
 * @return resolved path or `undefined` if not found
 */
function locateSettingsFile(file: string): string {
  const paths = [file, join(process.cwd(), file), join(PATH_SETTINGS, file)];

  for (const p of paths) {
    const res =
      (existsSync(p) && p) || (existsSync(`${p}.json`) && `${p}.json`);

    if (res) {
      return res;
    }
  }
}
