import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { handlePromise } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { useZodForm } from "@/hooks/use-zod-form";
import { toast } from "@/components/ui/use-toast";
import { validationSchemaForUpdateExamplePost } from "@/server/api/validation-schemas/example-post.schema";
import { LoadingPage } from "@/components/ui/loading";
import { useRouter } from "next/router";
import { ArrowLeft, Loader2, MoreHorizontal } from "lucide-react";
import { ActionsTopbar } from "@/components/layout/actions-topbar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ActionsDropdown } from "@/components/example-posts/components/actions-dropdown";
import { Layout } from "@/components/layout/layout";

const EditExamplePostForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const ctx = api.useContext();
  const query = api.examplePost.show.useQuery(id);
  const post = query.data;
  const updateMutation = api.examplePost.update.useMutation({
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
    <Layout noPadding fullScreenOnMobile>
      <form
        onSubmit={handlePromise(
          form.handleSubmit((data) => updateMutation.mutate(data))
        )}
      >
        <ActionsTopbar>
          <Link href="/example-posts">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div className="flex items-center justify-center gap-2">
            <Button type="submit" disabled={updateMutation.isLoading}>
              {updateMutation.isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save
            </Button>
            <ActionsDropdown postId={id}>
              <div className={cn(buttonVariants({ variant: "ghost" }))}>
                <MoreHorizontal className="h-4 w-4" />
              </div>
            </ActionsDropdown>
          </div>
        </ActionsTopbar>
        <input type="hidden" value={id} {...form.register("id")} />
        <div className="max-w-2xl space-y-4 p-3 md:px-8 md:py-6">
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              defaultValue={post.post.title}
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
              defaultValue={post.post.content}
              {...form.register("content")}
            />
            {form.formState.errors.content?.message && (
              <p className="text-red-600">
                {form.formState.errors.content?.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </Layout>
  );
};

export { EditExamplePostForm };
