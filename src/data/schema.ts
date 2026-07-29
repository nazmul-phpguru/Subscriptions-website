export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WebCare & SEO Subscriptions Agency",
    "url": "https://webcare-seo-agency.com",
    "logo": "https://webcare-seo-agency.com/logo.png",
    "description": "Premier digital agency providing subscription-based website maintenance, 24/7 security, automated backups, bug fixes, and organic SEO growth.",
    "telephone": "+1-800-555-CARE",
    "email": "support@webcare-seo-agency.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "500 Tech Boulevard, Suite 400",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "postalCode": "94105",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://twitter.com/webcareagency",
      "https://linkedin.com/company/webcareagency",
      "https://github.com/webcareagency"
    ]
  };
}

export function generateServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Website Maintenance and SEO Subscriptions",
    "provider": {
      "@type": "Organization",
      "name": "WebCare & SEO Subscriptions Agency"
    },
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Subscription Plans",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Website Maintenance Packages",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Starter Care Subscription"
              },
              "price": "59.00",
              "priceCurrency": "USD",
              "billingIncrement": "Yearly (Billed $708/yr)"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Growth Shield Subscription"
              },
              "price": "119.00",
              "priceCurrency": "USD",
              "billingIncrement": "Yearly (Billed $1428/yr)"
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "SEO Subscriptions",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "National Growth SEO"
              },
              "price": "359.00",
              "priceCurrency": "USD",
              "billingIncrement": "Yearly"
            }
          ]
        }
      ]
    }
  };
}

export function generateFAQSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };
}

export function generateBreadcrumbSchema(breadcrumbs: { title: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.title,
      "item": `https://webcare-seo-agency.com/${crumb.href.replace('#', '')}`
    }))
  };
}
