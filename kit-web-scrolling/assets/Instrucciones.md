# 🏀 PLAN MAESTRO DE ARQUITECTURA
## Club Belgrano Cultural y Deportivo — Tucumán
### Web App Fullstack MERN — Diseño Inspirado en Baronissi Sports Club

> **Versión:** 2.0  
> **Fecha:** Mayo 2026  
> **Stack:** MERN (MongoDB + Express + React + Node.js)  
> **Referencia Visual:** https://baronissisportsclub.webflow.io/  
> **Fuente de Datos Real:** CAB Liga Federal — Belgrano CyD Tucumán  

---

## 0. DATOS REALES DEL CLUB (Seed Data)

Información extraída de la Confederación Argentina de Básquetbol y fuentes oficiales para poblar la base de datos inicial.

### 0.1 Información del Club

```json
{
  "name": "Club Belgrano Cultural y Deportivo",
  "shortName": "Belgrano CyD",
  "nickname": "El Patriota",
  "foundedYear": 1906,
  "location": {
    "city": "San Miguel de Tucumán",
    "province": "Tucumán",
    "country": "Argentina"
  },
  "venue": "Estadio Julio César Figueroa",
  "primaryColor": "#003087",
  "secondaryColor": "#FFFFFF",
  "accentColor": "#FFD700",
  "competition": "Liga Federal 2025 — Conferencia Norte, Grupo A",
  "division": "Liga Federal (3ra categoría nacional)",
  "socialMedia": {
    "facebook": "BelgranoCyDPrensaOficial",
    "instagram": "@belgrano_cyd"
  }
}
```

### 0.2 Plantel 2025 (Seed Data real)

```json
{
  "staff": [
    { "name": "Hugo", "lastName": "Angelicola", "role": "HEAD_COACH", "roleDisplay": "Director Técnico" },
    { "name": "Lisandro", "lastName": "Caniza", "role": "HEAD_COACH", "roleDisplay": "DT (temporada anterior)" },
    { "name": "Luciano", "lastName": "Saran", "role": "ASSISTANT_COACH", "roleDisplay": "Asistente Técnico" },
    { "name": "David", "lastName": "Torres", "role": "ASSISTANT_COACH", "roleDisplay": "Asistente Técnico" },
    { "name": "Ariel", "lastName": "Abregú", "role": "FITNESS_COACH", "roleDisplay": "Preparador Físico" },
    { "name": "Carlos", "lastName": "Ledesma", "role": "UTILITIES", "roleDisplay": "Utilero" }
  ],
  "players": [
    { "name": "Iván", "lastName": "Albornoz", "position": "PIVOT", "isCaptain": true, "origin": "Rosario de la Frontera, Salta" },
    { "name": "Juan Cruz", "lastName": "Rodríguez", "position": "ALERO" },
    { "name": "Luciano", "lastName": "Maróstica", "position": "ESCOLTA" },
    { "name": "Tomás", "lastName": "Monteros", "position": "BASE" },
    { "name": "Juan Pablo", "lastName": "Vigiani", "position": "ALERO" },
    { "name": "Nataniel", "lastName": "Rodríguez", "position": "ALA-PIVOT", "origin": "Chaco" },
    { "name": "Matías", "lastName": "Nuñez", "position": "ESCOLTA", "origin": "Chaco" },
    { "name": "Gonzalo", "lastName": "Gerez", "position": "ALERO", "origin": "Charata, Chaco" },
    { "name": "Lucca", "lastName": "Theiler", "position": "BASE", "category": "U21", "origin": "Santa Fe" },
    { "name": "Bautista", "lastName": "Casares", "position": "ALERO", "category": "Juvenil" },
    { "name": "Mauro", "lastName": "Ponce", "position": "BASE", "category": "Juvenil" },
    { "name": "Juan Cruz", "lastName": "Villarreal", "position": "ESCOLTA", "category": "Juvenil" },
    { "name": "Benjamín", "lastName": "Trejo", "position": "ALA-PIVOT", "category": "Juvenil" },
    { "name": "Armando", "lastName": "Simón", "position": "PIVOT", "category": "Juvenil" }
  ]
}
```

### 0.3 Datos de Competencia 2025

```json
{
  "competition": "Liga Federal 2025",
  "organizer": "Confederación Argentina de Básquetbol (CAB)",
  "conferencia": "Norte",
  "grupo": "A",
  "primerPartido": "vs San Martín de Tucumán — 25 de Febrero 2025 (visitante)",
  "totalEquipos": 110,
  "instanciaAlcanzada": "Playoffs — eliminado por Unión y Juventud (114-107, 2 suplementarios)",
  "resultadosDestacados": [
    "Belgrano 81 - Bochas Sport Club 72 (Playoffs)",
    "Belgrano 92 - Unión y Juventud de Bandera 91",
    "Mitre 102 - Belgrano 98 (penúltima fecha)"
  ]
}
```

---

## 1. VISIÓN ESTRATÉGICA

### 1.1 Qué construimos

Una web app fullstack responsive que funcione como plataforma oficial del club, combinando:

- **Presencia institucional** (estética dark-sport al estilo Baronissi)
- **Match Center en tiempo real** (Socket.io con scores y box scores en vivo)
- **Gestión de plantel y estadísticas** (portal admin protegido)
- **Sistema QR de socios** (ticketing y control de acceso)
- **Tienda online** (indumentaria y merchandising)

### 1.2 Análisis de Estado

| Aspecto | Estado Actual | Objetivo |
|---------|---------------|----------|
| Frontend | Componentes planos | Arquitectura by Features + Diseño Baronissi |
| Backend | No existente | API RESTful 3-Tier + Socket.io |
| Datos | Mock/estático | MongoDB poblado con datos reales CAB |
| Seguridad | N/A | JWT + Roles + QR Validation |
| Tiempo Real | No | Socket.io Live Match Center |
| Responsive | Parcial | Mobile-first (375px → desktop) |

