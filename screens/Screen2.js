import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function Screen2() {
  const generateRandomLetter = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters.charAt(randomIndex);
  };

  const generateGrid = () => {
    const grid = Array(10)
      .fill(0)
      .map(() => Array(10).fill(''));

    const placements = [
      { word: 'SOFTWARE', direction: 'vertical' },
      { word: 'DEVELOPER', direction: 'vertical-reverse' },
      { word: 'SYSTEM', direction: 'horizontal' },
      { word: 'APP', direction: 'horizontal-reverse' },
      { word: 'MOBILE', direction: 'diagonal-reverse' },
      { word: 'PHONE', direction: 'diagonal' },
    ];

    const placeWord = (word, direction) => {
      let row, col, dr, dc;
      do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
        [dr, dc] = directionMapping[direction];

        if (isWordPlacementValid(word, row, col, dr, dc)) {
          for (let i = 0; i < word.length; i++) {
            grid[row][col] = word[i];
            row += dr;
            col += dc;
          }
          return;
        }
      } while (true);
    };

    const isWordPlacementValid = (word, row, col, dr, dc) => {
      for (let i = 0; i < word.length; i++) {
        if (
          row < 0 ||
          row >= 10 ||
          col < 0 ||
          col >= 10 ||
          (grid[row][col] !== '' && grid[row][col] !== word[i])
        ) {
          return false;
        }
        row += dr;
        col += dc;
      }
      return true;
    };

    const directionMapping = {
      vertical: [1, 0],
      'vertical-reverse': [-1, 0],
      horizontal: [0, 1],
      'horizontal-reverse': [0, -1],
      diagonal: [1, 1],
      'diagonal-reverse': [1, -1],
    };

    placements.forEach(({ word, direction }) => placeWord(word, direction));

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (grid[i][j] === '') {
          grid[i][j] = generateRandomLetter();
        }
      }
    }

    return grid;
  };

  const [randomLettersGrid, setRandomLettersGrid] = useState(Array(10).fill(0).map(() => Array(10).fill('')));
  const [showLetters, setShowLetters] = useState(false);
  const [buttonStates, setButtonStates] = useState(Array(100).fill(false));
  const [showTable, setShowTable] = useState(false);
  const [tableGenerated, setTableGenerated] = useState(false); // Nuevo estado

  const toggleButtonState = index => {
    const newButtonStates = [...buttonStates];
    newButtonStates[index] = !newButtonStates[index];
    setButtonStates(newButtonStates);
  };

  const handleGenerateGrid = () => {
    if (!tableGenerated) { // Verificar si la tabla ya se ha generado
      setButtonStates(Array(100).fill(false));
      setShowLetters(true);
      setRandomLettersGrid(generateGrid());
      setShowTable(true);
      setTableGenerated(true); // Marcar que la tabla se ha generado
    }
  };

  const handleTitleClick = () => {
    setShowTable(!showTable);
    if (!tableGenerated) {
      handleGenerateGrid();
      setTableGenerated(true);
    }
  };

  return (
    <View style={{ justifyContent: 'center', alignSelf: 'center', marginVertical: 80 }}>
      <TouchableOpacity onPress={handleTitleClick}>
        <Text style={{ fontSize: 40, marginVertical: 20, fontWeight: 'bold' }}>Sopa de letras</Text>
      </TouchableOpacity>
      {showTable && ( // Mostrar la tabla solo si showTable es true
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {randomLettersGrid.map((line, lineIndex) => (
            <View key={lineIndex} style={{ flexDirection: 'row' }}>
              {line.map((letter, letterIndex) => (
                <TouchableOpacity
                  key={letterIndex}
                  style={[
                    styles.button,
                    {
                      backgroundColor: buttonStates[lineIndex * 10 + letterIndex] ? 'blue' : 'white',
                    },
                  ]}
                  onPress={() => showLetters && toggleButtonState(lineIndex * 10 + letterIndex)}
                >
                  <Text style={styles.buttonText}>{showLetters ? letter : ''}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 38,
    padding: 14,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 15,
  },
});