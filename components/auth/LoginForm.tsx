import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onSwitchToSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign In to Cognitio+</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-sm text-muted-foreground">
          <p>Test accounts:</p>
          <p>• Customer: user@example.com</p>
          <p>• Admin: admin@example.com</p>
          <p>• Mental Health: therapist@example.com</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Sign In</Button>
          <Button 
            type="button" 
            variant="outline" 
            className="w-full"
            onClick={onSwitchToSignup}
          >
            Create Account
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
