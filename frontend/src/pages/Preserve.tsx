import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { api } from "@/api/api";
import { auth } from "@/firebase";
import type { SubmitHandler } from "react-hook-form";
interface PreserveFormData {
  title: string;
  language: string;
  category: string;
  timePeriod: string;
  description: string;
  tags: string[];
  user_id: string;
  user_name: string;
}

export default function Preserve() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PreserveFormData>({
    defaultValues: {
      title: "",
      language: "sinhala",
      category: "",
      timePeriod: "",
      description: "",
      tags: ["History", "SriLanka", "Rawana"],
      user_id: "",
      user_name: "",
    },
  });

  const tags = watch("tags");

  const [tagInput, setTagInput] = useState("");

  /* -------------------- TAGS -------------------- */
  const addTag = (tag: string) => {
    const cleanTag = tag.trim();
    if (!cleanTag || tags.includes(cleanTag) || tags.length >= 8) return;
    setValue("tags", [...tags, cleanTag]);
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(tagInput);
      setTagInput("");
    }

    if (e.key === "Backspace" && !tagInput && tags.length > 0) {
      const lastTag = tags[tags.length - 1];
      if (lastTag) removeTag(lastTag);
    }
  };

  const handleClear = () => {
    setValue("title", "");
    setValue("language", "sinhala");
    setValue("category", "");
    setValue("timePeriod", "");
    setValue("description", "");
    setValue("tags", []);
    setTagInput("");
  };

  const onSubmit: SubmitHandler<PreserveFormData> = async (data) => {
    try {
      const user = await auth.currentUser;

      const token = await user?.getIdToken();

      if (!user || !token) {
        console.error("No user logged in");
        return;
      }

      setValue("user_id", user.uid);
      setValue("user_name", user.displayName ?? user.email ?? "");

      const payload = {
        ...data,
        user_id: user.uid,
        user_name: user.displayName ?? user.email,
      };

      await api.post('stories', {
        json: payload,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Story submitted successfully!");
      handleClear();
      // Optionally show success message or redirect
    } catch (error) {
      console.error("Error submitting story:", error);
      // Handle error (show toast, etc.)
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 sm:p-10
      bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
      from-[#f8f5f1] via-[#efe8df] to-[#e7ded3]"
    >
      <div
        className="
          w-full max-w-3xl rounded-3xl
          bg-white/80 backdrop-blur-md
          shadow-[0_20px_50px_rgba(90,60,30,0.15)]
          border border-[#e6dccf]
          p-8 sm:p-12
        "
      >
        {/* HEADER */}
        <div className="mb-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#3e2723] leading-tight">
            Every story matters.
            <span className="block text-[#8b4513]">Preserve it.</span>
          </h2>
          <p className="mt-3 text-sm text-[#6d5c4a] max-w-xl">
            Help protect fading traditions, memories, and voices for future
            generations.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* TITLE & LANGUAGE */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-semibold text-[#5d4e37]">
                Title
              </Label>
              <Input
                {...register("title", { required: true })}
                className="h-11 rounded-xl bg-[#faf8f5]"
                placeholder="Title"
              />
              {errors.title && (
                <span className="text-red-500 text-xs">Title is required</span>
              )}
            </div>
            <div>
              <Label className="text-sm font-semibold text-[#5d4e37]">
                Language
              </Label>
              <Controller
                name="language"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || "sinhala"}
                  >
                    <SelectTrigger className="h-11 rounded-xl bg-[#faf8f5]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-[#e6dccf] shadow-xl rounded-xl">
                      <SelectItem value="sinhala">Sinhala</SelectItem>
                      <SelectItem value="tamil">Tamil</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.language && (
                <span className="text-red-500 text-xs">
                  Language is required
                </span>
              )}
            </div>
          </div>

          {/* CATEGORY & TIME */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-semibold text-[#5d4e37]">
                Category
              </Label>
              <Controller
                name="category"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-11 rounded-xl bg-[#faf8f5]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-[#e6dccf] shadow-xl rounded-xl">
                      <SelectItem value="Tradition & Rituals">
                        Tradition & Rituals
                      </SelectItem>
                      <SelectItem value="Arts & Performance">
                        Arts & Performance
                      </SelectItem>
                      <SelectItem value="Knowledge & Practices">
                        Knowledge & Practices
                      </SelectItem>
                      <SelectItem value="Crafts & Industries">
                        Crafts & Industries
                      </SelectItem>
                      <SelectItem value="Festivals & Social Events">
                        Festivals & Social Events
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <span className="text-red-500 text-xs">
                  Category is required
                </span>
              )}
            </div>

            <div>
              <Label className="text-sm font-semibold text-[#5d4e37]">
                Time Period
              </Label>
              <Controller
                name="timePeriod"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-11 rounded-xl bg-[#faf8f5]">
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-[#e6dccf] shadow-xl rounded-xl">
                      <SelectItem value="ancient">Ancient</SelectItem>
                      <SelectItem value="medieval">Medieval</SelectItem>
                      <SelectItem value="colonial">Colonial</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="contemporary">Contemporary</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.timePeriod && (
                <span className="text-red-500 text-xs">
                  Time Period is required
                </span>
              )}
            </div>
          </div>

          {/* TAGS */}
          <div>
            <Label className="text-sm font-semibold text-[#5d4e37]">Tags</Label>
            <Input
              placeholder="Type a tag and press Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="h-11 rounded-xl bg-[#faf8f5] mt-2"
            />

            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="
                    flex items-center gap-2
                    px-4 py-1 rounded-full
                    bg-[#f4ede4]
                    text-[#5c3a21]
                    text-xs font-medium
                  "
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-[#3e2723]"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <Label className="text-sm font-semibold text-[#5d4e37]">
              Description
            </Label>
            <Textarea
              {...register("description", { required: true })}
              className="min-h-[180px] rounded-xl bg-[#faf8f5]"
              placeholder="Tell the story..."
            />
            {errors.description && (
              <span className="text-red-500 text-xs">
                Description is required
              </span>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="bg-[#8b4513] hover:bg-[#6f3510] text-white rounded-xl px-8 h-11"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
              className="border-[#cbb59a] text-[#6d4c32] rounded-xl px-8 h-11"
            >
              Clear
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
