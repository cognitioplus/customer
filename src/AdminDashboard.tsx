import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, Activity, Settings } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    { title: 'Total Users', value: '1,234', icon: Users, change: '+12%' },
    { title: 'Total Notes', value: '8,567', icon: FileText, change: '+8%' },
    { title: 'Active Sessions', value: '89', icon: Activity, change: '+15%' },
    { title: 'System Health', value: '99.9%', icon: Settings, change: '0%' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button>System Settings</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" variant="outline">View All Users</Button>
            <Button className="w-full" variant="outline">Manage Roles</Button>
            <Button className="w-full" variant="outline">User Analytics</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Operations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" variant="outline">Database Backup</Button>
            <Button className="w-full" variant="outline">Performance Metrics</Button>
            <Button className="w-full" variant="outline">Security Logs</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;