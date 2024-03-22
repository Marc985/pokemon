import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

type DetailsData = {
 img: string;
 name: string;
 length: number;
 weight: number;
 num: number;
};

export const test: GetServerSideProps = async (context) => {
 const { params } = context;
 const id = params?.id;

 const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
 const data = await res.json();
 const details: DetailsData = {
    img: data.sprites.front_default,
    name: data.name,
    length: data.height,
    weight: data.weight,
    num: data.id,
 };

 return {
    props: {
      details,
    },
 };
};

const PersoDetails = ({ details }: InferGetServerSidePropsType<typeof test>) => {
 return (
    <div className="border rounded-sm p-3 w-48 flex flex-col items-center mx-auto mt-11">
      <img src={details?.img} alt={details?.name} />
      <h1>Name: {details?.name}</h1>
      <p>Weight: {details?.weight}</p>
      <p>Height: {details?.length}</p>
      <p>Number: {details?.num}</p>
    </div>
 );
};

export default PersoDetails;