### 1.3 Referencia Visual — Baronissi Sports Club

Secciones a replicar con identidad Belgrano CyD:

| Baronissi | Belgrano CyD | Descripción |
|-----------|--------------|-------------|
| Home hero + scroll animado | `/` | Hero con "El Patriota" + marquee animado |
| Next Game card | Hero section | Próximo partido destacado |
| Final Score | Hero section | Último resultado |
| Calendar strip | `/fixture` | Calendario de partidos |
| Our Family | `/plantel` | Plantel por categoría + cuerpo técnico |
| Photo Gallery | `/galeria` | Galería multimedia |
| Shop | `/tienda` | Indumentaria oficial |
| Contact form | Footer | Formulario de contacto |
| Sponsors strip | Home + footer | Logos patrocinadores animados |
| Match Center | `/live/:id` | Scoreboard en vivo (nuevo) |

---

## 2. ARQUITECTURA DE DATOS

### 2.1 Modelo Entidad-Relación (MongoDB con Refs)

```
┌─────────────────┐     ┌─────────────────┐
│      CLUB       │     │   COMPETITION   │
│ - name          │     │ - name          │
│ - shortName     │◄────│ - season        │
│ - nickname      │     │ - division      │
│ - logo          │     │ - conferencia   │
│ - colors        │     │ - grupo         │
│ - foundedYear   │     │ - startDate     │
│ - venue         │     │ - endDate       │
│ - socialMedia   │     │ - format        │
└─────────────────┘     │ - standings[]   │
                        └────────┬────────┘
                                 │
        ┌───────────────────────┐│
        ▼                       ▼▼
┌─────────────────┐     ┌───────────────┐
│    CATEGORY     │     │     MATCH     │
│ - name          │     │ - date        │
│ - division      │◄────│ - venue       │
│ - ageRange      │     │ - homeTeam    │
│ - gender        │     │ - awayTeam    │
└────────┬────────┘     │ - competition │
         │              │ - status      │
         ▼              │ - score{}     │
┌─────────────────┐     │ - boxScore[]  │
│     TEAM        │     │ - mvp{}       │
│ - name          │     └───────────────┘
│ - categoryId   │
│ - season        │     ┌───────────────┐
│ - players[]    │     │    SPONSOR    │
│ - staff[]      │     │ - name        │
└────────┬────────┘     │ - logo        │
         │              │ - level       │
         ▼              │ - website     │
┌─────────────────┐     └───────────────┘
│     PLAYER      │
│ - name          │     ┌───────────────┐
│ - lastName      │     │  MEMBERSHIP  │
│ - position      │     │ - member{}   │
│ - number        │     │ - type        │
│ - photo         │     │ - qrToken     │
│ - isCaptain     │     │ - accessHist[]│
│ - careerStats{} │     └───────────────┘
│ - status        │
└─────────────────┘
```

### 2.2 Esquemas Mongoose

#### Club.js
```javascript
// server/src/features/club/models/Club.js
import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  shortName: { type: String, required: true, maxlength: 20 },
  nickname: { type: String, maxlength: 50 }, // "El Patriota"
  logo: { type: String },
  primaryColor: { type: String, default: '#003087' },
  secondaryColor: { type: String, default: '#FFFFFF' },
  accentColor: { type: String, default: '#FFD700' },
  foundedYear: { type: Number, min: 1800, max: 2030 },
  description: { type: String, maxlength: 1000 },
  venue: { type: String }, // "Estadio Julio César Figueroa"
  location: {
    city: { type: String, required: true },   // "San Miguel de Tucumán"
    province: { type: String, required: true }, // "Tucumán"
    address: { type: String },
    coordinates: { lat: Number, lng: Number }
  },
  socialMedia: {
    instagram: String,
    facebook: String,
    twitter: String,
    youtube: String
  },
  contact: {
    email: String,
    phone: String,
    whatsapp: String
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Club', clubSchema);
```

#### Player.js
```javascript
// server/src/features/players/models/Player.js
import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 50 },
  lastName: { type: String, required: true, maxlength: 50 },
  dni: { type: String, required: true, unique: true },
  birthDate: { type: Date },
  position: {
    type: String,
    enum: ['BASE', 'ESCOLTA', 'ALERO', 'ALA-PIVOT', 'PIVOT'],
    required: true
  },
  number: { type: Number, min: 0, max: 99 },
  photo: { type: String },
  isCaptain: { type: Boolean, default: false },
  origin: { type: String }, // ciudad de procedencia
  bio: { type: String, maxlength: 300 },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  careerStats: {
    matchesPlayed: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    rebounds: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    steals: { type: Number, default: 0 },
    blocks: { type: Number, default: 0 },
    fouls: { type: Number, default: 0 },
    pointsPerGame: { type: Number, default: 0 },
    reboundsPerGame: { type: Number, default: 0 },
    assistsPerGame: { type: Number, default: 0 }
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE', 'INJURED', 'SUSPENDED'],
    default: 'ACTIVE'
  }
}, { timestamps: true });

playerSchema.index({ name: 1, lastName: 1 });
playerSchema.index({ number: 1, team: 1 });

export default mongoose.model('Player', playerSchema);
```

