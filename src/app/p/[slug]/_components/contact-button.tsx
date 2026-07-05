import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ContactButtonProps {
  email: string;
  projectName: string;
}

export function ContactButton({ email, projectName }: ContactButtonProps) {
  return (
    <Button asChild size="sm">
      <a href={`mailto:${email}?subject=${encodeURIComponent(`Question about ${projectName}`)}`}>
        <Mail className="mr-2 size-4" />
        Contact
      </a>
    </Button>
  );
}
