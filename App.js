import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList, Text } from 'react-native';
import axios from 'axios';
import { createTable, insertCharacter, fetchCharacters } from './database';
import styles from './style'

const CHARACTER_URLS = [
  'https://anapioficeandfire.com/api/characters/300',
  'https://anapioficeandfire.com/api/characters/301',
  'https://anapioficeandfire.com/api/characters/302',
  'https://anapioficeandfire.com/api/characters/303',
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    setLoading(true);
    createTable(); // Initialize the table

    // Fetch data on app launch
    const fetchData = async () => {
      try {
        // Make concurrent requests to the URLs
        const responses = await Promise.all(CHARACTER_URLS.map((url) => axios.get(url)));

        // Hide loading indicator
        setLoading(false);

        // Insert data into the SQLite database
        responses.forEach((response) => {
          insertCharacter(response.data);
        });

        // Fetch and display data from the database
        fetchCharacters(setCharacters);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const renderCharacter = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name || 'No Name'}</Text>
      <Text>Gender: {item.gender}</Text>
      <Text>Culture: {item.culture || 'Unknown'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={characters}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCharacter}
        />
      )}
    </View>
  );
}

