import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  userId: z
    .string()
    .min(8, { message: "User ID must be at least 8 characters long." })
    .max(20, { message: "User ID must be at most 32 characters long." }),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." })
    .max(32, { message: "Name must be at most 32 characters long." }),
  askingPrice: z.coerce
    .number({
      message: "Asking price must be a number (without currency prefixes).",
    })
    .nonnegative({ message: "Asking price must be a non-negative number." }),
});
export default function CreateListing() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      name: "",
      askingPrice: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    axios
      .post(`${import.meta.env.VITE_BACKEND}/api/listings`, values)
      .then((resp) => resp.status)
      .then((status) =>
        Math.floor(status / 100) == 2
          ? navigate("/listings")
          : console.log(status),
      );
  }
  return (
    <main className="w-full p-8 flex flex-col items-center">
      <h1 className="text-xl">Create Listing</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="min-w-96 space-y-6"
        >
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormLabel> User ID </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Name </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="askingPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Price </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create</Button>
        </form>
      </Form>
    </main>
  );
}