#### Match.js
```javascript
// server/src/features/matches/models/Match.js
import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  homeTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  awayTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  homeTeamName: { type: String, required: true }, // para equipos visitantes externos
  awayTeamName: { type: String, required: true },
  homeTeamLogo: { type: String },
  awayTeamLogo: { type: String },
  competition: { type: mongoose.Schema.Types.ObjectId, ref: 'Competition' },
  competitionName: { type: String }, // "Liga Federal 2025"
  venue: { type: String, required: true },
  round: { type: String }, // "Fecha 1", "Playoffs", "Cuartos de Final"
  isHome: { type: Boolean, default: true }, // ¿Belgrano juega de local?
  status: {
    type: String,
    enum: ['SCHEDULED', 'LIVE', 'FINAL', 'SUSPENDED', 'CANCELLED'],
    default: 'SCHEDULED'
  },
  score: {
    home: { type: Number, default: 0 },
    away: { type: Number, default: 0 },
    quarter: { type: Number, default: 0 },
    quarterScores: [{ // parciales por cuarto
      quarter: Number,
      home: Number,
      away: Number
    }],
    quarterTime: { type: String }
  },
  boxScore: [{
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    team: { type: String, enum: ['HOME', 'AWAY'] },
    points: { type: Number, default: 0 },
    rebounds: { type: Number, default: 0 },
    offRebounds: { type: Number, default: 0 },
    defRebounds: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    steals: { type: Number, default: 0 },
    blocks: { type: Number, default: 0 },
    fouls: { type: Number, default: 0 },
    turnovers: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 },
    fgMade: { type: Number, default: 0 },
    fgAttempts: { type: Number, default: 0 },
    ftMade: { type: Number, default: 0 },
    ftAttempts: { type: Number, default: 0 },
    threeMade: { type: Number, default: 0 },
    threeAttempts: { type: Number, default: 0 },
    plusMinus: { type: Number, default: 0 }
  }],
  mvp: {
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    playerName: String,
    reason: String
  },
  highlights: [{ type: String }], // URLs de videos/fotos del partido
  referees: [{ type: String }],
  attendance: { type: Number }
}, { timestamps: true });

matchSchema.index({ date: 1 });
matchSchema.index({ status: 1 });
matchSchema.index({ competition: 1, status: 1 });

export default mongoose.model('Match', matchSchema);
```

#### Competition.js
```javascript
// server/src/features/competitions/models/Competition.js
import mongoose from 'mongoose';

const competitionSchema = new mongoose.Schema({
  name: { type: String, required: true }, // "Liga Federal 2025"
  shortName: { type: String, maxlength: 20 }, // "LF2025"
  season: { type: String, required: true }, // "2025"
  division: { type: String, required: true }, // "Liga Federal"
  conferencia: { type: String }, // "Norte"
  grupo: { type: String }, // "A"
  organizer: { type: String, default: 'CAB' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  format: {
    type: String,
    enum: ['LEAGUE', 'KNOCKOUT', 'HYBRID'],
    default: 'HYBRID'
  },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
  standings: [{
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    teamName: String,
    position: Number,
    played: { type: Number, default: 0 },
    won: { type: Number, default: 0 },
    lost: { type: Number, default: 0 },
    pointsFor: { type: Number, default: 0 },
    pointsAgainst: { type: Number, default: 0 },
    difference: { type: Number, default: 0 },
    points: { type: Number, default: 0 }
  }],
  status: {
    type: String,
    enum: ['UPCOMING', 'ACTIVE', 'COMPLETED', 'SUSPENDED'],
    default: 'UPCOMING'
  }
}, { timestamps: true });

export default mongoose.model('Competition', competitionSchema);
```

#### Sponsor.js
```javascript
// server/src/features/sponsors/models/Sponsor.js
import mongoose from 'mongoose';

const sponsorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  website: { type: String },
  description: { type: String },
  level: {
    type: String,
    enum: ['PLATINUM', 'GOLD', 'SILVER', 'BRONZE', 'OFFICIAL'],
    required: true
  },
  displayOrder: { type: Number, default: 0 },
  showOnHome: { type: Boolean, default: true },
  showOnGallery: { type: Boolean, default: false },
  contractStart: { type: Date },
  contractEnd: { type: Date },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Sponsor', sponsorSchema);
```

#### Staff.js
```javascript
// server/src/features/staff/models/Staff.js
import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  dni: { type: String, required: true, unique: true },
  birthDate: { type: Date },
  role: {
    type: String,
    enum: ['HEAD_COACH', 'ASSISTANT_COACH', 'FITNESS_COACH', 'PHYSIO', 'TEAM_MANAGER', 'UTILITIES', 'STATS_ANALYST', 'NUTRITIONIST'],
    required: true
  },
  roleDisplay: { type: String, required: true },
  photo: { type: String },
  bio: { type: String, maxlength: 500 },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  credentials: {
    license: String,
    certifiedBy: String,
    certificationDate: Date
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
    default: 'ACTIVE'
  }
}, { timestamps: true });

export default mongoose.model('Staff', staffSchema);
```

#### Membership.js
```javascript
// server/src/features/membership/models/Membership.js
import mongoose from 'mongoose';
import crypto from 'crypto';

const membershipSchema = new mongoose.Schema({
  member: {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    dni: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String }
  },
  type: {
    type: String,
    enum: ['SOCIO_ACTIVO', 'SOCIO_ADHERENTE', 'ABONADO', 'VIP'],
    required: true
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  qrToken: {
    type: String,
    unique: true,
    default: () => crypto.randomBytes(16).toString('hex')
  },
  accessHistory: [{
    match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
    entryTime: { type: Date },
    validatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],
  status: {
    type: String,
    enum: ['ACTIVE', 'SUSPENDED', 'EXPIRED', 'CANCELLED'],
    default: 'ACTIVE'
  },
  maxEntriesPerMatch: { type: Number, default: 1 }
}, { timestamps: true });

membershipSchema.index({ 'member.dni': 1 });
membershipSchema.index({ qrToken: 1 });
membershipSchema.index({ endDate: 1 });

export default mongoose.model('Membership', membershipSchema);
```

---

## 3. ARQUITECTURA DEL BACKEND

### 3.1 Estructura de Carpetas

