"use server"
import type { InferGetServerSidePropsType,GetStaticProps } from "next"
 const  getData= async (pageNumber:number)=>{

   const res=await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${(pageNumber-1)*50}`)
    const data=await res.json()
    return data
}
export default async function Page() {
    const data=await getData(1)
    return(
        <main>
            <div>
                {
                    data.results.map((item:any)=>{
                        return(
                            <div key={item.name}>
                                <h1>{item.name}</h1>
                            </div>
                        )
                    })
                }
            </div>
        </main>
    )
}