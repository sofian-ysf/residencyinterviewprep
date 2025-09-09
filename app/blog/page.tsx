import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CategorySVG, { colorPalettes } from "@/components/blog/CategorySVG";
import { Calendar, Clock, Eye, TrendingUp, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { format } from "date-fns";

async function getBlogPosts(category?: string) {
  const where = category ? { category: category as any } : {};
  
  const posts = await prisma.blogPost.findMany({
    where,
    orderBy: { publishedAt: 'desc' },
    take: 20,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      metaDescription: true,
      category: true,
      tags: true,
      icon: true,
      publishedAt: true,
      featured: true,
      readTime: true,
      views: true,
    }
  });
  
  return posts;
}

async function getFeaturedPosts() {
  const posts = await prisma.blogPost.findMany({
    where: { featured: true },
    orderBy: { publishedAt: 'desc' },
    take: 3,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      metaDescription: true,
      category: true,
      tags: true,
      icon: true,
      publishedAt: true,
      featured: true,
      readTime: true,
      views: true,
    }
  });
  
  return posts;
}

const categories = [
  { value: 'APPLICATION_TIPS', label: 'Application Tips' },
  { value: 'PERSONAL_STATEMENT', label: 'Personal Statement' },
  { value: 'INTERVIEW_PREP', label: 'Interview Prep' },
  { value: 'SPECIALTY_GUIDES', label: 'Specialty Guides' },
  { value: 'TIMELINE_PLANNING', label: 'Timeline Planning' },
  { value: 'PROGRAM_SELECTION', label: 'Program Selection' },
  { value: 'MATCH_STRATEGY', label: 'Match Strategy' },
  { value: 'SUCCESS_STORIES', label: 'Success Stories' },
];

const getCategoryLabel = (category: string) => {
  const cat = categories.find(c => c.value === category);
  return cat?.label || category;
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams;
  const posts = await getBlogPosts(params.category);
  const featuredPosts = await getFeaturedPosts();
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header */}
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              ERAS Application Resources
            </h1>
            <p className="text-xl text-gray-600">
              Expert insights and strategies to help you match into your dream residency
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="mt-10 flex flex-wrap gap-2">
            <Link href="/blog">
              <Button 
                variant={!params.category ? "default" : "outline"} 
                size="sm"
                className={!params.category 
                  ? "bg-[#f3f4f6] hover:bg-gray-800 text-white rounded-full px-4 cursor-pointer" 
                  : "border-gray-200 hover:bg-gray-50 rounded-full px-4 cursor-pointer"
                }
              >
                All Posts
              </Button>
            </Link>
            {categories.map((cat) => (
              <Link key={cat.value} href={`/blog?category=${cat.value}`}>
                <Button 
                  variant={params.category === cat.value ? "default" : "outline"} 
                  size="sm"
                  className={params.category === cat.value
                    ? "bg-[#f3f4f6] hover:bg-gray-800 text-white rounded-full px-4 cursor-pointer" 
                    : "border-gray-200 hover:bg-gray-50 rounded-full px-4 cursor-pointer"
                  }
                >
                  {cat.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Posts */}
      {featuredPosts.length > 0 && !params.category && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center mb-8">
            <TrendingUp className="h-5 w-5 text-gray-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Featured Articles</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredPosts.map((post, index) => {
              const backgroundColor = colorPalettes[index % colorPalettes.length];
              return (
                <Card 
                  key={post.id} 
                  className="border-0 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden rounded-2xl"
                  style={{ '--card-bg-color': backgroundColor } as React.CSSProperties}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="h-48 relative">
                      <CategorySVG 
                        category={post.category}
                        index={index}
                      />
                    </div>
                    <CardHeader style={{ backgroundColor }} className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-700 bg-white/80 px-2 py-1 rounded-full">
                          {getCategoryLabel(post.category)}
                        </span>
                        <span className="text-xs text-gray-600 font-semibold bg-white/60 px-2 py-1 rounded-full">
                          Featured
                        </span>
                      </div>
                      <CardTitle className="text-lg text-gray-900 line-clamp-2 font-semibold">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-gray-600">
                        {post.metaDescription || post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent style={{ backgroundColor }} className="pt-0 pb-4">
                      <div className="flex items-center text-xs text-gray-600 space-x-4">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {post.readTime} min read
                        </span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
        </section>
      )}
      
      {/* All Posts */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {params.category 
            ? `${getCategoryLabel(params.category)} Articles` 
            : 'Latest Articles'}
        </h2>
        
        {posts.length === 0 ? (
          <Card className="text-center py-16 border-gray-200 rounded-2xl">
            <CardContent>
              <div className="w-24 h-24 mx-auto mb-6">
                <CategorySVG 
                  category="default"
                  index={0}
                />
              </div>
              <p className="text-gray-600 text-lg mb-2">No articles found in this category yet</p>
              <p className="text-gray-500">Check back soon for new content</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => {
              const backgroundColor = colorPalettes[index % colorPalettes.length];
              return (
                <Card 
                  key={post.id} 
                  className="border-0 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden rounded-2xl"
                  style={{ '--card-bg-color': backgroundColor } as React.CSSProperties}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="h-40 relative">
                      <CategorySVG 
                        category={post.category}
                        index={index}
                      />
                    </div>
                    <CardHeader style={{ backgroundColor }} className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-700 bg-white/80 px-2 py-1 rounded-full">
                          {getCategoryLabel(post.category)}
                        </span>
                        <span className="flex items-center text-xs text-gray-600">
                          <Eye className="h-3 w-3 mr-1" />
                          {post.views}
                        </span>
                      </div>
                      <CardTitle className="text-lg text-gray-900 line-clamp-2 font-semibold">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3 text-gray-600">
                        {post.metaDescription || post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent style={{ backgroundColor }} className="pt-0 pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-600 space-x-3">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {format(new Date(post.publishedAt), 'MMM d')}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {post.readTime} min
                          </span>
                        </div>
                        <span className="text-gray-900 text-sm font-medium flex items-center">
                          Read more
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
        )}
      </section>
      
      {/* Newsletter CTA */}
      <section className="bg-[#f3f4f6] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Stay updated with ERAS tips
          </h2>
          <p className="text-xl mb-8 text-gray-600">
            Get weekly insights and strategies delivered to your inbox
          </p>
          <div className="flex justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-medium cursor-pointer">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-gray-600 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}