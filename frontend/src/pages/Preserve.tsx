import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Preserve() {
  const [tags, setTags] = useState(['History', 'SriLanka', 'Ruwana']);

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleClear = () => {
    setTags(['History', 'SriLanka', 'Ruwana']);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8" 
         style={{ 
           background: 'linear-gradient(135deg, #f5ebe0 0%, #e3d5ca 50%, #d6ccc2 100%)',
         }}>
      <style>{`        
        
        .heading-font {
          font-family: 'Inter', serif;
          font-weight: 700;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .stagger-1 { animation-delay: 0.1s; opacity: 0; animation-fill-mode: forwards; }
        .stagger-2 { animation-delay: 0.2s; opacity: 0; animation-fill-mode: forwards; }
        .stagger-3 { animation-delay: 0.3s; opacity: 0; animation-fill-mode: forwards; }
        
        .paper-texture {
          position: relative;
          background: linear-gradient(to bottom, #fdfcfb 0%, #f8f6f4 100%);
          box-shadow: 
            0 1px 2px rgba(139, 115, 85, 0.06),
            0 4px 8px rgba(139, 115, 85, 0.08),
            0 8px 16px rgba(139, 115, 85, 0.1),
            inset 0 0 0 1px rgba(139, 115, 85, 0.1);
        }
        
        .paper-texture::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(139, 115, 85, 0.02) 2px,
              rgba(139, 115, 85, 0.02) 4px
            );
          pointer-events: none;
          border-radius: inherit;
        }
        
        .heritage-button {
          background: linear-gradient(135deg, #8b4513 0%, #654321 100%);
          color: #fdfcfb;
          font-weight: 600;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          border: none;
          box-shadow: 0 2px 8px rgba(139, 69, 19, 0.3);
        }
        
        .heritage-button:hover {
          background: linear-gradient(135deg, #654321 0%, #4a3219 100%);
          box-shadow: 0 4px 12px rgba(139, 69, 19, 0.4);
          transform: translateY(-1px);
        }
        
        .clear-button {
          background: linear-gradient(135deg, #a0826d 0%, #8b6f5e 100%);
          color: #fdfcfb;
          font-weight: 600;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          border: none;
          box-shadow: 0 2px 8px rgba(160, 130, 109, 0.3);
        }
        
        .clear-button:hover {
          background: linear-gradient(135deg, #8b6f5e 0%, #725b4a 100%);
          box-shadow: 0 4px 12px rgba(160, 130, 109, 0.4);
          transform: translateY(-1px);
        }
        
        .input-field, .textarea-field, .select-trigger {
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(139, 115, 85, 0.2);
          transition: all 0.3s ease;
          font-family: 'Crimson Pro', serif;
          font-size: 15px;
        }
        
        .input-field:focus, .textarea-field:focus, .select-trigger:focus {
          background: rgba(255, 255, 255, 0.9);
          border-color: rgba(139, 69, 19, 0.4);
          box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.1);
          outline: none;
        }
        
        .label-text {
          color: #5d4e37;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.3px;
        }
        
        .tag-badge {
          background: linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(139, 69, 19, 0.15) 100%);
          color: #654321;
          border: 1px solid rgba(139, 69, 19, 0.2);
          font-size: 13px;
          font-weight: 500;
          padding: 4px 12px;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }
        
        .tag-badge:hover {
          background: linear-gradient(135deg, rgba(139, 69, 19, 0.15) 0%, rgba(139, 69, 19, 0.2) 100%);
          border-color: rgba(139, 69, 19, 0.3);
        }
        
        .upload-section {
          background: linear-gradient(135deg, rgba(139, 69, 19, 0.05) 0%, rgba(139, 69, 19, 0.08) 100%);
          border: 2px dashed rgba(139, 69, 19, 0.2);
          border-radius: 8px;
          padding: 16px;
          transition: all 0.3s ease;
        }
        
        .upload-section:hover {
          background: linear-gradient(135deg, rgba(139, 69, 19, 0.08) 0%, rgba(139, 69, 19, 0.12) 100%);
          border-color: rgba(139, 69, 19, 0.3);
        }
        
        .upload-icon {
          color: #8b4513;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        
        .upload-icon:hover {
          color: #654321;
        }
      `}</style>
      
      <div className="w-full max-w-3xl paper-texture rounded-2xl p-8 sm:p-12 animate-fade-in-up">
        <div className="mb-10">
          <h2 className="heading-font text-5xl sm:text-6xl text-[#3e2723] mb-2 tracking-tight">
            Every story matters. Save it.
          </h2>
        </div>
        
        <form className="space-y-6">
          {/* Row 1: Title and Language */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-1 animate-fade-in-up">
            <div className="space-y-2">
              <Label htmlFor="title" className="label-text">Title</Label>
              <Input 
                id="title" 
                placeholder="Name of the Title" 
                className="input-field h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language" className="label-text">Language</Label>
              <Input 
                id="language" 
                placeholder="Value" 
                className="input-field h-11"
              />
            </div>
          </div>
          
          {/* Row 2: Category and Time Period */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-2 animate-fade-in-up">
            <div className="space-y-2">
              <Label htmlFor="category" className="label-text">Category</Label>
              <Select>
                <SelectTrigger id="category" className="select-trigger h-11">
                  <SelectValue placeholder="Folk Stories" />
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
            <div className="space-y-2">
              <Label htmlFor="timePeriod" className="label-text">Time Period</Label>
              <Select>
                <SelectTrigger id="timePeriod" className="select-trigger h-11">
                  <SelectValue placeholder="Ancient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ancient">Ancient</SelectItem>
                  <SelectItem value="medieval">Medieval</SelectItem>
                  <SelectItem value="colonial">Colonial Era</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="contemporary">Contemporary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Row 3: Region and Current Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-2 animate-fade-in-up">
            <div className="space-y-2">
              <Label htmlFor="region" className="label-text">Region / Location</Label>
              <Input 
                id="region" 
                placeholder="Value" 
                className="input-field h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status" className="label-text">Current Status</Label>
              <Select>
                <SelectTrigger id="status" className="select-trigger h-11">
                  <SelectValue placeholder="Still Practice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Still Practice</SelectItem>
                  <SelectItem value="declining">Declining</SelectItem>
                  <SelectItem value="rare">Rarely Practiced</SelectItem>
                  <SelectItem value="forgotten">Almost Forgotten</SelectItem>
                  <SelectItem value="revived">Being Revived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Row 4: Ethnic/Cultural Group and Who Shared */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-3 animate-fade-in-up">
            <div className="space-y-2">
              <Label htmlFor="ethnic" className="label-text">Ethnic / Cultural Group</Label>
              <Input 
                id="ethnic" 
                placeholder="Value" 
                className="input-field h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sharedBy" className="label-text">Who shared This With You?</Label>
              <Input 
                id="sharedBy" 
                placeholder="Value" 
                className="input-field h-11"
              />
            </div>
          </div>
          
          {/* Media Upload Section */}
          <div className="space-y-2 stagger-3 animate-fade-in-up">
            <Label className="label-text">Media Upload (Optional)</Label>
            <div className="upload-section">
              <div className="space-y-3">
                <div className="upload-icon">
                  <span>↓</span>
                  <span>Image</span>
                </div>
                <div className="upload-icon">
                  <span>↓</span>
                  <span>Video</span>
                </div>
                <div className="upload-icon">
                  <span>↓</span>
                  <span>Audio</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tags Section */}
          <div className="space-y-2 stagger-3 animate-fade-in-up">
            <Label className="label-text">Tags (Optional)</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span key={tag} className="tag-badge">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-[#3e2723] transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          
          {/* Description */}
          <div className="space-y-2 stagger-3 animate-fade-in-up">
            <Label htmlFor="description" className="label-text">Description</Label>
            <Textarea 
              id="description"
              placeholder="Value"
              className="textarea-field min-h-[180px] resize-none"
            />
          </div>
          
          {/* Buttons */}
          <div className="flex gap-4 pt-4 stagger-3 animate-fade-in-up">
            <Button 
              type="submit" 
              className="heritage-button px-8 h-11"
            >
              Submit
            </Button>
            <Button 
              type="button"
              onClick={handleClear}
              className="clear-button px-8 h-11"
            >
              Clear
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
