import { useParams } from "react-router-dom";

export default function Listing() {
  const { id } = useParams();
  return (
    <main className="w-full p-8">
      <h1 className="text-xl">Listing number: {id}</h1>
    </main>
  );
}
