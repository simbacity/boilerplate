import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { handlePromise } from "@/lib/promise";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { useZodForm } from "@/hooks/use-zod-form";
import { toast } from "@/components/ui/use-toast";
import { validationSchemaForUpdateExamplePost } from "@/validation-schemas/example-post.schema";
import { LoadingPage } from "@/components/ui/loading";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";

const EditExamplePostForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const ctx = api.useContext();
  const query = api.examplePost.show.useQuery(id);
  const post = query.data;
  const mutation = api.examplePost.update.useMutation({
    onSuccess: async () => {
      toast({
        description: "Your post has been updated.",
      });

      await ctx.examplePost.invalidate();
      await router.push("/example-posts");
    },
  });

  const form = useZodForm({
    schema: validationSchemaForUpdateExamplePost,
  });

  if (!post) return <LoadingPage />;

  return (
    <form
      onSubmit={handlePromise(
        form.handleSubmit((data) => mutation.mutate(data))
      )}
      className="max-w-2xl space-y-4"
    >
      <input type="hidden" value={id} {...form.register("id")} />
      <div className="space-y-1">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          defaultValue={post.post.title}
          {...form.register("title")}
        />
        {form.formState.errors.title?.message && (
          <p className="text-red-600">{form.formState.errors.title?.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          defaultValue={post.post.content}
          {...form.register("content")}
        />
        {form.formState.errors.content?.message && (
          <p className="text-red-600">
            {form.formState.errors.content?.message}
          </p>
        )}
      </div>

      <div>
        <Button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Submit
        </Button>
      </div>
    </form>
  );
};

export { EditExamplePostForm };
