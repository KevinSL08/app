# TaricAI - Product Requirements Document

## Original Problem Statement
Crear una aplicación SaaS donde se pueda leer el TARIC y con inteligencia artificial se pueda colocar simplemente una palabra del TARIC de mi producto y se pueda sacar la nomenclatura arancelaria con sitios oficiales del TARIC español o de la Unión Europea. Adicional a eso, créale el portal donde le bote de una vez los aranceles, todos los tributos y los documentos que necesita para poder traer ese producto, todo en un solo lugar y sacado de sitios oficiales de España y de la unión europea.

## Target Users
- Agencias de aduanas
- Importadores/Exportadores
- Empresas B2B de comercio internacional

## Tech Stack
- **Backend**: FastAPI, Python, MongoDB
- **Frontend**: React, Tailwind CSS, Shadcn/UI
- **AI**: emergentintegrations (GPT-5.2 para texto y visión)
- **Auth**: JWT tokens

---

## Implementation Status

### Phase 1: MVP ✅ COMPLETED
- User authentication (register/login/JWT)
- Basic TARIC search with AI
- Official sources integration
- Tariffs and document checklist

### Phase 2: B2B Features ✅ COMPLETED
- Organization/Team management
- Search history per organization
- Client reference tracking
- Trade agreements detection

### Phase 3: Advanced AI Features ✅ COMPLETED
- **Image Classification**: Upload product photo → AI describes → Classify
- **Market Study with PESTEL**: Generate professional market reports, downloadable as PDF
- **AI Clarification Questions**: If description is vague, AI asks BEFORE classification
- **Internationalization (i18n)**: 5 languages (ES, EN, PT, FR, DE)
- **Country Selector with Search**: Searchable dropdown for better UX

### Phase 4: Multi-Language Expansion ✅ COMPLETED (Dec 19, 2025)
- **Expanded Language Support**: 38+ languages including:
  - All EU languages (24 official languages)
  - Major world languages (Chinese, Japanese, Korean, Arabic, etc.)
- **Multi-language AI Responses**:
  - Image classification responds in selected language
  - Market study responds in selected language
- **Improved Language Selector**:
  - Searchable dropdown with scroll
  - Languages grouped by region (Europe, Asia, Middle East, etc.)

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### TARIC Classification
- `POST /api/taric/search` - Main classification (requires origin/destination)
- `POST /api/taric/check-clarification` - Pre-check if description needs clarification
- `GET /api/taric/history` - Get search history
- `GET /api/taric/result/{id}` - Get specific result
- `DELETE /api/taric/history/{id}` - Delete from history

### Advanced Features
- `POST /api/image/analyze` - Analyze product image (accepts `language` parameter)
- `POST /api/market/study` - Generate PESTEL market study (accepts `language` parameter)

### Team Management
- `GET /api/team/members` - List team members
- `POST /api/team/invite` - Invite new member
- `DELETE /api/team/members/{id}` - Remove member
- `GET /api/team/stats` - Organization statistics

---

## Key Files
- `/app/backend/server.py` - All backend logic, LANGUAGE_NAMES dict for 38+ languages
- `/app/frontend/src/pages/DashboardPage.jsx` - Main dashboard
- `/app/frontend/src/components/ImageClassifier.jsx` - Image upload with language support
- `/app/frontend/src/components/MarketStudyPanel.jsx` - PESTEL reports with language support
- `/app/frontend/src/components/LanguageSelector.jsx` - Searchable language dropdown
- `/app/frontend/src/config/i18n.js` - 38+ languages (ES, EN, PT, FR, DE, IT, NL, PL, RO, EL, CS, HU, SV, DA, FI, SK, BG, HR, SL, ET, LV, LT, MT, GA, RU, UK, TR, SR, NO, IS, AR, ZH, JA, KO, HI, VI, TH, ID, MS)

---

## Supported Languages (38+)

### European Languages
ES (Español), EN (English), PT (Português), FR (Français), DE (Deutsch), IT (Italiano), NL (Nederlands), PL (Polski), RO (Română), EL (Ελληνικά), CS (Čeština), HU (Magyar), SV (Svenska), DA (Dansk), FI (Suomi), SK (Slovenčina), BG (Български), HR (Hrvatski), SL (Slovenščina), ET (Eesti), LV (Latviešu), LT (Lietuvių), MT (Malti), GA (Gaeilge), UK (Українська), SR (Српски), NO (Norsk), IS (Íslenska)

### Eurasian & Middle East
RU (Русский), TR (Türkçe), AR (العربية)

### Asian Languages
ZH (中文), JA (日本語), KO (한국어), HI (हिन्दी), VI (Tiếng Việt), TH (ไทย), ID (Bahasa Indonesia), MS (Bahasa Melayu)

---

## Testing
- Backend tests: `/app/backend/tests/`
- Test reports: `/app/test_reports/`
- Test credentials: `test@test.com` / `Test123!`

---

## Future Tasks (Backlog)

### P0 - Email Notifications (Next)
- Product alert subscriptions
- Regulatory change notifications
- Automatic alerts for tariff changes

### P1 - High Priority
- Monthly usage dashboard with graphs
- Export search history to Excel/CSV
- Batch classification (multiple products)

### P2 - Medium Priority
- ERP system integration
- Automatic checklist generator for forms

### P3 - Nice to Have
- Mobile app (React Native)
- AI chatbot for customs questions
- Integration with logistics providers

---

## Important Notes
- Token stored as `taric_token` in localStorage
- Components use `useAuth()` from App.js to get token
- Language stored as `taric_language` in localStorage
- All AI responses respect selected language
