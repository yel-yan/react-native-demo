import Realm from 'realm';

/** *表定义区**/
export const HistoryTableName = 'History';
export const CityTableName = 'City';

const HistorySchema = {
  name: HistoryTableName,
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string'
  }
};

const CitySchema = {
  name: CityTableName,
  primaryKey: 'city_id',
  properties: {
    city_id: 'int',
    city_name: 'string'
  }
};

const instance = new Realm({
  schema: [HistorySchema, CitySchema],
  deleteRealmIfMigrationNeeded: true,
  inMemory: false
});

/** *表使用区**/
export function writeToRealm(obj, tabName) {
  return new Promise((resolve, reject) => {
    instance.write(() => {
      instance.create(tabName, obj, true);
      resolve(true);
    });
  });
}

export function queryAllFromRealm(tabName) {
  return new Promise((resolve, reject) => {
    const obj = instance.objects(tabName);
    const objStr = JSON.stringify(obj);
    resolve(JSON.parse(objStr));
  });
}

export function clearAllFromRealm(tabName) {
  return new Promise((resolve, reject) => {
    instance.write(() => {
      const arrays = instance.objects(tabName);
      instance.delete(arrays);
      resolve(true);
    });
  });
}

export function clearRowFromRealm(id, tabName) {
  return new Promise((resolve, reject) => {
    instance.write(() => {
      const arrays = instance.objects(tabName);
      const row = arrays.filtered('id==' + id);
      instance.delete(row);
      resolve(true);
    });
  });
}
