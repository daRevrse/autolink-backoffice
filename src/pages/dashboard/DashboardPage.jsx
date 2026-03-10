import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { 
  Plus, Calendar, Filter, Users, Inbox, Car, TrendingUp 
} from "lucide-react";
import { theme as C } from '@/theme';
import { KPICard, Btn, PageHeader, Spinner } from '@/components/ui';
import { dashboardService } from '@/services/dashboard.service';
import { formatFCFA } from '@/lib/formatters';

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => dashboardService.getStats()
  });

  if (isLoading) {
    return (
      <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Spinner size={40} />
      </div>
    );
  }

  const icons = [Inbox, TrendingUp, Car, Users];

  return (
    <div>
      <PageHeader 
        breadcrumb="Vue d'ensemble" 
        title="Tableau de Bord"
      >
        <Btn small style={{ background: C.white, border: `1px solid ${C.border}` }} icon={Calendar}>
          Février 2026
        </Btn>
        <Btn small style={{ background: C.white, border: `1px solid ${C.border}` }} icon={Filter}>
          Filtres
        </Btn>
        <Btn primary icon={Plus}>Nouvelle Demande</Btn>
      </PageHeader>

      <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        {data?.kpis.map((kpi, i) => (
          <KPICard 
            key={i} 
            label={kpi.label} 
            value={kpi.value} 
            sub={kpi.sub} 
            color={kpi.color} 
            icon={icons[i]} 
          />
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        {/* Graphique Revenus */}
        <div style={{
          background: C.white, border: `1px solid ${C.border}`, borderRadius: 10,
          padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 20 }}>Évolution du Chiffre d'Affaires</div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.revenueData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.primary} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={C.primary} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: C.gray }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: C.gray }} 
                  tickFormatter={val => `${val/1000000}M`}
                />
                <Tooltip 
                  formatter={(val) => formatFCFA(val)}
                  contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={C.primary} 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graphique Activité */}
        <div style={{
          background: C.white, border: `1px solid ${C.border}`, borderRadius: 10,
          padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 20 }}>Activité Dépannage vs Entretien</div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.activityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: C.gray }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: C.gray }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: 20, fontSize: 11 }} />
                <Bar dataKey="d" name="Dépannage" fill={C.primary} radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="e" name="Entretien" fill={C.accent} radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
