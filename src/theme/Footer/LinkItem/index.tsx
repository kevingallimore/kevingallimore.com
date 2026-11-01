/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ReactNode} from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import type {Props} from "@theme/Footer/LinkItem";
import {FooterLinkIcon} from "@site/src/components/BrandIcon";

export default function FooterLinkItem({item}: Props): ReactNode {
  const {to, href, label, prependBaseUrlToHref, className, ...props} = item;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {forcePrependBaseUrl: true});
  const linkHref = href ? (prependBaseUrlToHref ? normalizedHref : href) : undefined;

  return (
    <Link
      className={clsx("footer__link-item", className)}
      {...(href ? {href: linkHref} : {to: toUrl})}
      {...props}>
      <FooterLinkIcon href={linkHref} label={label ?? ""} />
      {label}
    </Link>
  );
}
