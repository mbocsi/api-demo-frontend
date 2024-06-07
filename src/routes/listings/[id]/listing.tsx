import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Listing } from "../listings";
import axios from "axios";
import { Button } from "@/components/ui/button";

export type ListingResponse = {
  success: boolean;
  listing: Listing;
};

export default function ListingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const getListing = (): Promise<ListingResponse> =>
    axios
      .get(`${import.meta.env.VITE_BACKEND}/api/listings/${id}`)
      .then((response) => response.data);

  const deleteListing = () =>
    axios
      .delete(`${import.meta.env.VITE_BACKEND}/api/listings/${id}`)
      .then((response) => response.status)
      .then((status) =>
        Math.floor(status / 100) == 2 // Check if status is a success code
          ? navigate("/listings")
          : console.log(status),
      );

  const { data, isError } = useQuery({
    queryKey: ["listing"],
    queryFn: getListing,
  });
  if (isError) {
    return (
      <main className="w-full p-8 text-center">
        <h1 className="text-3xl text-red-700">
          Listing with id {id} not found
        </h1>
      </main>
    );
  }
  return (
    <main className="w-full p-8 flex flex-col space-y-8 text-center">
      <h1 className="text-3xl">Listing {id} </h1>
      <ul className="flex flex-col w-full bg-secondary text-secondary-foreground p-4 rounded-md space-y-4">
        <li className="flex flex-row justify-between">
          <h1 className="text-2xl">Listing ID</h1>
          <h1 className="text-2xl">{data?.listing.id}</h1>
        </li>
        <hr className="border-primary" />
        <li className="flex flex-row justify-between">
          <h1 className="text-2xl">Seller ID</h1>
          <h1 className="text-2xl">{data?.listing.userId}</h1>
        </li>
        <hr className="border-primary" />
        <li className="flex flex-row justify-between">
          <h1 className="text-2xl">Name</h1>
          <h1 className="text-2xl">{data?.listing.name}</h1>
        </li>
        <hr className="border-primary" />
        <li className="flex flex-row justify-between">
          <h1 className="text-2xl">Asking Price</h1>
          <h1 className="text-2xl">${data?.listing.askingPrice}</h1>
        </li>
      </ul>
      <Link to={`/edit-listing/${id}`} className="w-full">
        <Button variant="outline" className="w-full">
          Edit
        </Button>
      </Link>
      <Button variant="destructive" onClick={deleteListing}>
        Delete
      </Button>
    </main>
  );
}