```
server/
├── src/
│   ├── app.js
│   ├── config/
│   │   ├── database.js
│   │   ├── env.js
│   │   └── cors.js
│   │
│   ├── core/
│   │   ├── middleware/
│   │   │   ├── auth.js           # JWT Authentication
│   │   │   ├── roles.js          # Role-based Access
│   │   │   ├── errorHandler.js
│   │   │   ├── logger.js
│   │   │   └── validator.js
│   │   ├── services/
│   │   │   ├── cacheService.js
│   │   │   ├── qrService.js
│   │   │   └── imageService.js   # Upload Cloudinary/S3
│   │   └── utils/
│   │       ├── response.js
│   │       ├── pagination.js
│   │       └── helpers.js
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── routes/authRoutes.js
│   │   │   ├── controllers/authController.js
│   │   │   ├── services/authService.js
│   │   │   ├── repositories/userRepository.js
│   │   │   ├── models/User.js
│   │   │   └── index.js
│   │   │
│   │   ├── club/
│   │   │   ├── routes/clubRoutes.js
│   │   │   ├── controllers/clubController.js
│   │   │   ├── models/Club.js
│   │   │   └── index.js
│   │   │
│   │   ├── players/
│   │   │   ├── routes/playerRoutes.js
│   │   │   ├── controllers/playerController.js
│   │   │   ├── services/playerService.js
│   │   │   ├── repositories/playerRepository.js
│   │   │   ├── models/Player.js
│   │   │   └── index.js
│   │   │
│   │   ├── matches/
│   │   │   ├── routes/matchRoutes.js
│   │   │   ├── controllers/matchController.js
│   │   │   ├── services/matchService.js
│   │   │   ├── repositories/matchRepository.js
│   │   │   ├── models/Match.js
│   │   │   └── index.js
│   │   │
│   │   ├── competitions/
│   │   │   ├── routes/competitionRoutes.js
│   │   │   ├── controllers/competitionController.js
│   │   │   ├── services/competitionService.js
│   │   │   ├── repositories/competitionRepository.js
│   │   │   ├── models/Competition.js
│   │   │   └── index.js
│   │   │
│   │   ├── teams/
│   │   ├── staff/
│   │   ├── sponsors/
│   │   ├── membership/
│   │   ├── stats/
│   │   ├── gallery/
│   │   └── shop/
│   │
│   ├── sockets/
│   │   ├── socketManager.js
│   │   └── handlers/
│   │       ├── matchHandler.js   # Live score updates
│   │       └── statsHandler.js   # Live box score
│   │
│   └── seeders/                  # ← NUEVO: datos reales
│       ├── seedClub.js           # Datos Belgrano CyD
│       ├── seedPlayers.js        # Plantel 2025 real
│       ├── seedStaff.js          # Cuerpo técnico real
│       ├── seedMatches.js        # Partidos Liga Federal 2025
│       └── index.js              # Runner principal
│
├── .env.example
└── server.js
```

### 3.2 Flujo 3-Tier

```
HTTP Request
     │
     ▼
[ ROUTES ]   ← Endpoints RESTful + validación Joi/express-validator
     │
     ▼
[ CONTROLLERS ] ← req/res + llamar service
     │
     ▼
[ SERVICES ]   ← Lógica de negocio + transformaciones
     │
     ▼
[ REPOSITORIES ] ← Mongoose queries
     │
     ▼
   MongoDB
```

---

## 4. ENDPOINTS RESTful

### 4.1 Players API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/players` | Listar jugadores (`page, limit, search, team, position`) |
| GET | `/api/v1/players/:id` | Perfil completo del jugador |
| GET | `/api/v1/players/:id/stats` | Estadísticas por temporada/competencia |
| GET | `/api/v1/players/leaderboard` | Top jugadores (`stat, limit, season`) |
| GET | `/api/v1/players/captain` | Obtener capitán del equipo |
| POST | `/api/v1/players` | Crear jugador (ADMIN, STAFF) |
| PUT | `/api/v1/players/:id` | Actualizar jugador (ADMIN, STAFF) |
| DELETE | `/api/v1/players/:id` | Eliminar jugador (ADMIN) |

### 4.2 Matches API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/matches` | Listar partidos (`status, dateFrom, dateTo, competition`) |
| GET | `/api/v1/matches/latest` | Último partido jugado |
| GET | `/api/v1/matches/next` | Próximo partido programado |
| GET | `/api/v1/matches/upcoming` | Próximos N partidos |
| GET | `/api/v1/matches/:id` | Detalle completo |
| GET | `/api/v1/matches/:id/boxscore` | Box score completo |
| GET | `/api/v1/matches/:id/live` | Estado en vivo (polled por Socket.io) |
| POST | `/api/v1/matches` | Crear partido (ADMIN) |
| PUT | `/api/v1/matches/:id/score` | Actualizar score (ADMIN, STAFF) |
| PUT | `/api/v1/matches/:id/boxscore` | Guardar box score (ADMIN, STAFF) |
| PUT | `/api/v1/matches/:id/status` | Cambiar estado (SCHEDULED/LIVE/FINAL) |
| PUT | `/api/v1/matches/:id/mvp` | Asignar MVP |
| DELETE | `/api/v1/matches/:id` | Eliminar (ADMIN) |

### 4.3 Competitions API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/competitions` | Listar competencias |
| GET | `/api/v1/competitions/active` | Competencia activa actual |
| GET | `/api/v1/competitions/:id/standings` | Tabla de posiciones |
| GET | `/api/v1/competitions/:id/schedule` | Fixture completo |
| GET | `/api/v1/competitions/:id/stats` | Estadísticas de la competencia |
| PUT | `/api/v1/competitions/:id/standings` | Actualizar posiciones |

### 4.4 Stats API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/stats/leaderboard` | Ranking general por categoría estadística |
| GET | `/api/v1/stats/top-scorers` | Máximos anotadores |
| GET | `/api/v1/stats/top-rebounds` | Líderes en rebotes |
| GET | `/api/v1/stats/top-assists` | Líderes en asistencias |
| GET | `/api/v1/stats/efficiency` | Rankings por eficiencia (PIR) |
| GET | `/api/v1/stats/player/:id/history` | Historial partido a partido |
| GET | `/api/v1/stats/team/:id` | Estadísticas del equipo |
| GET | `/api/v1/stats/comparison` | Comparar dos jugadores |

