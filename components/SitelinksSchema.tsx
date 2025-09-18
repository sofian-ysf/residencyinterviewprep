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
            "name": "MyERAS Editing",
            "alternateName": ["MyERAS Editor", "ERAS Review Service", "ERAS Application Review Service"],
            "url": "https://www.myerasediting.com",
            "logo": "https://www.myerasediting.com/logo2.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-800-ERAS-HELP",
              "contactType": "customer service",
              "availableLanguage": ["English", "Spanish"]
            },
            "sameAs": [
              "https://www.facebook.com/myerasediting",
              "https://twitter.com/myerasediting",
              "https://www.linkedin.com/company/myerasediting",
              "https://www.instagram.com/myerasediting",
              "https://www.youtube.com/@myerasediting"
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
            "name": "MyERAS Editing",
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