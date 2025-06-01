'use client';

import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
// Using simple link sharing, no specific SDKs for now
// For more advanced sharing, consider libraries or direct API integrations

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'X (Twitter)',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/></svg>
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      // Facebook icon from Lucide is 'Facebook', but let's use a generic share or custom SVG if needed
      // For simplicity, using Share2 icon for all now
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0 0 3.604 0 8.05C0 12.056 2.76 15.224 6.437 15.993v-4.63H4.438V8.05h2V6.282c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v2.03h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 3.306H9.45V15.993A8.01 8.01 0 0 0 16 8.049"/></svg>
    },
    // Instagram sharing is more complex, typically done via their app or specific APIs.
    // A simple link might not work as expected for direct posting.
    // For now, omitting Instagram direct share button.
  ];

  return (
    <div className="flex items-center gap-2">
      <p className="text-sm font-medium mr-2 hidden sm:block">Share:</p>
      {shareLinks.map(link => (
        <Button
          key={link.name}
          variant="outline"
          size="sm"
          asChild
          className="gap-2"
        >
          <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${link.name}`}>
            {link.icon}
            <span className="hidden md:inline">{link.name}</span>
          </a>
        </Button>
      ))}
    </div>
  );
}
