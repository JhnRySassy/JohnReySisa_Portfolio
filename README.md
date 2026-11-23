# John Rey Sisa | Portfolio (React + TypeScript)

    npm install
    npm run dev      # http://localhost:5173
    npm run build

Architecture (OOP):
- src/domain/models.ts   Entity, Profile, Project, SkillGroup, Certificate, Decision... (content as objects)
- src/core/*.ts          Disposable services: ThemeService, Router, SmoothScroller, DesignerCursor, ChatEngine, Revealer
- src/core/Observable.ts Base class; React reads services with useSyncExternalStore (src/hooks.ts)
- src/components/*.tsx   Thin React views over the services and domain objects
