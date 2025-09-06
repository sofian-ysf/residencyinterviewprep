import Script from 'next/script';
import { generateSitelinkSchemas } from '@/lib/seo/google-sitelinks';

export default function SitelinksSchema() {
  const schemas = generateSitelinkSchemas();
  
  return (
    <>
      {/* Main combined schema for Google sitelinks */}
      <Script
        id="sitelinks-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": schemas
          })
        }}
      />
      
      {/* Additional brand entity markup */}
      <Script
        id="brand-entity"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Corporation",
            "name": "MyERAS Reviewer",
            "alternateName": ["MyERAS Editing", "MyERAS Review Service", "ERAS Application Review Service"],
            "url": "https://myerasreviewer.com",
            "logo": "https://myerasreviewer.com/logo2.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-800-ERAS-HELP",
              "contactType": "customer service",
              "availableLanguage": ["English", "Spanish"]
            },
            "sameAs": [
              "https://www.facebook.com/myerasreviewer",
              "https://twitter.com/myerasreviewer",
              "https://www.linkedin.com/company/myerasreviewer",
              "https://www.instagram.com/myerasreviewer",
              "https://www.youtube.com/@myerasreviewer"
            ]
          })
        }}
      />
      
      {/* Speakable schema for voice search */}
      <Script
        id="speakable-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "MyERAS Reviewer",
            "speakable": {
              "@type": "SpeakableSpecification",
              "xpath": [
                "/html/head/title",
                "/html/head/meta[@name='description']/@content",
                "/html/body/main/h1",
                "/html/body/main/section[1]/p[1]"
              ]
            }
          })
        }}
      />
    </>
  );
}