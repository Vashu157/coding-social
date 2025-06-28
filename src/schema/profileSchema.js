import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../lib/Supabase.js";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  github_username: z.string().optional(),
  leetcode_username: z.string().optional(),
  codeforces_username: z.string().optional(),
});
