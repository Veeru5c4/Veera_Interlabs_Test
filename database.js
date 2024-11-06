import * as SQLite from 'expo-sqlite';

// Open the database
const db = SQLite.openDatabaseSync('characters.db');

// Create the table if it doesn't exist
export const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS characters (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        gender TEXT, 
        culture TEXT
      );`,
      [],
      () => console.log('Table created or already exists'),
      (txObj, error) => console.log('Error creating table', error)
    );
  });
};

// Insert a new character into the database
export const insertCharacter = (character) => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO characters (name, gender, culture) VALUES (?, ?, ?);`,
      [character.name, character.gender, character.culture],
      () => console.log('Character inserted'),
      (txObj, error) => console.log('Error inserting character', error)
    );
  });
};

// Fetch all characters from the database
export const fetchCharacters = (setCharacters) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM characters;`,
      [],
      (_, { rows: { _array } }) => {
        setCharacters(_array); // Update the state with the fetched characters
        console.log('Characters fetched:', _array);
      },
      (txObj, error) => console.log('Error fetching characters', error)
    );
  });
};
