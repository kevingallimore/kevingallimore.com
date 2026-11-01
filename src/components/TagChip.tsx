import type {ReactNode} from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import {TopicIcon, topicFromPermalink} from "@site/src/components/topics";

type TagChipProps = {
  permalink: string;
  label: string;
  count?: number;
  description?: string;
};

/** Blog tag pill. Topic tags pick up their color and icon. Other tags stay blue. */
export default function TagChip({
  permalink,
  label,
  count,
  description,
}: TagChipProps): ReactNode {
  const topic = topicFromPermalink(permalink);

  return (
    <Link
      rel="tag"
      href={permalink}
      title={description}
      className={clsx("tag-chip", topic && `tag-chip--${topic}`)}>
      {topic ? <TopicIcon topic={topic} /> : null}
      <span>{label}</span>
      {typeof count === "number" ? (
        <span className="tag-chip__count">{count}</span>
      ) : null}
    </Link>
  );
}
