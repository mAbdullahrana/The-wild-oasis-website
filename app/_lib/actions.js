"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";

export async function signInAction(provider) {
  await signIn(provider, { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in to update the profile");

  const {
    user: { guestId },
  } = session;

  const nationalID = formData.get("nationalID");

  // Add regex validation for nationalID
  const nationalIDRegex = /^.{6,12}$/;
  if (!nationalIDRegex.test(nationalID)) {
    throw new Error("National ID must be between 6 and 12 characters");
  }

  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const { data, error } = await supabase
    .from("guests")
    .update({ nationalID, nationality, countryFlag })
    .eq("id", guestId);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in to update the profile");

  const guestBookings = await getBookings(session.user.guestId);

  const guestBookingIDS = guestBookings.map((booking) => booking.id);

  if (!guestBookingIDS.includes(bookingId)) throw new Error("You are not allowed to delete the reservation");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}
