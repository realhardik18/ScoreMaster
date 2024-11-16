import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Text, Surface, Button, useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

const ScorePage = () => {
  const theme = useTheme();
  const [score, setScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [over, setOver] = useState(0);
  const [balls, setBalls] = useState(0);

  const [batsmen, setBatsmen] = useState([
    { id: 1, name: 'Ansh Raj', runs: 0, balls: 0 },
    { id: 2, name: 'Monish Verma', runs: 0, balls: 0 },
  ]);
  const [currentBatsmanIndex, setCurrentBatsmanIndex] = useState(0);

  const [bowlers, setBowlers] = useState([
    { id: 1, name: 'Jaspreet Singh', overs: 0, wickets: 0, runs: 0 },
    { id: 2, name: 'Mohit Sharma', overs: 0, wickets: 0, runs: 0 },
    { id: 3, name: 'Rohit Choudhary', overs: 0, wickets: 0, runs: 0 },
    { id: 4, name: 'Kunal Yadav', overs: 0, wickets: 0, runs: 0 },
  ]);
  const [currentBowlerIndex, setCurrentBowlerIndex] = useState(0);

  const selectNewBowler = () => {
    Alert.alert(
      'Select New Bowler',
      'Choose the bowler for the next over',
      bowlers.map((bowler, index) => ({
        text: bowler.name,
        onPress: () => setCurrentBowlerIndex(index),
      }))
    );
  };

  const addRuns = (runs) => {
    setScore((prev) => prev + runs);

    setBalls((prev) => {
      const newBalls = prev + 1;

      // Update bowler stats
      setBowlers((prev) =>
        prev.map((bowler, index) =>
          index === currentBowlerIndex
            ? { ...bowler, runs: bowler.runs + runs }
            : bowler
        )
      );

      // End of over logic
      if (newBalls === 6) {
        setOver((prev) => prev + 1);
        setBowlers((prev) =>
          prev.map((bowler, index) =>
            index === currentBowlerIndex
              ? { ...bowler, overs: bowler.overs + 1 }
              : bowler
          )
        );
        setBalls(0);
        setCurrentBatsmanIndex(1 - currentBatsmanIndex); // Change strike after over
        selectNewBowler();
        return 0;
      }

      return newBalls;
    });

    // Update current batsman's score
    setBatsmen((prev) =>
      prev.map((batsman, index) =>
        index === currentBatsmanIndex
          ? { ...batsman, runs: batsman.runs + runs, balls: batsman.balls + 1 }
          : batsman
      )
    );

    // Change strike if the runs are odd
    if (runs % 2 !== 0) {
      setCurrentBatsmanIndex(1 - currentBatsmanIndex);
    }
  };

  const addWicket = () => {
    if (wickets < 10) {
      setWickets((prev) => prev + 1);

      setBalls((prev) => {
        const newBalls = prev + 1;

        // Update bowler stats
        setBowlers((prev) =>
          prev.map((bowler, index) =>
            index === currentBowlerIndex
              ? { ...bowler, wickets: bowler.wickets + 1 }
              : bowler
          )
        );

        // End of over logic
        if (newBalls === 6) {
          setOver((prev) => prev + 1);
          setBowlers((prev) =>
            prev.map((bowler, index) =>
              index === currentBowlerIndex
                ? { ...bowler, overs: bowler.overs + 1 }
                : bowler
            )
          );
          setBalls(0);
          setCurrentBatsmanIndex(1 - currentBatsmanIndex); // Change strike after over
          selectNewBowler();
          return 0;
        }

        return newBalls;
      });

      // Rotate strike to the next batsman
      setCurrentBatsmanIndex(1 - currentBatsmanIndex);
    }
  };

  const ScoreButton = ({ value, onPress, color }) => (
    <Surface style={[styles.scoreButton, { backgroundColor: color || theme.colors.primary }]}>
      <Button
        mode="contained"
        onPress={onPress}
        labelStyle={styles.buttonLabel}
        style={styles.buttonContent}
      >
        {value}
      </Button>
    </Surface>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {/* Match Header */}
      <Text style={styles.headerText}>West Delhi XI vs East Delhi XI</Text>

      {/* Score Display */}
      <Surface style={styles.scoreDisplay}>
        <Text style={styles.scoreText}>
          {score}/{wickets}
        </Text>
        <Text style={styles.overText}>
          {over}.{balls} overs
        </Text>
      </Surface>

      {/* Batsmen Info Table */}
      <View style={styles.batsmenTable}>
        {batsmen.map((batsman, index) => (
          <View key={batsman.id} style={styles.batsmanRow}>
            <Text
              style={[
                styles.batsmanName,
                index === currentBatsmanIndex ? styles.currentBatsman : null,
              ]}
            >
              {batsman.name}
            </Text>
            <Text style={styles.batsmanScore}>
              {batsman.runs} ({batsman.balls})
            </Text>
          </View>
        ))}
      </View>

      {/* Bowler Info Table */}
      <View style={styles.bowlersTable}>
        <Text style={styles.tableHeader}>Bowler Name</Text>
        {bowlers.map((bowler) => (
          <View key={bowler.id} style={styles.bowlerRow}>
            <Text style={styles.bowlerName}>{bowler.name}</Text>
            <Text style={styles.bowlerStats}>
              {bowler.overs}   {bowler.wickets}   {bowler.runs}
            </Text>
          </View>
        ))}
      </View>

      {/* Buttons Grid */}
      <View style={styles.buttonGrid}>
        {[0, 1, 2, 3, 4, 6].map((runs) => (
          <ScoreButton key={runs} value={runs.toString()} onPress={() => addRuns(runs)} />
        ))}
        <ScoreButton value="OUT" onPress={addWicket} color="#D32F2F" />
        <ScoreButton value="WD" onPress={() => addRuns(1)} color="#FFC107" />
        <ScoreButton value="NB" onPress={() => addRuns(1)} color="#FFC107" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scoreDisplay: {
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000000',
  },
  overText: {
    fontSize: 18,
    color: '#666666',
  },
  batsmenTable: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  batsmanRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  batsmanName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333333',
  },
  currentBatsman: {
    fontWeight: 'bold',
    color: '#FF5722',
  },
  batsmanScore: {
    fontSize: 18,
    fontWeight: '600',
  },
  bowlersTable: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  tableHeader: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bowlerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  bowlerName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333333',
  },
  bowlerStats: {
    fontSize: 16,
    color: '#666666',
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  scoreButton: {
    margin: 8,
    width: 80,
    height: 80,
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
  },
  buttonContent: {
    height: '100%',
    justifyContent: 'center',
  },
  buttonLabel: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});

export default ScorePage;
