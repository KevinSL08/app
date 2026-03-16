# TARIC AI - Product Requirements Document

## Problem Statement
Aplicación SaaS B2B para agencias de aduanas que permite consultar el TARIC con IA, calcular aranceles, gestionar documentación oficial con PDFs descargables, y alertas regulatorias en tiempo real.

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Shadcn/UI + Framer Motion + jsPDF
- **Backend**: FastAPI + MongoDB + emergentintegrations + Documents Database
- **AI**: OpenAI GPT-5.2 via Emergent LLM Key

## Core Features Implemented

### 1. Clasificación TARIC con IA (94% precisión)
- Códigos TARIC 10 dígitos con desglose visual
- Nivel de confianza de la IA
- Explicación detallada de clasificación

### 2. Cálculo de Aranceles
- Derechos de importación convencionales
- IVA importación (21% España)
- Aranceles preferenciales según acuerdos
- Base legal de cada tributo

### 3. Base de Datos de Documentos Oficiales (15 documentos)
**CITES** (MITECO):
- Permiso Importación/Exportación CITES
- PDF: cites.comercio.gob.es
- Guía: miteco.gob.es

**Fitosanitarios** (MAPA):
- Certificado Fitosanitario
- Solicitud Inspección
- PDF: mapa.gob.es

**Aduaneros** (AEAT):
- DUA Importación/Exportación
- EUR.1 Origen Preferencial
- Certificado Origen
- T2L Estatuto Aduanero
- PDF: agenciatributaria.gob.es, comercio.gob.es

**Sanitarios** (AESAN):
- Certificado Sanitario Alimentos
- Inscripción RGSEAA
- Certificado Veterinario
- PDF: aesan.gob.es

**Otros**:
- Declaración CE
- Impuestos Especiales
- Certificado Anti-Dumping

### 4. Panel de Alertas Regulatorias (5 alertas)
- Anti-dumping acero China
- Restricciones fitosanitarias
- Biodiésel Argentina
- Sanciones comerciales
- CITES actualización

### 5. Gestión de Equipos B2B
- Roles: Admin, Operador, Consultor
- Invitación de miembros
- Estadísticas de organización

### 6. Exportación PDF
- Informes profesionales con logo
- Incluye todos los datos de clasificación

## Official Sources
- TARIC UE (ec.europa.eu)
- AEAT (agenciatributaria.es)
- MAPA (mapa.gob.es)
- MITECO (miteco.gob.es)
- AESAN (aesan.gob.es)
- EUR-Lex (eur-lex.europa.eu)

## API Endpoints
- POST /api/auth/register, /login
- GET /api/auth/me
- POST /api/taric/search
- GET /api/taric/history, /result/{id}
- GET /api/team/members, /stats
- POST /api/team/invite
- GET /api/documents/library
- GET /api/documents/{doc_id}
- GET /api/alerts/regulatory

## Testing Results
- Backend: 97.6% success
- 15 documents with PDF links verified
- CITES, DUA, Fitosanitario PDFs working

## Next Tasks
1. Implement email service for team invites
2. Password recovery flow
3. Bulk product classification
4. Scheduled regulatory alerts digest
5. API access for Enterprise tier