### 4.5 Membership (QR Ticketing)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/v1/membership` | Registrar nuevo socio |
| POST | `/api/v1/membership/generate-qr` | Generar QR único |
| POST | `/api/v1/membership/validate-qr` | Validar QR al ingreso |
| GET | `/api/v1/membership/:id` | Info de membresía |
| GET | `/api/v1/membership/match/:matchId/attendance` | Asistencia en vivo |

### 4.6 Auth API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/v1/auth/login` | Login con email/password |
| POST | `/api/v1/auth/refresh` | Refresh token |
| POST | `/api/v1/auth/logout` | Logout |
| GET | `/api/v1/auth/me` | Perfil del usuario autenticado |

---

## 5. ARQUITECTURA DEL FRONTEND

### 5.1 Estructura de Carpetas (Features-based)

```
client/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   │
│   ├── app/
│   │   ├── routes.jsx          # Rutas con lazy loading
│   │   ├── constants.js        # CLUB_COLORS, API_URL, etc.
│   │   └── theme.js            # Tailwind + CSS vars
│   │
│   ├── core/
│   │   ├── api/
│   │   │   ├── axiosInstance.js   # Axios + interceptors
│   │   │   ├── playersApi.js
│   │   │   ├── matchesApi.js
│   │   │   └── ...
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useApi.js
│   │   │   └── useSocket.js
│   │   └── context/
│   │       ├── AuthContext.jsx
│   │       └── SocketContext.jsx
│   │
│   ├── components/              # Átomos y Moléculas
│   │   ├── atoms/
│   │   │   ├── Button.jsx
│   │   │   ├── Badge.jsx        # ACTIVE / INJURED / SUSPENDED
│   │   │   ├── Avatar.jsx
│   │   │   ├── LiveDot.jsx      # Indicador verde animado "EN VIVO"
│   │   │   └── StatPill.jsx     # "23 PTS" pill
│   │   └── molecules/
│   │       ├── PlayerCard.jsx   # Card de jugador estilo Baronissi
│   │       ├── MatchCard.jsx    # Card de partido (próximo / resultado)
│   │       ├── ScoreBoard.jsx   # Marcador en vivo
│   │       ├── SponsorStrip.jsx # Marquee horizontal de logos
│   │       └── StatRow.jsx      # Fila de estadísticas
│   │
│   ├── features/
│   │   │
│   │   ├── home/               # / — HOME
│   │   │   ├── components/
│   │   │   │   ├── HeroSection.jsx      # Hero oscuro con texto animado
│   │   │   │   ├── LatestMatchCard.jsx  # Último resultado
│   │   │   │   ├── NextMatchCard.jsx    # Próximo partido con countdown
│   │   │   │   ├── CalendarStrip.jsx    # Próximas fechas horizontal
│   │   │   │   ├── ClubManifesto.jsx    # "Desde 1906, somos El Patriota"
│   │   │   │   ├── SponsorStrip.jsx     # Logos patrocinadores
│   │   │   │   └── ContactForm.jsx      # Formulario de contacto
│   │   │   ├── hooks/useHomeData.js
│   │   │   └── index.jsx
│   │   │
│   │   ├── plantel/            # /plantel — OUR FAMILY
│   │   │   ├── components/
│   │   │   │   ├── RosterGrid.jsx       # Grilla de jugadores
│   │   │   │   ├── PlayerProfile.jsx    # Modal/página de jugador
│   │   │   │   ├── StaffSection.jsx     # Cuerpo técnico
│   │   │   │   └── CategoryTabs.jsx     # Tabs por categoría
│   │   │   ├── hooks/useRoster.js
│   │   │   └── index.jsx
│   │   │
│   │   ├── matches/            # /fixture — CALENDARIO
│   │   │   ├── components/
│   │   │   │   ├── FixtureList.jsx      # Lista de partidos
│   │   │   │   ├── MatchDetail.jsx      # Detalle + box score
│   │   │   │   └── BoxScoreTable.jsx    # Tabla estadísticas partido
│   │   │   ├── hooks/useMatches.js
│   │   │   └── index.jsx
│   │   │
│   │   ├── liveMatch/          # /live/:id — MATCH CENTER
│   │   │   ├── components/
│   │   │   │   ├── LiveScoreboard.jsx   # Marcador en tiempo real
│   │   │   │   ├── LiveBoxScore.jsx     # Stats actualizándose
│   │   │   │   ├── QuarterScores.jsx    # Parciales por cuarto
│   │   │   │   └── LiveMVP.jsx          # MVP provisional
│   │   │   ├── hooks/useLiveMatch.js    # Socket.io consumer
│   │   │   └── index.jsx
│   │   │
│   │   ├── standings/          # /posiciones — TABLA
│   │   │   ├── components/StandingsTable.jsx
│   │   │   ├── hooks/useStandings.js
│   │   │   └── index.jsx
│   │   │
│   │   ├── stats/              # /estadisticas — STATS
│   │   │   ├── components/
│   │   │   │   ├── Leaderboard.jsx      # Top por categoría
│   │   │   │   ├── PlayerComparison.jsx # Comparar jugadores
│   │   │   │   └── StatCharts.jsx       # Recharts / Chart.js
│   │   │   ├── hooks/useStats.js
│   │   │   └── index.jsx
│   │   │
│   │   ├── gallery/            # /galeria — GALERÍA
│   │   │   ├── components/
│   │   │   │   ├── GalleryGrid.jsx
│   │   │   │   └── PhotoModal.jsx
│   │   │   └── index.jsx
│   │   │
│   │   ├── shop/               # /tienda — TIENDA
│   │   │   ├── components/
│   │   │   │   ├── ProductGrid.jsx
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   └── Cart.jsx
│   │   │   └── index.jsx
│   │   │
│   │   ├── membership/         # /socios — SOCIOS
│   │   │   ├── components/
│   │   │   │   ├── MembershipCard.jsx   # QR del socio
│   │   │   │   └── QRScanner.jsx        # Escáner para porteros
│   │   │   └── index.jsx
│   │   │
│   │   └── admin/              # /admin — PANEL ADMIN
│   │       ├── components/
│   │       │   ├── Dashboard.jsx
│   │       │   ├── MatchManager.jsx     # Gestión de partidos
│   │       │   ├── LiveInputPanel.jsx   # Carga de stats en vivo
│   │       │   ├── PlayerManager.jsx
│   │       │   └── SponsorManager.jsx
│   │       └── index.jsx
│   │
│   └── styles/
│       ├── index.css
│       └── belgrano.css         # Variables CSS del club
```

