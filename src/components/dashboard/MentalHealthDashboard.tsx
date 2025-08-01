import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar, Users, FileText } from 'lucide-react';

const MentalHealthDashboard: React.FC = () => {
  useEffect(() => {
    // Redirect to Airtable after a short delay to show the dashboard first
    const timer = setTimeout(() => {
      window.location.href = 'https://airtable.com/apppGgnH3vEUcHhcb/shrTQTOQEJkHHZUDd/tblIaxQcPmVTnArjR/viwajtenKaSlxeDRG?blocks=hide';
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleRedirect = () => {
    window.location.href = 'https://airtable.com/apppGgnH3vEUcHhcb/shrTQTOQEJkHHZUDd/tblIaxQcPmVTnArjR/viwajtenKaSlxeDRG?blocks=hide';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Mental Health Professional Dashboard</h1>
        <Button onClick={handleRedirect} className="flex items-center gap-2">
          <ExternalLink className="h-4 w-4" />
          Go to Airtable
        </Button>
      </div>
      
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">Redirecting to Professional Portal</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-700 mb-4">
            You will be automatically redirected to your professional management portal in a few seconds.
          </p>
          <Button onClick={handleRedirect} className="bg-blue-600 hover:bg-blue-700">
            Access Portal Now
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">2 upcoming</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Case Notes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">12 pending review</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MentalHealthDashboard;
