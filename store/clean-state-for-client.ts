import { State } from './model';

/**
 * Return a copy of the passed state after cleaning it for the client
 * Basically, edits and removes parts that shouldn't be "shown" in the client
 */
export function cleanStateForClient(state: State): State {
  const frontendState = { ...state };
  const log = state.settings.log;

  frontendState.settings.log = {
    level: log.level,
    silent: log.silent,
    console: log.console,
  };

  return frontendState;
}
