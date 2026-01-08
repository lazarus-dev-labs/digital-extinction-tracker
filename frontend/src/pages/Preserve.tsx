import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Preserve() {
  const [tags, setTags] = useState<string[]>(['History', 'SriLanka', 'Ruwana']);
  const [tagInput, setTagInput] = useState('');
  

  const addTag = (tag: string) => {
    const cleanTag = tag.trim();
    if (!cleanTag || tags.includes(cleanTag) || tags.length >= 8) return;
    setTags([...tags, cleanTag]);
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(tagInput);
      setTagInput('');
    }

    if (e.key === 'Backspace' && !tagInput && tags.length) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const handleClear = () => {
    setTags([]);
    setTagInput('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 sm:p-10
      bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
      from-[#f8f5f1] via-[#efe8df] to-[#e7ded3]">

      <div className="
        w-full max-w-3xl rounded-3xl
        bg-white/80 backdrop-blur-md
        shadow-[0_20px_50px_rgba(90,60,30,0.15)]
        border border-[#e6dccf]
        p-8 sm:p-12
      ">

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#3e2723] leading-tight">
            Every story matters.
            <span className="block text-[#8b4513]">Preserve it.</span>
          </h2>
          <p className="mt-3 text-sm text-[#6d5c4a] max-w-xl">
            Help protect fading traditions, memories, and voices for future generations.
          </p>
        </div>

        <form className="space-y-6">

          {/* Title & Language */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-semibold text-[#5d4e37]">Title</Label>
              <Input className="h-11 rounded-xl bg-[#faf8f5]" placeholder="Title" />
            </div>
            <div>
              <Label className="text-sm font-semibold text-[#5d4e37]">Language</Label>
              <Input className="h-11 rounded-xl bg-[#faf8f5]" placeholder="Language" />
            </div>
          </div>

          {/* Category & Time */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-semibold text-[#5d4e37]">Category</Label>
              <Select>
                <SelectTrigger className="h-11 rounded-xl bg-[#faf8f5]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="folk">Folk Stories</SelectItem>
                  <SelectItem value="historical">Historical Events</SelectItem>
                  <SelectItem value="personal">Personal Narratives</SelectItem>
                  <SelectItem value="cultural">Cultural Practices</SelectItem>
                  <SelectItem value="myths">Myths & Legends</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-semibold text-[#5d4e37]">Time Period</Label>
              <Select>
                <SelectTrigger className="h-11 rounded-xl bg-[#faf8f5]">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ancient">Ancient</SelectItem>
                  <SelectItem value="medieval">Medieval</SelectItem>
                  <SelectItem value="colonial">Colonial</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="contemporary">Contemporary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags */}
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
              {tags.map(tag => (
                <span
                  key={tag}
                  className="flex items-center gap-2 px-4 py-1 rounded-full
                    bg-[#f4ede4] text-[#5c3a21] text-xs font-medium"
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

          {/* Description */}
          <div>
            <Label className="text-sm font-semibold text-[#5d4e37]">Description</Label>
            <Textarea
              className="min-h-[180px] rounded-xl bg-[#faf8f5]"
              placeholder="Tell the story..."
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button className="bg-[#8b4513] hover:bg-[#6f3510] text-white rounded-xl px-8 h-11">
              Submit
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
