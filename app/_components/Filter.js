"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation"

function Filter() {
  const searchParams = useSearchParams()
  const path = usePathname()
  const router = useRouter()
  function handleFilter(activeFilter){
    const params = new URLSearchParams(searchParams);
    params.set('capacity', activeFilter)
    router.replace(`${path}?${params.toString()}` , {scroll : false} )

  }
  return (
    <div className = "border-primary-800 border flex ">
    <Button handleFilter = {handleFilter}  filter = 'all'>
      All cabins
    </Button>
    <Button handleFilter = {handleFilter}  filter = 'small'>
      1&mdash;3 guests
    </Button>
    <Button handleFilter = {handleFilter}  filter = 'medium'>
      4&mdash;7 guests
    </Button>
    <Button handleFilter = {handleFilter}  filter = 'large'>
      8&mdash;12 guests
    </Button>
      
    </div>
  )
}

function Button({children , handleFilter , filter}){
  return (
    <button className="px-5 py-2 hover:bg-primary-700" onClick = {() => handleFilter(filter)}>
   {children}
    </button>
  )
}

export default Filter
