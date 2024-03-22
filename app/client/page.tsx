"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { it } from 'node:test';

type Pokemon={
    id:number
    name:string
    url:string
    img:string
}
type Detail={
    image:string
    name:string
    weight:number
    height:number 
    num:number
}
export default function Pokemon() {
    const [data, setData] = useState<Pokemon[]>();
    const [currentPage, setCurrentPage] = useState(1);

    const [details,setDetails]=useState<Detail>()
    const itemsPerPage = 50;

    const getDetails=async(url:string)=>{
        const res=await fetch(url)
        
        const details=await res.json()
        return details
    
    }
    const getData = async () => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${(currentPage - 1) * itemsPerPage}`);
        const data = await res.json();
    const detailedData: Pokemon[] = await Promise.all(
        data.results.map(async(item:Pokemon)=>{
            const details=await getDetails(item.url)
            const id=details.id
            return {id:id,name:item.name,url:item.url,img:details.sprites.front_default}
        })
      )
        console.log(detailedData);
        
        setData(detailedData);
    };
    

    useEffect(() => {
        getData();
    }, [currentPage]);

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <div>
            
            <h1 className='text-2xl text-center'>Welcome to Pokemon!</h1>
            <div className='flex justify-center mt-5 gap-56'>
                <button onClick={handlePrev} disabled={currentPage === 1}>Précédent</button>
                <button onClick={handleNext}>Suivant</button>
            </div>
            <ul className='grid grid-cols-5 gap-3 mx-auto mt-20'>
                {Array.isArray(data) && data.map((item: Pokemon) => (
                    <div className='flex flex-col items-center gap-5 border rounded-md p-3 hover:bg-slate-200' key={item.id}>
                        <img src={item.img} alt="" />
                        <li>{item.name}</li>

                        <Link href={`/client/details/${item.id}`}><button className='bg-black rounded-lg p-4 text-white'>See details</button></Link>
                    </div>
                ))}
            </ul>
           
        </div>
    );
}
