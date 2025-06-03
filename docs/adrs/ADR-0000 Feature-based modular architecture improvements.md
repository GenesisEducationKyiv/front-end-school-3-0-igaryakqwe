# ADR-0000 Feature-based modular architecture improvements

The project uses `feature-based modular architecture`. The idea of this architecture is to separate the code into modules/features, and keep the files related to the same entity as close as possible. But, now we have an issue that `api` folder which related to `tracks` and `genres` placed in the src folder.
It makes it hard to navigate between the files during the work on this feature.

## Decision
We decided to move the `api`(tracks and genres) folder to the `features/tracks` folder. Here's the new example of the folder structure:

### Before

```
.
└── src/
    ├── api/
    │   ├── dto/
    │   │   └── tracks.dto.ts
    │   ├── genres.api.ts
    │   └── tracks.api.ts
    ├── ...other folders
    └── features/
        └── tracks/
            ├── components
            ├── hooks
            └── tracks.page.tsx
```

### After

```
.
└── src/
    ├── api/
    │   └──...global api logic
    ├──...other folders
    └── features/
        └── tracks/
            ├── api/
            │   ├── dto/
            │   │   └── tracks.dto.ts
            │   ├── genres.api.ts
            │   └── tracks.api.ts
            ├── components
            ├── hooks
            └── tracks.page.tsx
```

## Rationale
This will make it easier to navigate between the files during the work on this feature. We keep `api` folder in the root folder for global API logic, e.g. authentication.

## Status
Proposed

## Consequences
- Better code organization - Maintainability
- Easier to navigate between the files during the work on this feature - Productivity
- Increased refactoring effort if tracks API needs to be shared with other features in the future