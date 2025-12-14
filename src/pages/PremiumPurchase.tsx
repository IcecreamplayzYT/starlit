import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Check, Sparkles, Zap, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';

/* -------------------------------------------------------------------------- */
/*  Premium features list – keep it as a readonly tuple for better typing   */
/* -------------------------------------------------------------------------- */
const PREMIUM_FEATURES = [
  '20 gallery images (vs 5)',
  'Custom profile card image',
  'Custom background image',
  'Advanced color customization',
  'Custom CSS support',
  'Priority support',
  'Verification badge',
  'Featured placement priority',
  'Advanced card styles',
  'Particle effects',
] as const;

/* -------------------------------------------------------------------------- */
/*                                 Component                                   */
/* -------------------------------------------------------------------------- */
export default function PremiumPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [premiumExpiry, setPremiumExpiry] = useState<Date | null>(null);

  /* ---------------------------- API helpers ---------------------------- */
  const checkPremiumStatus = useCallback(async () => {
    try {
      const { data } = await api.get('/premium/status');
      setIsPremium(data.isPremium);
      setPremiumExpiry(
        data.premiumExpiry ? new Date(data.premiumExpiry) : null
      );
    } catch (err) {
      console.error('Failed to check premium status:', err);
    }
  }, []);

  /* -------------------------- Effect on mount -------------------------- */
  useEffect(() => {
    if (user) {
      checkPremiumStatus();
    }
  }, [user, checkPremiumStatus]);

  /* ---------------------------- Purchase flow -------------------------- */
  const handlePurchase = async () => {
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to purchase premium',
      });
      navigate('/auth');
      return;
    }

    setLoading(true);
    try {
      // In a real‑world app this would be a Stripe checkout flow.
      await api.post('/premium/activate', { duration: 30 });

      toast({
        title: 'Welcome to Premium!',
        description: 'Your premium features have been activated',
      });

      // Refresh status so the UI shows the new membership immediately.
      await checkPremiumStatus();

      navigate('/profile/me');
    } catch (err: any) {
      toast({
        title: 'Error',
        description:
          err.response?.data?.error ?? 'Failed to activate premium',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  /* --------------------------- Helper UI --------------------------- */
  const getDaysRemaining = (): number => {
    if (!premiumExpiry) return 0;
    const now = new Date();
    const diff = premiumExpiry.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  /* ------------------------------------------------------------------ */
  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="container mx-auto py-8 max-w-4xl">
        {/* --------------------------- Header --------------------------- */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-2 mb-4">
            <Crown className="h-12 w-12 text-yellow-500" />
            <h1 className="text-5xl font-bold text-gradient">
              Starlit Premium
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Unlock the full potential of your profile
          </p>
        </div>

        {/* ------------------------ Current status ----------------------- */}
        {isPremium && (
          <Card className="mb-8 border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-orange-500/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <Crown className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">
                      You&apos;re a Premium Member!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {getDaysRemaining()} days remaining
                    </p>
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* --------------------------- Pricing --------------------------- */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Free tier */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Free</span>
                <Badge variant="outline">Current Plan</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-6">
                $0<span className="text-lg text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3">
                {[
                  '5 gallery images',
                  'Basic customization',
                  'Profile analytics',
                  'Standard support',
                ].map((txt) => (
                  <li key={txt} className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>{txt}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Premium tier */}
          <Card className="border-yellow-500/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-3 py-1 text-xs font-bold">
              POPULAR
            </div>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                <span>Premium</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-6">
                $9.99<span className="text-lg text-muted-foreground">
                  /month
                </span>
              </div>

              <Button
                variant="glow"
                size="lg"
                className="w-full mb-6"
                onClick={handlePurchase}
                disabled={loading || isPremium}
              >
                {loading ? (
                  'Processing...'
                ) : isPremium ? (
                  'Already Premium'
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Upgrade Now
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground mb-4">
                Everything in Free, plus:
              </p>
              <ul className="space-y-2">
                {PREMIUM_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-start space-x-2">
                    <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* ----------------------- Features showcase ---------------------- */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Advanced Customization</h3>
              <p className="text-sm text-muted-foreground">
                Fully customize your profile with colors, themes, and custom
                CSS
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Stand Out</h3>
              <p className="text-sm text-muted-foreground">
                Get featured placement and a verified badge
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Priority Support</h3>
              <p className="text-sm text-muted-foreground">
                Get help faster with priority customer support
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}