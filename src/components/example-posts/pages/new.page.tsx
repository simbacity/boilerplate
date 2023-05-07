import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { handlePromise } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { useZodForm } from "@/hooks/use-zod-form";
import { toast } from "@/components/ui/use-toast";
import { validationSchemaForCreateExamplePost } from "@/server/api/validation-schemas/example-post.schema";
import { useRouter } from "next/router";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { ActionsTopbar } from "@/components/layout/actions-topbar";
import { Layout } from "@/components/layout/layout";

const NewExamplePostForm = () => {
  const router = useRouter();
  const ctx = api.useContext();
  const mutation = api.examplePost.create.useMutation({
    onSuccess: async () => {
      toast({
        description: "Your post has been created.",
      });

      await ctx.examplePost.invalidate();
      await router.push("/example-posts");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast({
          variant: "destructive",
          description: errorMessage[0],
        });
      } else {
        toast({
          variant: "destructive",
          description: "Error! Please try again later.",
        });
      }
    },
  });

  const form = useZodForm({
    schema: validationSchemaForCreateExamplePost,
  });

  return (
    <Layout noPadding fullScreenOnMobile>
      <form
        onSubmit={handlePromise(
          form.handleSubmit((data) => mutation.mutate(data))
        )}
      >
        <ActionsTopbar>
          <Link href="/example-posts">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <Button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save
          </Button>
        </ActionsTopbar>

        <div className="p-3 md:px-8 md:py-6">
          <div className="max-w-2xl space-y-4">
            <div className="space-y-1">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                defaultValue="Your title"
                {...form.register("title")}
              />
              {form.formState.errors.title?.message && (
                <p className="text-red-600">
                  {form.formState.errors.title?.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                defaultValue=""
                {...form.register("content")}
              />
              {form.formState.errors.content?.message && (
                <p className="text-red-600">
                  {form.formState.errors.content?.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export { NewExamplePostForm };
