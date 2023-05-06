import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/lib/api";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/router";

const ActionsDropdown = ({
  children,
  postId,
}: {
  children: React.ReactNode;
  postId: string;
}) => {
  const ctx = api.useContext();
  const router = useRouter();
  const deleteMutation = api.examplePost.delete.useMutation({
    onSuccess: async () => {
      toast({
        description: "Your post has been deleted.",
      });

      await ctx.examplePost.list.invalidate();
      await router.push("/example-posts");
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => void router.push(`/example-posts/${postId}/edit`)}
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-400"
          onClick={() => deleteMutation.mutate(postId)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ActionsDropdown };
