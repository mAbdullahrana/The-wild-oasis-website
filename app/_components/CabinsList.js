import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";
import { unstable_noStore as noStore } from "next/cache";

async function CabinsList({filter}) {
  noStore();
  
  const cabins = await getCabins();


  let displayCabins;

  switch(filter){
    case "all":
      displayCabins = cabins;
      break;
    case "small":
      displayCabins = cabins.filter(cabin => cabin.maxCapacity >=1 && cabin.maxCapacity <= 3 )
      break;
    case "medium":
      displayCabins = cabins.filter(cabin => cabin.maxCapacity >=4 && cabin.maxCapacity <=7)
      break;
    case "large":
      displayCabins = cabins.filter(cabin => cabin.maxCapacity >=8)
      break;
      default:
        displayCabins = cabins
  }

  if (!cabins.length) return null;
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayCabins?.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinsList;
