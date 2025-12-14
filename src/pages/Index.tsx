import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Search,
  Eye,
  Crown,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

export default function Index() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-hero animate-pulse" />
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-orb animate-float opacity-50" />
        <div
          className="absolute bottom-40 right-32 w-24 h-24 bg-gradient-orb animate-float opacity-30"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute top-60 right-20 w-40 h-40 bg-gradient-orb animate-float opacity-40"
          style={{ animationDelay: '4s' }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in">
            {/* Logo */}
            <div className="mb-8">
              <img
                src="/star.png"
                alt="Starlit logo"
                className="h-16 w-16 mx-auto object-contain"
              />
            </div>

            {/* Main headline */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gradient animate-scale-in">
              starlit
            </h1>

            {/* Tagline */}
            <div
              className="flex items-center justify-center space-x-2 mb-8 animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              <Sparkles className="h-5 w-5 text-accent" />
              <p className="text-xl text-muted-foreground">
                Lighting Your Way
              </p>
              <Sparkles className="h-5 w-5 text-accent" />
            </div>

            {/* Primary CTA buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              <Button variant="glow" size="lg" asChild>
                <Link to="/discover">
                  Explore Creators
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <Link to={user ? '/discover' : '/auth'}>Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      
      {/* Features Section */}
      
      <section className="py-20 px-4">
        <div className="container mx-auto">
          {/* Section intro */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gradient">
              Why Choose Starlit?
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to showcase your creative work
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* 1️⃣ Beautiful Profiles */}
            <Card className="p-8 text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-0 space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold">Beautiful Profiles</h3>
                <p className="text-muted-foreground">
                  Create stunning, professional portfolios that make you stand out
                </p>
              </CardContent>
            </Card>

            {/* 2️⃣ Easy Discovery */}
            <Card className="p-8 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-0 space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-secondary-glow to-accent rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold">Easy Discovery</h3>
                <p className="text-muted-foreground">
                  Get found by clients and collaborators looking for your skills
                </p>
              </CardContent>
            </Card>

            {/* 3️⃣ Simple Sharing */}
            <Card className="p-8 text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-0 space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent to-primary-glow rounded-full flex items-center justify-center">
                  <Eye className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold">Simple Sharing</h3>
                <p className="text-muted-foreground">
                  Share your work effortlessly with custom URLs and social features
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      
      {/* Call‑to‑Action Section */}
      
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="container mx-auto text-center">
          {/* Heading & sub‑copy */}
          <div className="mb-8 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 text-gradient">
              Ready to shine?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of creatives already using Starlit and become part of the
              exclusive Starlit Premium Program.
            </p>
          </div>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            <Button variant="glow" size="lg" asChild>
              <Link to={user ? '/discover' : '/auth'}>
                Get Started Today
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <Link to="/premium" className="flex items-center">
                <Crown className="h-5 w-5 mr-2 text-yellow-500" />
                Become Starlit Premium
              </Link>
            </Button>
          </div>
        </div>
      </section>

      
      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Starlit. Lighting Your Way.
          </p>
        </div>
      </footer>
    </div>
  );
}