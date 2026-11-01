import type {ComponentType, ReactNode, SVGProps} from "react";
import {Database, GraduationCap, Mail, Sparkles, UserRoundCog} from "lucide-react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & {size?: string | number}>;

/**
 * The five writing topics. The id matches the key in blog/tags.yml,
 * which is also the last part of the tag URL (/blog/tags/<id>).
 */
export const topics = {
  "marketing-cloud-engagement": {
    label: "Marketing Cloud Engagement",
    Icon: Mail,
  },
  "marketing-cloud-personalization": {
    label: "Marketing Cloud Personalization",
    Icon: Sparkles,
  },
  "data-360": {
    label: "Data 360",
    Icon: Database,
  },
  personalization: {
    label: "Personalization",
    Icon: UserRoundCog,
  },
  "exam-prep": {
    label: "Exam Prep",
    Icon: GraduationCap,
  },
} as const satisfies Record<string, {label: string; Icon: IconComponent}>;

export type TopicId = keyof typeof topics;

export function topicFromPermalink(permalink: string): TopicId | null {
  const slug = permalink.split("/").filter(Boolean).pop() ?? "";
  if (slug in topics) return slug as TopicId;
  return null;
}

export function TopicIcon({topic}: {topic: TopicId}): ReactNode {
  const Icon = topics[topic].Icon;
  return (
    <Icon className="tag-chip__icon" size={14} strokeWidth={2.25} aria-hidden="true" />
  );
}
