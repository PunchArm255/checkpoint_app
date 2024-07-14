import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser, createHabit, updateHabit, deleteHabit, fetchHabits, createAddiction, updateAddiction, deleteAddiction, fetchAddictions } from "../lib/appwrite";
import moment from 'moment';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState([]);
  const [habitStreak, setHabitStreak] = useState(0);
  const [addictions, setAddictions] = useState([]);
  const [addictionStreak, setAddictionStreak] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const darkModePreference = await AsyncStorage.getItem('darkMode');
        if (darkModePreference !== null) {
          setDarkMode(JSON.parse(darkModePreference));
        }
      } catch (error) {
        console.error('Error loading dark mode preference:', error);
      }
    };

    const fetchUserAndData = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setIsLogged(true);
          setUser(currentUser);
          const userHabits = await fetchHabits(currentUser.$id);
          const userAddictions = await fetchAddictions(currentUser.$id);
          setHabits(userHabits);
          setAddictions(userAddictions);
          let maxHabitStreak = 0;
          let maxAddictionStreak = 0;
          userHabits.forEach(habit => {
            if (habit.streak > maxHabitStreak) {
              maxHabitStreak = habit.streak;
            }
          });
          userAddictions.forEach(addiction => {
            if (addiction.streak > maxAddictionStreak) {
              maxAddictionStreak = addiction.streak;
            }
          });
          setHabitStreak(maxHabitStreak);
          setAddictionStreak(maxAddictionStreak);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user, habits, or addictions:', error);
      } finally {
        setLoading(false); // Set loading to false only after everything is done
      }
    };

    fetchPreferences();
    fetchUserAndData();
  }, []);

  const handleAddHabit = async (habit) => {
    try {
      const currentUser = await getCurrentUser();
      const accountId = currentUser.$id;
      const response = await createHabit({
        ...habit,
        accountId,
        lastLogDate: null,
        streak: 0
      });
      setHabits([...habits, { id: response.$id, ...habit, lastLogDate: null, streak: 0 }]);
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  const handleUpdateHabit = async (id, data) => {
    try {
      await updateHabit(id, data);
      setHabits(habits.map(habit => habit.id === id ? { ...habit, ...data } : habit));
    } catch (error) {
      console.error('Error updating habit:', error);
    }
  };

  const toggleDone = async (id) => {
    try {
      const habit = habits.find(habit => habit.id === id);
      const today = moment().startOf('day');
      const lastLogDate = habit.lastLogDate ? moment(habit.lastLogDate).startOf('day') : null;

      let streak = habit.streak;
      if (lastLogDate && lastLogDate.isBefore(today, 'day')) {
        if (lastLogDate.add(1, 'day').isSame(today, 'day')) {
          streak += 1;
        } else {
          streak = 1;
        }
      } else if (!lastLogDate) {
        streak = 1;
      }

      await handleUpdateHabit(id, { done: !habit.done, lastLogDate: today.toISOString(), streak });
      setHabits(habits.map(h => h.id === id ? { ...h, done: !h.done, lastLogDate: today.toISOString(), streak } : h));
      setHabitStreak(streak);
    } catch (error) {
      console.error('Error toggling done status:', error);
    }
  };

  const handleDeleteHabit = async (id) => {
    try {
      await deleteHabit(id);
      setHabits(habits.filter(habit => habit.id !== id));
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  const handleAddAddiction = async (addiction) => {
    try {
      const currentUser = await getCurrentUser();
      const accountId = currentUser.$id;
      const response = await createAddiction({
        ...addiction,
        accountId,
        lastLogDate: null,
        streak: 0
      });
      setAddictions([...addictions, { id: response.$id, ...addiction, lastLogDate: null, streak: 0 }]);
    } catch (error) {
      console.error('Error adding addiction:', error);
    }
  };

  const handleUpdateAddiction = async (id, data) => {
    try {
      await updateAddiction(id, data);
      setAddictions(addictions.map(addiction => addiction.id === id ? { ...addiction, ...data } : addiction));
    } catch (error) {
      console.error('Error updating addiction:', error);
    }
  };

  const toggleAddictionDone = async (id) => {
    try {
      const addiction = addictions.find(addiction => addiction.id === id);
      const today = moment().startOf('day');
      const lastLogDate = addiction.lastLogDate ? moment(addiction.lastLogDate).startOf('day') : null;

      let streak = addiction.streak;
      if (lastLogDate && lastLogDate.isBefore(today, 'day')) {
        if (lastLogDate.add(1, 'day').isSame(today, 'day')) {
          streak += 1;
        } else {
          streak = 1;
        }
      } else if (!lastLogDate) {
        streak = 1;
      }

      await handleUpdateAddiction(id, { done: !addiction.done, lastLogDate: today.toISOString(), streak });
      setAddictions(addictions.map(a => a.id === id ? { ...a, done: !a.done, lastLogDate: today.toISOString(), streak } : a));
      setAddictionStreak(streak);
    } catch (error) {
      console.error('Error toggling done status:', error);
    }
  };

  const handleDeleteAddiction = async (id) => {
    try {
      await deleteAddiction(id);
      setAddictions(addictions.filter(addiction => addiction.id !== id));
    } catch (error) {
      console.error('Error deleting addiction:', error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        habits,
        setHabits,
        habitStreak,
        setHabitStreak,
        addictions,
        setAddictions,
        addictionStreak,
        setAddictionStreak,
        handleAddHabit,
        handleUpdateHabit,
        handleDeleteHabit,
        handleAddAddiction,
        handleUpdateAddiction,
        handleDeleteAddiction,
        toggleDone,
        toggleAddictionDone,
        darkMode,
        setDarkMode
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
