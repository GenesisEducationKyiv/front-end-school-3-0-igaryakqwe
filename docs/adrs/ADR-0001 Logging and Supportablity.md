# ADR-0001 Logging and Supportablity

- The project contains many parts of the code which may fail, e.g. API calls, operations with state, URLs, etc. The project needs to be able to log errors and warnings, which will help to identify the issues and fix them immediately.
- Also, some issues may occur during the building process, e.g. TypeScript errors, ESLint errors, etc. And we mustn't allow to push broken code to production.

## Decision

- We decided to integrate `Sentry` for logging errors and warnings and integrate Slack for notifications.
- We will add new workflow for building project to avoid broken code(with ESlint, Typescript errors) to be pushed to production. Also, we will add previewing workflow which may help reviewers to check UI changes.

## Rationale

- `Sentry` is a tool for logging errors and warnings. It allows to track the issues and fix them immediately. We will use Dependency Injection for logging, so we can easily switch to another logging tool or simply use `console.log` in development mode.
- Building and previewing the project will help to catch the issues during the building process and fix them during development process.

## Status

Proposed

## Consequences

- Improved error tracking and fixing - Supportability
- Preventing broken code to be pushed to production - Reliability
- Easier to debug the issues - Productivity
- Additional infrastructure costs associated with Sentry services and potential premium features
- Additional time to set up the workflows