import React from 'react';
import { CircleDot, Activity, Clock, CheckCircle, XCircle, AlertTriangle, Star, Info } from "lucide-react";
import { theme as C } from '@/theme';
import { Badge } from './Badge';

const statusMap = {
  "NOUVEAU":    { bg: C.dangerLight,  color: C.danger,  icon: CircleDot },
  "EN COURS":   { bg: C.primaryLight, color: C.primary, icon: Activity },
  "EN ATTENTE": { bg: C.warningLight, color: C.warning, icon: Clock },
  "COMPLÉTÉ":   { bg: C.successLight, color: C.success, icon: CheckCircle },
  "ANNULÉ":     { bg: C.grayLight,    color: C.gray,    icon: XCircle },
  "URGENTE":    { bg: C.dangerLight,  color: C.danger,  icon: AlertTriangle },
  "Actif":      { bg: C.successLight, color: C.success, icon: CheckCircle },
  "Inactif":    { bg: C.grayLight,    color: C.gray,    icon: XCircle },
  "VIP":        { bg: "#FFF7ED",      color: C.accent,  icon: Star },
  "Payé":       { bg: C.successLight, color: C.success, icon: CheckCircle },
  "Impayé":     { bg: C.warningLight, color: C.warning, icon: Clock },
  "Échoué":     { bg: C.dangerLight,  color: C.danger,  icon: XCircle },
};

export const StatusBadge = ({ status }) => {
  const s = statusMap[status] || { bg: C.grayLight, color: C.gray, icon: Info };
  return <Badge color={s.color} bg={s.bg} icon={s.icon}>{status}</Badge>;
};
