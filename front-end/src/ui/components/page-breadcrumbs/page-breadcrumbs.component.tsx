import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export type BreadcrumbPage = {
  name: string;
  href: string;
};

type Props = {
  pages: BreadcrumbPage[];
  currentPageName: string;
};

export function PageBreadcrumbs({ pages, currentPageName }: Props) {
  return (
    <Breadcrumb>
      {pages.map((page) => {
        return (
          <BreadcrumbItem
            isCurrentPage={currentPageName === page.name}
            key={page.name}
          >
            <BreadcrumbLink
              _activeLink={{ color: "#6D99FB" }}
              as={Link}
              to={page.href}
            >
              {page.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}
