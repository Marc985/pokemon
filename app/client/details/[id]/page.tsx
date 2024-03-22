"use client"
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";


type DetailsData={
img:string    
name:string
lengh:number 
weight:number 
num:number
}

export default function PersoDetails(){
    const [details,setDetails]=useState<DetailsData>()
    const pathname = usePathname();
    const id = pathname ? pathname.split("/").pop() : null;
    const getDetails=async ()=>{
    const res=    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data=await res.json()
        const details:DetailsData={
            img:data.sprites.front_default,
            name:data.name,
            lengh:data.height,
            weight:data.weight,
            num:data.id
        }
        setDetails(details)

    }
     
    useEffect(()=>{
    getDetails()
    },[])
    return(
        <div className="border rounded-sm p-3 w-48 flex flex-col items-center mx-auto mt-11">
            <img src={details?.img} alt={details?.name}/>
            <h1>name:{details?.name}</h1>
            <p>Weight:{details?.weight}</p>
            <p>Height:{details?.lengh}</p>
            <p>Number:{details?.num}</p>
        </div>
    )
 
}
