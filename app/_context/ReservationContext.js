"use client";

import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

const initialState = { from: undefined, to: undefined };

function ReservationContextProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange , resetRange}}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservationContext() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error(
      "Used ReservationContext outside of Provider. The context can only be used in children of the Provider"
    );

  return context;
}

export { useReservationContext, ReservationContextProvider };
