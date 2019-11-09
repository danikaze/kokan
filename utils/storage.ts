import { openDB, IDBPDatabase } from 'idb';
import { Trip, UserSettings, State } from '../store/model';

const dbVersion = 1;
const dbName = 'kokan';
let db: IDBPDatabase;
const upgrades = {
  1: (db: IDBPDatabase) => {
    db.createObjectStore(userSettingsStoreName);
    db.createObjectStore(tripsStoreName);
  },
};

const userSettingsStoreName = 'userSettings';
const tripsStoreName = 'trips';

const defaultSettings: UserSettings = {
  gps: false,
  lang: 'en',
};

async function initStorage(): Promise<void> {
  if (!db) {
    db = await openDB(dbName, dbVersion, { upgrade: upgradeDb });
  }
}

export async function loadStoredData(): Promise<
  Pick<State, 'userSettings' | 'trips'>
> {
  await initStorage();

  const data = await Promise.all([loadSettings(), loadTrips()]).then(
    ([userSettings, trips]) => {
      return {
        userSettings: userSettings || defaultSettings,
        trips: trips || [],
      };
    }
  );

  return data;
}

export async function storeUserSettings(settings: UserSettings): Promise<void> {
  await initStorage();

  const promises = Object.keys(settings).map(key =>
    db.put(userSettingsStoreName, JSON.stringify(settings[key]), key)
  );
  await Promise.all(promises);
}

/**
 * Store one trip, specified by the id
 * All are needed to store the order
 */
export async function storeTrip(id: number, trips: Trip[]): Promise<void> {
  await initStorage();

  let trip: Trip;
  const order = trips.map(t => {
    if (t.id === id) {
      trip = t;
    }
    return t.id;
  });

  await Promise.all([
    db.put(tripsStoreName, JSON.stringify(order), 'order'),
    db.put(tripsStoreName, JSON.stringify(trip), id),
  ]);
}

async function loadSettings(): Promise<UserSettings> {
  const settings = {};

  await iterate(userSettingsStoreName, (key, value) => {
    settings[key] = JSON.parse(value as string);
  });

  return Object.keys(settings).length > 0
    ? (settings as UserSettings)
    : undefined;
}

/**
 * Load all the trips from the database
 */
async function loadTrips(): Promise<Trip[]> {
  let order = await db.get(tripsStoreName, 'order');
  if (!order) {
    return;
  }

  order = JSON.parse(order);
  const promises = order.map(id => db.get(tripsStoreName, id));
  const storedTrips: string[] = await Promise.all(promises);
  const trips = storedTrips
    .map(trip => JSON.parse(trip) as Trip)
    .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

  return trips;
}

/**
 *
 */
function upgradeDb(db, oldVersion, newVersion) {
  for (let version = oldVersion + 1; version <= newVersion; version++) {
    const fn = upgrades[version];
    if (fn) {
      fn(db);
    }
  }
}

/**
 * Iterate across all the key, value pairs
 * For each match, the callback `cb` will be called
 */
async function iterate(
  namespace: string,
  cb: (key: string, value: unknown) => void
): Promise<void> {
  const tx = db.transaction(namespace);
  let cursor = await tx.objectStore(namespace).openCursor();

  while (cursor) {
    cb(cursor.key as string, cursor.value);
    cursor = await cursor.continue();
  }
}
