import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { TrendingUp, Users, CheckCircle, XCircle, Loader2 } from "lucide-react";

type LeadStats = {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  converted: number;
  closed: number;
  rejected: number;
};

const STATUS_COLORS = {
  new: "#3B82F6",
  contacted: "#EAB308",
  qualified: "#A855F7",
  converted: "#22C55E",
  closed: "#6B7280",
  rejected: "#EF4444",
};

export default function Analytics() {
  const { data: stats, isLoading } = useQuery<LeadStats>({
    queryKey: ["/api/admin/leads/stats"],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full" data-testid="loader-analytics">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-slate-500">Failed to load analytics</p>
      </div>
    );
  }

  const barChartData = [
    { name: "New", value: stats.new, fill: STATUS_COLORS.new },
    { name: "Contacted", value: stats.contacted, fill: STATUS_COLORS.contacted },
    { name: "Qualified", value: stats.qualified, fill: STATUS_COLORS.qualified },
    { name: "Converted", value: stats.converted, fill: STATUS_COLORS.converted },
    { name: "Closed", value: stats.closed, fill: STATUS_COLORS.closed },
    { name: "Rejected", value: stats.rejected, fill: STATUS_COLORS.rejected },
  ];

  const pieChartData = [
    { name: "New", value: stats.new, color: STATUS_COLORS.new },
    { name: "Contacted", value: stats.contacted, color: STATUS_COLORS.contacted },
    { name: "Qualified", value: stats.qualified, color: STATUS_COLORS.qualified },
    { name: "Converted", value: stats.converted, color: STATUS_COLORS.converted },
    { name: "Closed", value: stats.closed, color: STATUS_COLORS.closed },
    { name: "Rejected", value: stats.rejected, color: STATUS_COLORS.rejected },
  ];

  const conversionRate = stats.total > 0 ? ((stats.converted / stats.total) * 100).toFixed(1) : 0;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white" data-testid="text-analytics-title">
        Analytics Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card data-testid="card-total-leads">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-leads">{stats.total}</div>
          </CardContent>
        </Card>

        <Card data-testid="card-new-leads">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500" data-testid="text-new-leads">{stats.new}</div>
          </CardContent>
        </Card>

        <Card data-testid="card-contacted-leads">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Contacted</CardTitle>
            <Users className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500" data-testid="text-contacted-leads">{stats.contacted}</div>
          </CardContent>
        </Card>

        <Card data-testid="card-qualified-leads">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Qualified</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500" data-testid="text-qualified-leads">{stats.qualified}</div>
          </CardContent>
        </Card>

        <Card data-testid="card-converted-leads">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Converted</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500" data-testid="text-converted-leads">{stats.converted}</div>
          </CardContent>
        </Card>

        <Card data-testid="card-closed-leads">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Closed</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-500" data-testid="text-closed-leads">{stats.closed}</div>
          </CardContent>
        </Card>

        <Card data-testid="card-rejected-leads">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500" data-testid="text-rejected-leads">{stats.rejected}</div>
          </CardContent>
        </Card>

        <Card data-testid="card-conversion-rate">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500" data-testid="text-conversion-rate">{conversionRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card data-testid="card-bar-chart">
          <CardHeader>
            <CardTitle>Lead Distribution by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card data-testid="card-pie-chart">
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
