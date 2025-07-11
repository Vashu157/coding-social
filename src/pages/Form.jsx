import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../lib/Supabase.js";
import { useState } from "react";

import { formSchema } from "../schema/profileSchema";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";

export default function SubmitForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    const leet_response = await fetch(
      //====================================================
      `https://coding-social.onrender.com/api/leetcode/${data.leetcode_username}`
    );
    const leetcodeData = await leet_response.json();
    setLeetcodeData(leetcodeData);
    console.log(leetcodeData);
    const { error: leeterror } = await supabase
      .from("leetcode")
      .insert([leetcodeData]);
//=======================================================================================
    const git_response = await fetch(
      `https://coding-social.onrender.com/api/github/${data.github_username}`
    );

    if (!git_response.ok) {
      throw new Error("Failed to fetch GitHub data");
    }

    const githubData = await git_response.json();
    setGithubData(githubData);
    console.log(githubData);

    // Insert into Supabase
    const { error: giterror } = await supabase
      .from("github")
      .insert([githubData]);

    if (giterror) {
      console.error("Supabase insert error:", giterror.message);
    }
//========================================================
    setLoading(true);
    const { error } = await supabase.from("profiles").insert([data]);

    if (error) {
      alert("Error submitting: " + error.message);
    } else {
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 3000); // Reset success after 3 seconds
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl text-orange-600 font-bold mb-4 text-center">
        Submit Your Profile
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-black">Name</label>
          <input
            {...register("name")}
            className="w-full p-2 border border-black rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-black">Email</label>
          <input
            {...register("email")}
            className="w-full p-2 border border-black rounded"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-black">
            GitHub Username <GitHubIcon />
          </label>
          <input
            {...register("github_username")}
            className="w-full p-2 border border-black rounded"
          />
        </div>

        <div>
          <label className="block text-black">LeetCode Username </label>
          <input
            {...register("leetcode_username")}
            className="w-full p-2 border border-black rounded"
          />
        </div>

        <div>
          <label className="block text-black">
            Codeforces Username <CodeIcon />{" "}
          </label>
          <input
            {...register("codeforces_username")}
            className="w-full p-2 border border-black rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 text-black p-2 rounded hover:bg-[orange] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {success && (
          <p className="text-green-600 text-center">
            Profile submitted successfully!
          </p>
        )}
      </form>
    </div>
  );
}
