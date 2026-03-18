# TARIC AI - Product Requirements Document

## Descripción Original del Proyecto
Aplicación SaaS donde se pueda leer el TARIC y con inteligencia artificial se pueda colocar simplemente una palabra del TARIC de mi producto y se pueda sacar la nomenclatura arancelaria con sitios oficiales del TARIC español o de la Unión Europea. Adicional a eso, un portal donde le bote de una vez los aranceles, todos los tributos y los documentos que necesita fitosanitarios y no fitosanitarios para poder traer ese producto, todo en un solo lugar y sacado de sitios oficiales de España y de la Unión Europea.

---

## Estado Actual: MVP + Funcionalidades B2B Completadas

### ✅ Funcionalidades Implementadas

#### 1. Core - Clasificación TARIC con IA (MVP)
- [x] Búsqueda de productos con descripción en lenguaje natural
- [x] Clasificación automática con código TARIC de 10 dígitos
- [x] Análisis con GPT-5.2 via emergentintegrations
- [x] Nivel de confianza de la IA

#### 2. Origen y Destino OBLIGATORIOS (NEW)
- [x] Selector de país de origen obligatorio
- [x] Selector de país de destino obligatorio
- [x] Lista completa de TODOS los países del mundo (200+)
- [x] Países organizados por región (UE, Europa, Norteamérica, Sudamérica, Asia, África, Oceanía)
- [x] Banderas de países en los selectores
- [x] Validación en frontend (botón deshabilitado sin origen/destino)
- [x] Validación en backend (HTTP 400/422 si faltan)

#### 3. Tratados Comerciales (NEW)
- [x] Base de datos de tratados comerciales UE con terceros países
- [x] Detección automática de acuerdos aplicables entre origen y destino
- [x] Panel de tratados comerciales en resultados
- [x] Tasas preferenciales según tratado vigente
- [x] Documentos requeridos para preferencia (EUR.1, declaración de origen, etc.)
- [x] Enlaces a fuentes oficiales de cada acuerdo (ec.europa.eu)
- [x] Tratados incluidos:
  - UE-Chile, UE-México, CETA (Canadá), UE-Japón
  - UE-Corea del Sur, UE-Singapur, UE-Vietnam
  - UE-Reino Unido (TCA), UE-Suiza, EEE (Noruega, Islandia)
  - Acuerdos Mediterráneos (Marruecos, Túnez, Egipto, Israel, Turquía)
  - UE-Perú/Colombia/Ecuador, UE-Centroamérica
  - SPG, SPG+, EBA (Países menos adelantados)

#### 4. Sistema de Internacionalización (i18n) (NEW)
- [x] Selector de idioma en header
- [x] 5 idiomas soportados: Español, English, Português, Français, Deutsch
- [x] Traducciones completas para:
  - Navegación
  - Dashboard
  - Resultados de búsqueda
  - Panel de tratados
  - Documentos
  - Alertas
  - Gestión de equipo
  - Mensajes de error
- [x] Persistencia de preferencia en localStorage

#### 5. Aranceles y Tributos
- [x] Desglose completo de aranceles (NMF, preferenciales)
- [x] IVA de importación (21% España)
- [x] Derechos anti-dumping cuando aplican
- [x] Base legal de cada tributo

#### 6. Documentación Requerida
- [x] Lista de documentos obligatorios y opcionales
- [x] Tipos: Fitosanitario, Sanitario, Aduanero, CITES
- [x] Autoridad emisora
- [x] Tiempo de tramitación
- [x] Validez del documento
- [x] Enlaces a portales de tramitación online
- [x] ~~Enlaces a PDFs de formularios~~ (ELIMINADO por solicitud del usuario)

#### 7. Alertas de Compliance
- [x] Detección de restricciones
- [x] Alertas anti-dumping
- [x] Sanciones comerciales
- [x] Severidad: Alta, Media, Baja
- [x] Referencia oficial

#### 8. Fuentes Oficiales
- [x] TARIC - Comisión Europea
- [x] **Access2Markets** - Portal oficial UE (NEW)
- [x] Agencia Tributaria (AEAT)
- [x] EUR-Lex
- [x] MAPA (Control Fitosanitario)

#### 9. Suite B2B
- [x] Autenticación JWT
- [x] Organizaciones
- [x] Gestión de equipos (Admin, Operador, Consultor)
- [x] Invitación de miembros
- [x] Historial de clasificaciones
- [x] Referencia de cliente (tracking B2B)
- [x] Estadísticas de uso

