import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetCategory = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["category", { id }],
    queryFn: async () => {
      const response = await client.api.categories[":id"].$get({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Could Not Fetch Category");
      }
      const result = await response.json();
      if ("data" in result) {
        return result.data;
      } else {
        throw new Error("Could Not Fetch Category");
      }
    },
  });
  return query;
};
