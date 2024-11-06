import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('characters.db');

export const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS characters (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, gender TEXT, culture TEXT);`
    );
  });
};

export const insertCharacter = (character) => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO characters (name, gender, culture) VALUES (?, ?, ?);`,
      [character.name, character.gender, character.culture],
      () => console.log('Character inserted'),
      (txObj, error) => console.log('Error', error)
    );
  });
};

export const fetchCharacters = (setCharacters) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM characters;`,
      [],
      (_, { rows: { _array } }) => setCharacters(_array),
      (txObj, error) => console.log('Error', error)
    );
  });
};
