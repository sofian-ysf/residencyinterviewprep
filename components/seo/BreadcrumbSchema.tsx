"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  item?: string;
}

interface BreadcrumbSchemaProps {
  customItems?: BreadcrumbItem[];
  showVisualBreadcrumb?: boolean;
}

export default function BreadcrumbSchema({
  customItems,
  showVisualBreadcrumb = true
}: BreadcrumbSchemaProps) {
  const pathname = usePathname();
  const baseUrl = "https://www.myerasediting.com";

  // Generate breadcrumb items from pathname if not custom
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customItems) return customItems;

    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { name: "Home", item: baseUrl }
    ];

    let currentPath = "";
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        name,
        item: `${baseUrl}${currentPath}`
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = generateBreadcrumbs();

  // Schema.org BreadcrumbList structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item || `${baseUrl}${pathname}`
    }))
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />

      {/* Visual Breadcrumb Navigation */}
      {showVisualBreadcrumb && breadcrumbItems.length > 1 && (
        <nav
          aria-label="Breadcrumb"
          className="bg-gray-50 border-b border-gray-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <ol className="flex items-center space-x-2 text-sm">
              {breadcrumbItems.map((item, index) => {
                const isLast = index === breadcrumbItems.length - 1;
                return (
                  <li key={index} className="flex items-center">
                    {index > 0 && (
                      <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                    )}
                    {isLast ? (
                      <span className="text-gray-900 font-medium">
                        {item.name}
                      </span>
                    ) : (
                      <Link
                        href={item.item?.replace(baseUrl, '') || '/'}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </nav>
      )}
    </>
  );
}

// Helper component for pages that need custom breadcrumbs
export function ServiceBreadcrumbs() {
  const pathname = usePathname();
  const serviceName = pathname.split('/').pop()?.split('-').map(
    word => word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  const items: BreadcrumbItem[] = [
    { name: "Home", item: "https://www.myerasediting.com" },
    { name: "Services", item: "https://www.myerasediting.com/services" },
    { name: serviceName || "Service", item: `https://www.myerasediting.com${pathname}` }
  ];

  return <BreadcrumbSchema customItems={items} />;
}

// Helper component for guide pages
export function GuideBreadcrumbs() {
  const pathname = usePathname();
  const guideName = pathname.split('/').pop()?.split('-').map(
    word => word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  const items: BreadcrumbItem[] = [
    { name: "Home", item: "https://www.myerasediting.com" },
    { name: "Guides", item: "https://www.myerasediting.com/guides" },
    { name: guideName || "Guide", item: `https://www.myerasediting.com${pathname}` }
  ];

  return <BreadcrumbSchema customItems={items} />;
}

// Helper component for blog posts
export function BlogBreadcrumbs({ postTitle }: { postTitle: string }) {
  const pathname = usePathname();

  const items: BreadcrumbItem[] = [
    { name: "Home", item: "https://www.myerasediting.com" },
    { name: "Blog", item: "https://www.myerasediting.com/blog" },
    { name: postTitle, item: `https://www.myerasediting.com${pathname}` }
  ];

  return <BreadcrumbSchema customItems={items} />;
}