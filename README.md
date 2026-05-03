# PropLead AI – Real Estate Lead Management System

**Advance Web Technologies | Lab Mid Project**
Submitted by: Mamoon Tahir (FA23-BSE-051) & Talal Nasir (FA23-BSE-079)
Section: BSE-6B | Instructor: Ms. Saadia Maqbool

---

## Setup & Run

```bash
npm install
npm run dev       # development (nodemon)
npm start         # production
```

Server runs at: `http://localhost:3000`

---

## Project Structure

```
proplead-ai/
├── src/
│   ├── server.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── lead.controller.js
│   │   ├── scoring.controller.js
│   │   ├── messaging.controller.js
│   │   ├── dashboard.controller.js
│   │   ├── property.controller.js      ← Extra Actor Module
│   │   └── appointment.controller.js   ← Extra Actor Module
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── lead.routes.js
│   │   └── other.routes.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── validation.middleware.js
│   │   └── error.middleware.js
│   ├── models/
│   │   └── db.js                       ← In-memory DB
│   └── utils/
│       └── scoring.js
└── package.json
```

---

## API Endpoints

### 🔐 Auth Module — /api/auth
| Method | Route | Auth | Body |
|--------|-------|------|------|
| POST | /api/auth/register | No | name, email, password |
| POST | /api/auth/login | No | email, password |

### 👤 User Module — /api/users
| Method | Route | Auth |
|--------|-------|------|
| GET | /api/users/me | JWT |

### 📋 Lead Module — /api/leads
| Method | Route | Auth | Notes |
|--------|-------|------|-------|
| POST | /api/leads | JWT | Creates lead + auto scores |
| GET | /api/leads | JWT | ?filter=hot/warm/cold |
| PUT | /api/leads/:id | JWT | Updates & recalculates score |
| DELETE | /api/leads/:id | JWT | |

### 🧮 Scoring Module — /api/scoring
| Method | Route | Auth |
|--------|-------|------|
| POST | /api/scoring/:leadId | JWT |

### 💬 Messaging Module — /api/messages
| Method | Route | Auth | Body |
|--------|-------|------|------|
| POST | /api/messages | JWT | leadId, message |
| GET | /api/messages/:leadId | JWT | |

### 📊 Dashboard Module — /api/dashboard
| Method | Route | Auth |
|--------|-------|------|
| GET | /api/dashboard | JWT |

### 🏠 Property Module — /api/properties (Extra Actor)
| Method | Route | Auth | Body/Params |
|--------|-------|------|-------------|
| POST | /api/properties | JWT | title, location, price, type |
| GET | /api/properties | JWT | ?type=&status= |
| GET | /api/properties/:id | JWT | |
| PUT | /api/properties/:id | JWT | |
| DELETE | /api/properties/:id | JWT | |

### 📅 Appointment Module — /api/appointments (Extra Actor)
| Method | Route | Auth | Body |
|--------|-------|------|------|
| POST | /api/appointments | JWT | leadId, propertyId, date, timeSlot |
| GET | /api/appointments | JWT | |
| PUT | /api/appointments/:id/status | JWT | status |
| DELETE | /api/appointments/:id | JWT | |

---

## Middleware
1. **Auth Middleware** – JWT token verification on protected routes
2. **Validation Middleware** – Required field checking
3. **Logging Middleware** – Logs method + route with timestamp
4. **Error Handling Middleware** – Centralized standard error format
5. **Rate Limiting** – 100 requests per 15 min window

## Scoring Algorithm
| Factor | Points |
|--------|--------|
| Budget ≥ 5M | 40 |
| Budget ≥ 2M | 25 |
| Budget ≥ 500K | 10 |
| Premium location (DHA, Bahria, etc.) | 30 |
| Other location | 10 |
| Urgent interest keyword | 30 |
| Other interest | 15 |
| **Max Score** | **100** |

Score ≥ 70 → **Hot Lead** | 40–69 → **Warm** | < 40 → **Cold**

---

## Error Format (Standard)
```json
{
  "error": {
    "code": 400,
    "message": "Bad Request",
    "details": "Optional details"
  }
}
```
