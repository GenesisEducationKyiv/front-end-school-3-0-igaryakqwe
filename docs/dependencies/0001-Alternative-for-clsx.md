# 0001 Alternative for clsx

## Reason

I've checked all the dependencies in `package.json` via `Snyk Advisor` and it showed that `clsx` has 70/100 package health score.
As I looked at Github, I found out that `clsx` isn't maintained for at least 1 year which may lead to security issues.

## Decision

I've decided to use `classnames` instead of `clsx` which works the same way but has higher package health score.

## Package checking

- More features
- More popula
