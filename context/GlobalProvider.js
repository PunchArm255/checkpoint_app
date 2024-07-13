import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, createHabit, updateHabit, deleteHabit, fetchHabits, createAddiction, updateAddiction, deleteAddiction, fetchAddictions } from "../lib/appwrite";

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

  useEffect(() => {
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
        } else {
          setIsLogged(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user, habits, or addictions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndData();
  }, []);

  const handleAddHabit = async (habit) => {
    try {
      const currentUser = await getCurrentUser();
      const accountId = currentUser.$id; // Use accountId
      const response = await createHabit(habit, accountId);
      setHabits([...habits, { id: response.$id, ...habit }]);
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
      const accountId = currentUser.$id; // Use accountId
      const response = await createAddiction(addiction, accountId);
      setAddictions([...addictions, { id: response.$id, ...addiction }]);
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
