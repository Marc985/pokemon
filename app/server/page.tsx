"use server"
import type { InferGetServerSidePropsType,GetStaticProps } from "next"
 const  getData= async (pageNumber:number)=>{

   const res=await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${(pageNumber-1)*50}`)
    const data=await res.json()
    return data
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
                <button onClick={incriment}>previous</button>
                <button onClick={decrement}>next</button>
            </div>
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