### 5.2 Variables CSS del Club (belgrano.css)

```css
/* client/src/styles/belgrano.css */
:root {
  --club-primary: #003087;      /* Azul Belgrano */
  --club-secondary: #FFFFFF;    /* Blanco */
  --club-accent: #FFD700;       /* Dorado */
  --club-dark: #0A0A0A;         /* Fondo oscuro tipo Baronissi */
  --club-surface: #111827;      /* Cards oscuras */
  --club-border: #1F2937;       /* Bordes sutiles */
  --club-text: #F9FAFB;         /* Texto principal */
  --club-muted: #6B7280;        /* Texto secundario */
  --live-green: #10B981;        /* Indicador "EN VIVO" */
  --font-display: 'Bebas Neue', sans-serif;  /* Títulos sport */
  --font-body: 'Inter', sans-serif;
}
```

### 5.3 Tailwind Config (tema Belgrano)

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{jsx,js}'],
  theme: {
    extend: {
      colors: {
        'club-primary': '#003087',
        'club-accent': '#FFD700',
        'club-dark': '#0A0A0A',
        'club-surface': '#111827',
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'pulse-live': 'pulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      }
    }
  }
}
```

---

## 6. DISEÑO UI — INSPIRADO EN BARONISSI

### 6.1 Páginas y Secciones

#### HOME (`/`)
```
┌─────────────────────────────────────────┐
│  NAV: Logo | Fixture | Plantel | Stats  │
│           | Galería | Tienda           │
├─────────────────────────────────────────┤
│  HERO (full-screen, fondo oscuro)       │
│  "BELGRANO" en Bebas Neue gigante       │
│  Scroll animado: "EL PATRIOTA ★ 1906"  │
│  Marquee: "LIGA FEDERAL 2025 ★ ..."    │
├──────────────┬──────────────────────────┤
│ ÚLTIMO        │    PRÓXIMO PARTIDO      │
│ RESULTADO     │    Countdown timer      │
│ Belgrano 81   │    🏀 vs San Martín    │
│ Bochas 72     │    Sáb 10/05 - 21:00   │
├──────────────┴──────────────────────────┤
│  FIXTURE STRIP (scroll horizontal)      │
│  [May 10] [May 17] [May 24] [Jun 1]... │
├─────────────────────────────────────────┤
│  "DESDE 1906, SOMOS EL PATRIOTA"        │
│  Texto + imágenes del equipo            │
├─────────────────────────────────────────┤
│  SPONSORS (marquee logos)               │
├─────────────────────────────────────────┤
│  FOOTER + CONTACTO                      │
└─────────────────────────────────────────┘
```

#### MATCH CENTER LIVE (`/live/:id`)
```
┌─────────────────────────────────────────┐
│  ● EN VIVO    Liga Federal 2025 — C1   │
├─────────────┬──────────┬───────────────┤
│  BELGRANO   │  72–68   │  RIVAL        │
│  Logo azul  │  Q3 8:24 │  Logo rival  │
├─────────────┴──────────┴───────────────┤
│  PARCIALES: Q1:18-15 Q2:38-34 Q3:16-19│
├─────────────────────────────────────────┤
│  BOX SCORE                              │
│  # | Jugador    | PTS | REB | AST | ... │
│  7 | Albornoz   │ 18  │ 12  │  2  │ ...│
│  4 | Maróstica  │ 14  │  3  │  5  │ ...│
└─────────────────────────────────────────┘
```

#### PLANTEL (`/plantel`) — Our Family
```
┌─────────────────────────────────────────┐
│  NUESTRA FAMILIA                        │
│  Temporada 2025                         │
├─────────────────────────────────────────┤
│  [Plantel Principal] [Juveniles]        │
├─────────────────────────────────────────┤
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐          │
│  │ 10 │ │  7 │ │ 23 │ │  4 │          │
│  │Foto│ │Foto│ │Foto│ │Foto│          │
│  │Alb.│ │Ger.│ │Vig.│ │Mar.│          │
│  │PVT │ │ALE │ │ALE │ │ESC │          │
│  └────┘ └────┘ └────┘ └────┘          │
├─────────────────────────────────────────┤
│  CUERPO TÉCNICO                         │
│  DT: Hugo Angelicola                   │
│  Asistente: Luciano Saran              │
│  Prep. Físico: Ariel Abregú            │
└─────────────────────────────────────────┘
```

---

## 7. SEGURIDAD

### 7.1 Roles y Permisos

| Rol | Descripción | Permisos |
|-----|-------------|----------|
| `ADMIN` | Administrador total | CRUD completo, gestión usuarios, reportes |
| `STAFF` | Cuerpo técnico | Cargar stats en vivo, gestionar plantel |
| `SOCIO` | Socio activo | Ver stats privadas, acceder QR |
| `PUBLIC` | Visitante sin cuenta | Ver info pública |

### 7.2 Middleware Auth

```javascript
// server/src/core/middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../../features/auth/models/User.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Authentication required' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) return res.status(401).json({ error: 'User not found' });
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

```javascript
// server/src/core/middleware/roles.js
export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }
  next();
};

// Ejemplo de uso:
router.put('/matches/:id/score',
  authenticate,
  authorize('ADMIN', 'STAFF'),
  updateMatchScore
);
```

### 7.3 Validación QR

