"use server"
import Link from "next/link"
import type { InferGetServerSidePropsType,GetStaticProps } from "next"
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
const getDetails=async(url:string)=>{
    const res=await fetch(url)
        const details=await res.json()
        return details
 }
 const  getData= async (pageNumber:number)=>{

   const res=await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${(pageNumber-1)*50}`)
    const data=await res.json()
   const detailedData=Promise.all(data.results.map(async(item:Pokemon)=>{
       const details=await getDetails(item.url)
        const id=details.id
        return {id:id,name:item.name,url:item.url,img:details.sprites.front_default}
   }))
    return detailedData
}
export default async function Page() {

    const data=await getData(1)
    const pageNumber=1
    const incriment=()=>{
        getData(pageNumber+1)
    }
    const decrement=()=>{
        getData(pageNumber-1)
    }
    return(
        <main>
            <div>
                <button>previous</button>
                <button>next</button>
            </div>
            <div className='grid grid-cols-5 gap-3 mx-auto mt-20'>
                {
                    data.map((item:any)=>{
                        return(
                            <div className='flex flex-col items-center gap-5 border rounded-md p-3 hover:bg-slate-200' key={item.id}>
                            <img src={item.img} alt="" />
                            <div>{item.name}</div>
    
                            <Link href={`/server/details/${item.id}`}><button className='bg-black rounded-lg p-4 text-white'>See details</button></Link>
                        </div>
                     ) })
                }
            </div>
        </main>
    )
}