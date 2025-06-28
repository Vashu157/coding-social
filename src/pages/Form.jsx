import React from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../lib/Supabase.js"; 
import { useState } from "react";

import { formSchema } from "../schema/profileSchema";
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';

export default function SubmitForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const { error } = await supabase.from("profiles").insert([data]);

    if (error) {
      alert("Error submitting: " + error.message);
    } else {
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 3000); // Reset success after 3 sec
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl text-orange-600 font-bold mb-4 text-center">Submit Your Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">Name</label>
          <input
            {...register("name")}
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block">Email</label>
          <input
            {...register("email")}
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block">GitHub Username <GitHubIcon /></label>
          <input {...register("github_username")} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block">LeetCode Username </label>
          <input {...register("leetcode_username")} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block">Codeforces Username <CodeIcon /> </label>
          <input {...register("codeforces_username")} className="w-full p-2 border rounded" />
        </div>

<button
  type="submit"
  disabled={loading}
  className="w-full bg-orange-600 text-black p-2 rounded hover:bg-[orange] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? "Submitting..." : "Submit"}
</button>

        {success && <p className="text-green-600 text-center">Profile submitted successfully!</p>}
      </form>
    </div>
  );
}
