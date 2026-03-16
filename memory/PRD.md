# TARIC AI - Product Requirements Document

## Problem Statement
Crear una aplicación SaaS para consultar el TARIC (Arancel Integrado de las Comunidades Europeas). La aplicación permite buscar productos usando palabras clave y con inteligencia artificial obtener la nomenclatura arancelaria correcta, aranceles, tributos y documentos requeridos (fitosanitarios y no fitosanitarios) para importar productos.

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Shadcn/UI
- **Backend**: FastAPI + MongoDB + emergentintegrations
- **AI**: OpenAI GPT-5.2 via Emergent LLM Key
- **Auth**: JWT-based authentication

## User Personas
1. **Importadores**: Empresas que importan productos a España/UE
2. **Agentes Aduaneros**: Profesionales de despacho aduanero
3. **Empresas de Logística**: Necesitan clasificar productos para sus clientes

## Core Requirements (Static)
- ✅ Búsqueda inteligente de productos con IA
- ✅ Códigos TARIC de 10 dígitos con desglose
- ✅ Cálculo de aranceles y tributos
- ✅ Lista de documentos requeridos (fitosanitarios/no fitosanitarios)
- ✅ Enlaces a fuentes oficiales (TARIC UE, Agencia Tributaria)
- ✅ Historial de búsquedas por usuario
- ✅ Autenticación JWT

## What's Been Implemented (Jan 2026)

### Backend
- User registration/login with JWT
- TARIC search endpoint with AI analysis
- Search history management (CRUD)
- MongoDB integration

### Frontend
- Landing page with hero section
- User registration/login flows
- Dashboard with search functionality
- TARIC code display component (10-digit breakdown)
- Duty calculator card
- Document checklist component
- Search history with delete functionality

## Known Issues
- Emergent LLM Key budget exceeded - user needs to add balance in Profile->Universal Key->Add Balance

## Prioritized Backlog

### P0 (Critical)
- N/A - Core functionality complete

### P1 (High Priority)
- Export results to PDF
- Bulk product search
- Price calculator with product value input

### P2 (Medium Priority)
- Multi-language support (English)
- Save favorite searches
- Compare multiple products side-by-side
- Email notifications for tariff changes

## Next Tasks
1. User adds balance to Universal Key to enable AI searches
2. Test AI search functionality end-to-end
3. Consider implementing PDF export for search results
