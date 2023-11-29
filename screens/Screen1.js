import React, { useState } from 'react';
import {
  TextInput,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';

export default function Screen1() {
  const words = ['software', 'developer', 'system', 'app', 'framework'];
  const initialDefinitions = ['', '', '', '', ''];

  const rows = 8;
  const columns = 10;
  const initialGrid = Array.from({ length: rows }, () =>
    Array(columns).fill('')
  );

  const [definitions, setDefinitions] = useState(initialDefinitions);
  const [userInputs, setUserInputs] = useState(initialGrid);

  const fetchDefinitions = async () => {
    const newDefinitions = [...definitions];
    try {
      const requests = words.map(async (word, index) => {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        const data = await response.json();
        const definition = data[0].meanings[0].definitions[0].definition;
        newDefinitions[index] = definition;
      });
      await Promise.all(requests);
      setDefinitions(newDefinitions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const setLetter = (input, row, column) => {
    const letter = input.charAt(0).toUpperCase();

    const newUserInputs = [...userInputs];
    newUserInputs[row][column] = letter;
    setUserInputs(newUserInputs);
  };

  const handleCheck = (row, wordIndex, column) => {
    const wordToCompare = words[wordIndex].toUpperCase().split('');
    const userWord = [];

    const paddedWord = Array(10).fill('');

    if (wordIndex === 0) {
      const lettersAtPosition5 = userInputs.map(row => row[5]);

      userWord.splice(0, userWord.length, ...lettersAtPosition5);

      const resultArray = userWord.map((letter, i) =>
        letter === wordToCompare[i] ? letter : ''
      );

        const updatedUserInputs = userInputs.map((row, i) => {
          const updatedRow = [...row];
          updatedRow[column] = resultArray[i];
          return updatedRow;
        });

      setUserInputs(updatedUserInputs);

      console.log(userInputs);
    } else {
      wordToCompare.forEach((letter, i) => {
        paddedWord[column + i] = letter;
      });

      userWord.splice(0, userInputs.length, ...userInputs[row]);

      const isCorrect = userWord.every((letter, i) => letter === paddedWord[i]);

      if (!isCorrect) {
        const updatedUserInputs = userInputs[row].map((letter, i) => {
          if (letter !== paddedWord[i]) {
            clearCell(row, i);
            return '';
          }
          return letter;
        });

        setUserInputs((prevInputs) => {
          const newUserInputs = [...prevInputs];
          newUserInputs[row] = updatedUserInputs;
          return newUserInputs;
        });
      }
    }
  };

  const clearCell = (row, column) => {
    const newUserInputs = [...userInputs];
    newUserInputs[row][column] = '';
    setUserInputs(newUserInputs);
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 80,
      }}>
      <Text
        style={{ fontSize: 40, marginVertical: 20, fontWeight: 'bold' }}
        onPress={() => fetchDefinitions()}>
        Crossroads
      </Text>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 134 }}></View>
                <TouchableOpacity onPress={() => handleCheck(0, 0, 5)}>
                  <View style={{ width: 16 }}>
                    <Text style={{ fontSize: 20 }}>1</Text>
                  </View>
                </TouchableOpacity>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[0][5]}
                    onChangeText={(text) => setLetter(text, 0, 5)}
                  />
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => handleCheck(1, 1, 0)}>
                  <View style={{ width: 16 }}>
                    <Text style={{ fontSize: 20 }}>2</Text>
                  </View>
                </TouchableOpacity>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[1][0]}
                    onChangeText={(text) => setLetter(text, 1, 0)}
                  />
                </View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[1][1]}
                    onChangeText={(text) => setLetter(text, 1, 1)}
                  />
                </View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[1][2]}
                    onChangeText={(text) => setLetter(text, 1, 2)}
                  />
                </View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[1][3]}
                    onChangeText={(text) => setLetter(text, 1, 3)}
                  />
                </View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[1][4]}
                    onChangeText={(text) => setLetter(text, 1, 4)}
                  />
                </View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[1][5]}
                    onChangeText={(text) => setLetter(text, 1, 5)}
                  />
                </View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[1][6]}
                    onChangeText={(text) => setLetter(text, 1, 6)}
                  />
                </View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[1][7]}
                    onChangeText={(text) => setLetter(text, 1, 7)}
                  />
                </View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[1][8]}
                    onChangeText={(text) => setLetter(text, 1, 8)}
                  />
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 150 }}></View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[2][5]}
                    onChangeText={(text) => setLetter(text, 2, 5)}
                  />
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 54 }}></View>
                <TouchableOpacity onPress={() => handleCheck(3, 2, 2)}>
                  <View style={{ width: 16 }}>
                    <Text style={{ fontSize: 20 }}>3</Text>
                  </View>
                </TouchableOpacity>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[3][2]}
                    onChangeText={(text) => setLetter(text, 3, 2)}
                  />
                </View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[3][3]}
                    onChangeText={(text) => setLetter(text, 3, 3)}
                  />
                </View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[3][4]}
                    onChangeText={(text) => setLetter(text, 3, 4)}
                  />
                </View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[3][5]}
                    onChangeText={(text) => setLetter(text, 3, 5)}
                  />
                </View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[3][6]}
                    onChangeText={(text) => setLetter(text, 3, 6)}
                  />
                </View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[3][7]}
                    onChangeText={(text) => setLetter(text, 3, 7)}
                  />
                </View>
                <View style={{ width: 64 }}></View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 150 }}></View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[4][5]}
                    onChangeText={(text) => setLetter(text, 4, 5)}
                  />
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 134 }}></View>
                <TouchableOpacity onPress={() => handleCheck(5, 3, 5)}>
                  <View style={{ width: 16 }}>
                    <Text style={{ fontSize: 20 }}>4</Text>
                  </View>
                </TouchableOpacity>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[5][5]}
                    onChangeText={(text) => setLetter(text, 5, 5)}
                  />
                </View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[5][6]}
                    onChangeText={(text) => setLetter(text, 5, 6)}
                  />
                </View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[5][7]}
                    onChangeText={(text) => setLetter(text, 5, 7)}
                  />
                </View>
                <View style={{ width: 64 }}></View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 150 }}></View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[6][5]}
                    onChangeText={(text) => setLetter(text, 6, 5)}
                  />
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 27 }}></View>
                <TouchableOpacity onPress={() => handleCheck(7, 4, 1)}>
                  <View style={{ width: 16 }}>
                    <Text style={{ fontSize: 20 }}>5</Text>
                  </View>
                </TouchableOpacity>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[7][1]}
                    onChangeText={(text) => setLetter(text, 7, 1)}
                  />
                </View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[7][2]}
                    onChangeText={(text) => setLetter(text, 7, 2)}
                  />
                </View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[7][3]}
                    onChangeText={(text) => setLetter(text, 7, 3)}
                  />
                </View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[7][4]}
                    onChangeText={(text) => setLetter(text, 7, 4)}
                  />
                </View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[7][5]}
                    onChangeText={(text) => setLetter(text, 7, 5)}
                  />
                </View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[7][6]}
                    onChangeText={(text) => setLetter(text, 7, 6)}
                  />
                </View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[7][7]}
                    onChangeText={(text) => setLetter(text, 7, 7)}
                  />
                </View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[7][8]}
                    onChangeText={(text) => setLetter(text, 7, 8)}
                  />
                </View>
                <View style={{ padding: 2, borderWidth: 1 }}>
                  <TextInput
                    placeholder={''}
                    size="20"
                    maxLength={1}
                    defaultValue={userInputs[7][9]}
                    onChangeText={(text) => setLetter(text, 7, 9)}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        <ScrollView>
          <View style={{ height: 27 }}></View>
          <Text
            style={{ fontSize: 20, marginVertical: 20, fontWeight: 'bold' }}>
            Definitions
          </Text>
          <Text>1. {definitions[0]}</Text>
          <Text>2. {definitions[1]}</Text>
          <Text>3. {definitions[2]}</Text>
          <Text>4. {definitions[3]}</Text>
          <Text>5. {definitions[4]}</Text>
        </ScrollView>
      </View>
    </View>
  );
}
