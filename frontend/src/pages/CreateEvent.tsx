import CreateEventEditor from "@/components/CreateEventEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const CreateEvent = () => {
  const formSchema = z.object({
    title: z.string().nonempty({ message: "Title is required" }),

    content: z.string().nonempty({ message: "Content cannot be empty" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl className="h-[60px]">
                <Input
                  {...field}
                  autoComplete="current-title"
                  className="h-full border-none focus-visible:ring-0"
                  placeholder="Title"
                  style={{ fontSize: "24px" }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormControl>
                <CreateEventEditor
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-2">
          <Button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          >
            Create event
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateEvent;
