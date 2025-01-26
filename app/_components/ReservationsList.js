"use client";

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "../_lib/actions";

function ReservationsList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentOptimistic, bookingId) => {
      return currentOptimistic.filter(
        (currentOptimistic) => currentOptimistic.id !== bookingId
      );
    }
  );

  async function handleDeleteReservation(bookingId) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }
  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard booking={booking} onDelete={handleDeleteReservation} key={booking.id} />
      ))}
    </ul>
  );
}

export default ReservationsList;