```javascript
// server/src/features/membership/services/membershipService.js
export const validateQR = async (qrToken, matchId, validatedBy) => {
  const membership = await Membership.findOne({
    qrToken,
    status: 'ACTIVE',
    endDate: { $gte: new Date() }
  });

  if (!membership) throw new Error('QR inválido o vencido');

  const alreadyUsed = membership.accessHistory.some(
    entry => entry.match.toString() === matchId
  );
  if (alreadyUsed) throw new Error('QR ya utilizado para este partido');

  membership.accessHistory.push({ match: matchId, entryTime: new Date(), validatedBy });
  await membership.save();
  return membership;
};
```

---

## 8. WEBSOCKETS — MATCH CENTER

### 8.1 Configuración Socket.io

```javascript
// server/src/sockets/socketManager.js
import { Server } from 'socket.io';

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: process.env.CLIENT_URL, methods: ['GET', 'POST'] }
  });

  const matchNS = io.of('/match');

  matchNS.on('connection', (socket) => {
    socket.on('join-match', (matchId) => socket.join(`match-${matchId}`));
    socket.on('leave-match', (matchId) => socket.leave(`match-${matchId}`));

    // Admin/Staff actualiza score → todos los clientes reciben
    socket.on('update-score', async ({ matchId, score, quarter, quarterTime }) => {
      matchNS.to(`match-${matchId}`).emit('score-update', {
        score, quarter, quarterTime, timestamp: new Date()
      });
    });

    // Admin/Staff actualiza box score individual
    socket.on('update-player-stat', ({ matchId, playerId, stat, value }) => {
      matchNS.to(`match-${matchId}`).emit('player-stat-update', {
        playerId, stat, value, timestamp: new Date()
      });
    });
  });

  return io;
};
```

### 8.2 Hook Frontend (useLiveMatch.js)

```javascript
// client/src/features/liveMatch/hooks/useLiveMatch.js
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const useLiveMatch = (matchId) => {
  const [score, setScore] = useState({ home: 0, away: 0, quarter: 0 });
  const [boxScore, setBoxScore] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_API_URL}/match`);

    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('join-match', matchId);
    });

    socket.on('score-update', (data) => setScore(data.score));

    socket.on('player-stat-update', ({ playerId, stat, value }) => {
      setBoxScore(prev => prev.map(p =>
        p.playerId === playerId ? { ...p, [stat]: value } : p
      ));
    });

    return () => {
      socket.emit('leave-match', matchId);
      socket.disconnect();
    };
  }, [matchId]);

  return { score, boxScore, isConnected };
};
```

---

## 9. RESPONSIVE MOBILE-FIRST

### 9.1 Breakpoints

```javascript
// Estrategia Mobile-First (375px base)
// sm: 640px | md: 768px | lg: 1024px | xl: 1280px

// Ejemplo: Grilla de jugadores
// Mobile: 2 columnas
// Tablet: 3 columnas
// Desktop: 4-5 columnas

<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
  {players.map(p => <PlayerCard key={p._id} player={p} />)}
</div>
```

### 9.2 Nav Mobile

```jsx
// Hamburger menu en mobile, navbar horizontal en desktop
// Igual al comportamiento de Baronissi Sports Club
<nav className="fixed top-0 w-full z-50 bg-club-dark/90 backdrop-blur">
  <div className="flex items-center justify-between px-4 py-3">
    <Logo />
    {/* Desktop */}
    <ul className="hidden md:flex gap-8 text-sm font-display tracking-widest">
      <NavLink to="/fixture">FIXTURE</NavLink>
      <NavLink to="/plantel">PLANTEL</NavLink>
      <NavLink to="/estadisticas">STATS</NavLink>
      <NavLink to="/galeria">GALERÍA</NavLink>
      <NavLink to="/tienda">TIENDA</NavLink>
    </ul>
    {/* Mobile hamburger */}
    <HamburgerButton className="md:hidden" />
  </div>
  <MobileDrawer />
</nav>
```

---

## 10. SEEDERS — DATOS REALES

### 10.1 seedClub.js

```javascript
// server/src/seeders/seedClub.js
import Club from '../features/club/models/Club.js';

export const seedClub = async () => {
  await Club.deleteMany({});
  await Club.create({
    name: 'Club Belgrano Cultural y Deportivo',
    shortName: 'Belgrano CyD',
    nickname: 'El Patriota',
    foundedYear: 1906,
    primaryColor: '#003087',
    secondaryColor: '#FFFFFF',
    accentColor: '#FFD700',
    venue: 'Estadio Julio César Figueroa',
    location: {
      city: 'San Miguel de Tucumán',
      province: 'Tucumán',
      country: 'Argentina'
    },
    socialMedia: {
      facebook: 'BelgranoCyDPrensaOficial',
      instagram: '@belgrano_cyd'
    }
  });
  console.log('✅ Club Belgrano CyD seeded');
};
```

### 10.2 seedPlayers.js

```javascript
// server/src/seeders/seedPlayers.js
import Player from '../features/players/models/Player.js';

const PLANTEL_2025 = [
  { name: 'Iván', lastName: 'Albornoz', position: 'PIVOT', isCaptain: true, number: 10, origin: 'Rosario de la Frontera, Salta' },
  { name: 'Juan Cruz', lastName: 'Rodríguez', position: 'ALERO', number: 7 },
  { name: 'Luciano', lastName: 'Maróstica', position: 'ESCOLTA', number: 4 },
  { name: 'Tomás', lastName: 'Monteros', position: 'BASE', number: 5 },
  { name: 'Juan Pablo', lastName: 'Vigiani', position: 'ALERO', number: 23 },
  { name: 'Nataniel', lastName: 'Rodríguez', position: 'ALA-PIVOT', number: 14, origin: 'Chaco' },
  { name: 'Matías', lastName: 'Nuñez', position: 'ESCOLTA', number: 3, origin: 'Chaco' },
  { name: 'Gonzalo', lastName: 'Gerez', position: 'ALERO', number: 11, origin: 'Charata, Chaco' },
  { name: 'Lucca', lastName: 'Theiler', position: 'BASE', number: 0, isU21: true, origin: 'Santa Fe' },
  { name: 'Bautista', lastName: 'Casares', position: 'ALERO', number: 15, isJuvenil: true },
  { name: 'Mauro', lastName: 'Ponce', position: 'BASE', number: 6, isJuvenil: true },
  { name: 'Juan Cruz', lastName: 'Villarreal', position: 'ESCOLTA', number: 8, isJuvenil: true },
  { name: 'Benjamín', lastName: 'Trejo', position: 'ALA-PIVOT', number: 12, isJuvenil: true },
  { name: 'Armando', lastName: 'Simón', position: 'PIVOT', number: 21, isJuvenil: true }
];

