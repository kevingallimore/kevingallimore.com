import type {ReactNode} from "react";
import type {Props} from "@theme/Tag";
import TagChip from "@site/src/components/TagChip";

export default function Tag({permalink, label, count, description}: Props): ReactNode {
  return (
    <TagChip
      permalink={permalink}
      label={label}
      count={count}
      description={description}
    />
  );
}
