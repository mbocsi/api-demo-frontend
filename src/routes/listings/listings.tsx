import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type Listing = {
  id: number;
  userId: string;
  name: string;
  askingPrice: number;
};

type ListingsResponse = {
  success: boolean;
  listings: Listing[];
};

const getListings = async (): Promise<ListingsResponse> =>
  axios
    .get(`${import.meta.env.VITE_BACKEND}/api/listings`)
    .then((response) => response.data);

export default function Listings() {
  console.log(`${import.meta.env.VITE_BACKEND}/api/listings`);
  const { data, isError } = useQuery({
    queryKey: ["key"],
    queryFn: getListings,
  });

  if (isError) {
    return (
      <main className="w-full p-8 text-center">
        <h1 className="text-3xl text-red-700">Listings not found</h1>
      </main>
    );
  }
  return (
    <main className="w-full p-8">
      <h1 className="text-xl mb-8">Listings</h1>
      <section className="flex flex-row flex-wrap gap-4">
        {data?.listings.map((listing: Listing, idx: number) => (
          <a key={idx} href={`/listings/${listing.id}`} className="basis-72">
            <ul className="bg-secondary text-secondary-foreground p-4 rounded-lg">
              <li className="flex flex-row justify-between">
                <p>Name</p>
                <p>{listing.name}</p>
              </li>
              <li className="flex flex-row justify-between">
                <p>Price</p>
                <p>${listing.askingPrice}</p>
              </li>
              <li className="flex flex-row justify-between">
                <p>Listing ID</p>
                <p>{listing.id}</p>
              </li>
              <li className="flex flex-row justify-between">
                <p>User ID</p>
                <p>{listing.userId}</p>
              </li>
            </ul>
          </a>
        ))}
      </section>
    </main>
  );
}
