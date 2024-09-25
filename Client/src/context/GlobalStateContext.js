import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { getPremiumPlans, updatePlan } from "../services/api.js";

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [plan, setPlan] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [availablePlans, setAvailablePlans] = useState([]);

  const fetchUserPlans = useCallback(async () => {
    try {
      const { currentPlan, availablePlans } = await getPremiumPlans();
      setCurrentPlan(currentPlan);
      setAvailablePlans(availablePlans);
      setPlan(currentPlan.name);
    } catch (error) {
      console.error("Error fetching user plans:", error);
    }
  }, []);

  useEffect(() => {
    fetchUserPlans();
  }, [fetchUserPlans]);

  const updateGlobalState = useCallback((newPlan) => {
    setPlan(newPlan);
  }, []);

  const updateUserPlan = useCallback(async (planId) => {
    try {
      const result = await updatePlan(planId);
      if (result.success) {
        setCurrentPlan(result.currentPlan);
        setAvailablePlans(result.availablePlans);
        setPlan(result.currentPlan.name);
        return { success: true };
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Error updating user plan:", error);
      return { success: false, error: error.message };
    }
  }, []);

  const value = useMemo(
    () => ({
      plan,
      currentPlan,
      availablePlans,
      updateGlobalState,
      updateUserPlan,
      fetchUserPlans,
    }),
    [
      plan,
      currentPlan,
      availablePlans,
      updateGlobalState,
      updateUserPlan,
      fetchUserPlans,
    ]
  );

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
