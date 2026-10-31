import type {ReactNode} from "react";

/**
 * The splash homepage is meant to be indexed. Do not add a noindex tag here.
 */
export default function Root({children}: {children: ReactNode}): ReactNode {
  return <>{children}</>;
}
