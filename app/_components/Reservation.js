import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service"
import DateSelector from "./DateSelector"
import ReservationForm from "./ReservationForm"

async function Reservation({cabin}) {
  const [bookedDates , settings] =await Promise.all([
    getBookedDatesByCabinId(cabin.id),
    getSettings()
  ])
  return (
    <div className="grid grid-cols-2 mt-4 min-h-[400px] gap-2 border-primary-900 border-2 p-4 ">
          <DateSelector settings = {settings} bookedDates = {bookedDates} cabin = {cabin} />
          <ReservationForm cabin = {cabin} />
        </div>
  )
}

export default Reservation