export const seedPlayers = async () => {
  await Player.deleteMany({});
  await Player.insertMany(PLANTEL_2025.map(p => ({ ...p, status: 'ACTIVE', dni: `SEED-${Math.random().toString(36).slice(2)}` })));
  console.log(`✅ ${PLANTEL_2025.length} jugadores seeded`);
};
```

---

## 11. VARIABLES DE ENTORNO

```env
# server/.env.example

# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/belgrano-cyd

# JWT
JWT_SECRET=belgrano_patriota_secret_2025
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=belgrano_refresh_secret
JWT_REFRESH_EXPIRES_IN=30d

# Client
CLIENT_URL=http://localhost:5173

# QR
QR_SECRET=qr_belgrano_secret

# Uploads (Cloudinary)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Admin default (solo setup inicial)
ADMIN_EMAIL=admin@belgrano-cyd.com
ADMIN_PASSWORD=belgrano2025!
```

```env
# client/.env.example
VITE_API_URL=http://localhost:5000/api/v1
VITE_SOCKET_URL=http://localhost:5000
VITE_CLUB_NAME=Belgrano CyD
VITE_CLUB_PRIMARY_COLOR=#003087
```

---

## 12. PLAN DE IMPLEMENTACIÓN (3 FASES)

### FASE 1 — BLUEPRINT ✅
- [x] Arquitectura de datos completa con datos reales
- [x] Definición de endpoints
- [x] Estrategia de seguridad
- [x] Estructura de carpetas
- [x] Diseño UI basado en Baronissi Sports Club
- [x] Variables de entorno

### FASE 2 — CORE (Backend + Frontend Base)
- [ ] Setup servidor Express + Mongoose + Socket.io
- [ ] Implementar todos los modelos
- [ ] Crear seeders con datos reales del plantel 2025
- [ ] Controllers, Services, Repositories
- [ ] Auth JWT completo
- [ ] Frontend: Layout + Nav + Home con datos reales
- [ ] Frontend: Plantel (`/plantel`) con jugadores seed
- [ ] Frontend: Fixture (`/fixture`) con partidos

### FASE 3 — FEATURES AVANZADAS
- [ ] Match Center en vivo (Socket.io)
- [ ] Panel admin: carga de stats en vivo
- [ ] Sistema QR socios (generar + escanear)
- [ ] Galería multimedia (Cloudinary)
- [ ] Tienda online
- [ ] Tabla de posiciones Liga Federal
- [ ] Estadísticas avanzadas + leaderboards
- [ ] Deploy: Railway (backend) + Vercel (frontend)

---

## 13. BOILERPLATE — PUNTO DE PARTIDA

### server/src/app.js

```javascript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createServer } from 'http';
import dotenv from 'dotenv';

import connectDB from './config/database.js';
import { initializeSocket } from './sockets/socketManager.js';
import { errorHandler, notFound } from './core/middleware/errorHandler.js';

// Routes
import authRoutes from './features/auth/routes/authRoutes.js';
import clubRoutes from './features/club/routes/clubRoutes.js';
import playerRoutes from './features/players/routes/playerRoutes.js';
import matchRoutes from './features/matches/routes/matchRoutes.js';
import competitionRoutes from './features/competitions/routes/competitionRoutes.js';
import teamRoutes from './features/teams/routes/teamRoutes.js';
import staffRoutes from './features/staff/routes/staffRoutes.js';
import sponsorRoutes from './features/sponsors/routes/sponsorRoutes.js';
import membershipRoutes from './features/membership/routes/membershipRoutes.js';
import statRoutes from './features/stats/routes/statRoutes.js';
import galleryRoutes from './features/gallery/routes/galleryRoutes.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (_, res) => res.json({
  status: 'OK',
  club: 'Belgrano CyD — El Patriota',
  timestamp: new Date()
}));

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/club', clubRoutes);
app.use('/api/v1/players', playerRoutes);
app.use('/api/v1/matches', matchRoutes);
app.use('/api/v1/competitions', competitionRoutes);
app.use('/api/v1/teams', teamRoutes);
app.use('/api/v1/staff', staffRoutes);
app.use('/api/v1/sponsors', sponsorRoutes);
app.use('/api/v1/membership', membershipRoutes);
app.use('/api/v1/stats', statRoutes);
app.use('/api/v1/gallery', galleryRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start
const startServer = async () => {
  try {
    await connectDB();
    const io = initializeSocket(httpServer);
    app.set('io', io); // disponible en controllers
    httpServer.listen(PORT, () => {
      console.log(`🏀 Belgrano CyD API — Puerto ${PORT}`);
      console.log(`🔌 Socket.io activo`);
    });
  } catch (error) {
    console.error('Error iniciando servidor:', error);
    process.exit(1);
  }
};

startServer();
export default app;
```

---

> **Nota:** Este documento es un living document. Los datos del plantel y resultados corresponden a la temporada 2025 de la Liga Federal. Actualizar con datos de la temporada en curso.
>
> **Fuentes:** CAB (argentina.basketball) · La Gaceta Tucumán · Facebook oficial BelgranoCyDPrensaOficial
