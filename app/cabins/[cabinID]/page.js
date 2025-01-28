import { getCabin, getCabins } from "@/app/_lib/data-service";

import Reservation from "@/app/_components/Reservation";
import Cabin from "@/app/_components/Cabin";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";

export async function generateMetadata({ params }) {
  const { cabinID } = params;
  const cabin = await getCabin(cabinID);
  const { name } = cabin;
  return {
    title: `Cabin ${name}`,
  };
}

// export async function generateStaticParams() {
//   const cabins = await getCabins();
//   const ids = cabins.map((cabin) => {
//     cabinID: cabin.id;
//   });

//   return ids;
// }

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinID: String(cabin.id) }));
  return ids;
}
export default async function Page({ params }) {
  const { cabinID } = params;

  const cabin = await getCabin(cabinID);

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-4xl font-semibold text-center  text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
