import React from 'react';

/**
 * Reusable JSON-LD Schema component for rich search engine snippets.
 * Supports passing structured objects or arrays of schemas.
 */
export default function JsonLd({ schema, type, data }) {
  const structuredData = schema || {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
