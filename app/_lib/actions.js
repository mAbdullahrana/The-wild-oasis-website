"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

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

  if (!guestBookingIDS.includes(bookingId))
    throw new Error("You are not allowed to delete the reservation");

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

export async function updateReservation(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in to update the profile");

  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  const reservationID = formData.get("reservationID");

  const { error } = await supabase
    .from("bookings")
    .update({ numGuests, observations })
    .eq("id", reservationID);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath(`/account/reservations/edit/${reservationID}`);
  redirect("/account/reservations");
}

export async function createReservation(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in to update the profile");

  const reservation = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    cabinPrice: formData.get("cabinPrice"),
    numNights: formData.get("numNights"),
    cabinId: formData.get("cabinId"),
    guestId: Number(session.user.guestId),
    hasBreakfast: false,
    isPaid: false,
    status: "unconfirmed",
    extrasPrice: 0,
    totalPrice: +formData.get("cabinPrice") + 0,
  };

  console.log(reservation);

  const {error} = await supabase.from("bookings").insert([reservation]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${reservation.cabinId}`)

  redirect('/cabins/thankyou')
}
