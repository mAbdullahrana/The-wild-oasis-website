"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${path}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="border-primary-800 border flex ">
      <Button
        handleFilter={handleFilter}
        filter="all"
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        handleFilter={handleFilter}
        filter="small"
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        filter="medium"
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        filter="large"
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ children, handleFilter, filter, activeFilter }) {
  return (
    <button
      className={`   ${
        activeFilter === filter ? "bg-primary-700" : ""} px-5 py-2 hover:bg-primary-700`}

      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
