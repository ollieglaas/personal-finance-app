"use client";

import { useEffect, useState } from "react";
import useBalanceStore from "@/hooks/useBalanceStore";
import useBillsStore from "@/hooks/useBillsStore";
import useTransactionsStore from "@/hooks/useTransactionsStore";
import useBudgetsStore from "@/hooks/useBudgetsStore";
import usePotsStore from "@/hooks/usePotsStore";

const DataFetcher = () => {
  const { setBalance } = useBalanceStore();
  const { setBills } = useBillsStore();
  const { setTransactions } = useTransactionsStore();
  const { setBudgets } = useBudgetsStore();
  const { setPots } = usePotsStore();

  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Fetching data from a static JSON file
    const fetchData = async () => {
      const storedData = localStorage.getItem("balance-storage");

      if (!storedData) {
        const response = await fetch("/data.json");
        const data = await response.json();

        setBalance(data.balance);
        setBills(data.bills);
        setTransactions(data.transactions);
        setBudgets(data.budgets);
        setPots(data.pots);
      }

      setHasLoaded(true);
    };

    try {
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [setBalance, setBills, setTransactions, setBudgets, setPots]);

  if (!hasLoaded) return <p>Hi</p>;

  return null;
};

export default DataFetcher;