#### 10. Panel de Alertas Regulatorias
- [x] Notificaciones de cambios normativos
- [x] Nuevos aranceles anti-dumping
- [x] Actualizaciones TARIC

#### 11. UI/UX
- [x] Diseño futurista oscuro (cyberpunk)
- [x] Responsive design
- [x] Animaciones con Framer Motion
- [x] Componentes Shadcn/UI
- [x] Toast notifications (Sonner)

---

## ❌ Funcionalidades ELIMINADAS

### Descarga de PDFs
- Eliminados botones de "Descargar PDF" en DocumentChecklist
- Eliminados enlaces directos a formularios PDF
- Motivo: Los PDFs de fuentes oficiales cambian frecuentemente y generaban errores 404

---

## Stack Tecnológico

### Backend
- **Framework**: FastAPI
- **Base de datos**: MongoDB
- **Autenticación**: JWT
- **IA**: OpenAI GPT-5.2 via emergentintegrations

### Frontend
- **Framework**: React 18
- **Estilos**: Tailwind CSS
- **Componentes**: Shadcn/UI
- **Animaciones**: Framer Motion
- **Routing**: react-router-dom
- **HTTP Client**: Axios

### Integraciones
- **emergentintegrations**: Acceso a GPT-5.2 con Emergent LLM Key

---

## Estructura de Archivos Principal

```
/app/
├── backend/
│   ├── server.py                    # FastAPI app principal
│   ├── documents_database.py        # Base de datos de documentos
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                  # Shadcn components
│   │   │   ├── DocumentChecklist.jsx
│   │   │   ├── DutyCalculatorCard.jsx
│   │   │   ├── ComplianceAlerts.jsx
│   │   │   ├── RegulatoryAlertsPanel.jsx
│   │   │   ├── TradeAgreementsPanel.jsx  # NEW
│   │   │   ├── LanguageSelector.jsx      # NEW
│   │   │   └── TaricCodeDisplay.jsx
│   │   ├── config/
│   │   │   ├── countries.js              # NEW - Lista países
│   │   │   ├── tradeAgreements.js        # NEW - Tratados comerciales
│   │   │   └── i18n.js                   # NEW - Traducciones
│   │   ├── contexts/
│   │   │   └── LanguageContext.jsx       # NEW
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   └── SearchResultPage.jsx
│   │   └── App.js
│   └── package.json
└── memory/
    └── PRD.md
```

---

## Endpoints API Principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /api/auth/register | Registro de usuario |
| POST | /api/auth/login | Login (retorna JWT) |
| POST | /api/taric/search | Búsqueda TARIC con IA (requiere origin_country, destination_country) |
| GET | /api/taric/result/{id} | Obtener resultado por ID |
| GET | /api/taric/history | Historial del usuario |
| DELETE | /api/taric/history/{id} | Eliminar del historial |
| GET | /api/organization/team | Miembros del equipo |
| POST | /api/team/invite | Invitar miembro |
| DELETE | /api/team/members/{id} | Eliminar miembro |
| GET | /api/regulatory/alerts | Alertas regulatorias |
| GET | /api/documents/library | Biblioteca de documentos |

---

## Tareas Pendientes

### P1 - Alta Prioridad
- [ ] Traducir labels de stats cards según idioma
- [ ] Añadir más tratados comerciales (ej: UE-Nueva Zelanda)
- [ ] Implementar filtros avanzados en historial

### P2 - Media Prioridad
- [ ] Notificaciones por email de alertas regulatorias
- [ ] Generador automático de checklists pre-llenados
- [ ] Dashboard con gráficos de uso mensual

### P3 - Backlog
- [ ] Integración con sistemas ERP
- [ ] API pública para terceros
- [ ] App móvil

---

## Credenciales de Prueba
- **Email**: demo2024@test.com
- **Password**: Test123!

---

## Última Actualización
**Fecha**: 2025-12-18
**Versión**: 2.0.0

**Cambios recientes**:
- Añadidos campos obligatorios origen/destino
- Implementado sistema de tratados comerciales
- Añadido selector de idioma (5 idiomas)
- Eliminada funcionalidad de descarga PDF
- Añadido Access2Markets a fuentes oficiales
- Lista completa de países del mundo por regiones
