import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { value: "10,000+", label: "Applications Reviewed" },
    { value: "85%", label: "Match Rate" },
    { value: "200+", label: "Medical Schools" },
    { value: "50+", label: "Expert Reviewers" },
  ];

  const values = [
    {
      title: "Excellence",
      description: "We maintain the highest standards in application review, ensuring every detail is optimized for success."
    },
    {
      title: "Expertise",
      description: "Our reviewers are physicians who have served on admission committees and know what programs seek."
    },
    {
      title: "Empathy",
      description: "We understand the stress of the application process and provide supportive, constructive feedback."
    },
    {
      title: "Ethics",
      description: "We maintain strict confidentiality and never compromise the integrity of your application."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About MyERAS Reviewer
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We're on a mission to democratize access to expert residency application guidance
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Story</h2>
          <div className="prose prose-lg text-gray-600 space-y-6">
            <p>
              Founded in 2019 by a group of resident physicians who experienced firsthand the challenges and inequities of the residency application process, MyERAS Reviewer was born from a simple observation: success in matching shouldn't depend on having insider connections or affording expensive consultants.
            </p>
            <p>
              Our founders, having served on admission committees at top programs including Johns Hopkins, Mayo Clinic, and Stanford, witnessed countless talented applicants fail to match simply because their applications didn't effectively communicate their strengths. They saw how applicants from well-connected backgrounds had access to mentors who could guide them through the nuances of ERAS applications, while equally qualified candidates without these advantages struggled to present themselves competitively.
            </p>
            <p>
              This disparity drove us to create a platform that would level the playing field. We assembled a team of physicians from diverse specialties and backgrounds, all committed to sharing their insider knowledge with the next generation of physicians. Our reviewers include program directors, chief residents, and recent successful applicants who understand both what admission committees seek and what applicants experience.
            </p>
            <p>
              Today, we've helped over 10,000 medical students and graduates navigate the complex residency application process. Our 85% match rate, nearly three times the national average, reflects not just our expertise but our commitment to each applicant's success. We've worked with students from over 200 medical schools worldwide, from Ivy League institutions to international medical graduates seeking their chance in the U.S. healthcare system.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
          <div className="prose prose-lg text-gray-600 space-y-6">
            <p>
              We believe every qualified medical student deserves the opportunity to match into a residency program that aligns with their goals and values. Our mission extends beyond simply editing applications; we aim to transform how applicants present their journeys, achievements, and potential to residency programs.
            </p>
            <p>
              The residency application process has become increasingly competitive, with program directors spending mere seconds reviewing each application before making initial screening decisions. In this environment, even exceptional candidates can be overlooked if their applications don't immediately capture attention and effectively communicate their qualifications. We bridge this gap by combining human expertise with technological innovation to ensure every application we review stands out for the right reasons.
            </p>
            <p>
              Our approach integrates the nuanced understanding that only experienced physicians can provide with data-driven insights from thousands of successful applications. We don't believe in generic templates or one-size-fits-all advice. Instead, we recognize that each applicant brings unique experiences and perspectives that, when properly articulated, can resonate with the right programs.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Team</h2>
          <div className="prose prose-lg text-gray-600 space-y-6">
            <p>
              Our team comprises over 50 physicians across all major specialties, each bringing unique insights from their experiences on both sides of the application process. Our reviewers have collectively reviewed thousands of applications for their respective programs and understand the subtle differences that distinguish successful applications in each specialty.
            </p>
            <p>
              Beyond our medical expertise, our team includes professional writers, data scientists, and user experience designers who ensure our platform delivers exceptional value efficiently. We've invested heavily in training our reviewers not just to identify weaknesses in applications but to provide constructive, actionable feedback that empowers applicants to tell their stories more effectively.
            </p>
            <p>
              What unites our diverse team is a shared commitment to medical education and a belief that the future of medicine benefits when talented, dedicated individuals from all backgrounds have equal opportunity to pursue their chosen specialties. Many of our reviewers volunteer additional hours mentoring underrepresented minorities in medicine, and we're proud that our platform has helped increase diversity in competitive specialties.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 bg-[#f3f4f6] text-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Impact</h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Every successful match represents not just an individual achievement but a contribution to the future of healthcare. Our alumni now serve as residents and attendings at leading institutions nationwide, caring for patients and training the next generation of physicians. We're proud to have played a small part in their journeys and remain committed to supporting future applicants in achieving their dreams.
          </p>
          <div className="flex justify-center gap-12">
            <div>
              <div className="text-4xl font-bold mb-2">2,847</div>
              <div className="text-gray-600">Matched in 2024</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">47</div>
              <div className="text-gray-600">States Represented</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}