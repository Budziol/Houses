import z from "zod";

export function mapErrors(error: z.ZodError) {
  const tree = z.treeifyError(error);

  const fieldErrors: Record<string, string[]> = {};

  if ("properties" in tree && tree.properties) {
    const props = tree.properties as Record<string, { errors?: string[] }>;

    for (const key in props) {
      fieldErrors[key] = props[key]?.errors ?? [];
    }
  }

  return fieldErrors;
}
