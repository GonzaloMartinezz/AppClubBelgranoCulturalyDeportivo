export const CLUB_COLORS = {
  primary: '#003087',
  secondary: '#FFFFFF',
  accent: '#FFD700',
  dark: '#0A0A0A',
  surface: '#111827',
};

export const API_URL = import.meta.env.VITE_API_URL || '/api/v1';
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
export const CLUB_NAME = 'Club Belgrano Cultural y Deportivo';
export const CLUB_SHORT = 'Belgrano CyD';
export const CLUB_NICKNAME = 'El Patriota';
export const FOUNDED_YEAR = 1906;

export const POSITIONS = {
  BASE: 'Base',
  ESCOLTA: 'Escolta',
  ALERO: 'Alero',
  'ALA-PIVOT': 'Ala-Pivot',
  PIVOT: 'Pivot',
};

export const MATCH_STATUS = {
  SCHEDULED: 'Programado',
  LIVE: 'En Vivo',
  FINAL: 'Final',
  SUSPENDED: 'Suspendido',
  CANCELLED: 'Cancelado',
};
