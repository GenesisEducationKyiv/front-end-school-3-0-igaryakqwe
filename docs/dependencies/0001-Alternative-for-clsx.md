# 0001 Alternative for clsx

## Reason

I've checked all the dependencies in `package.json` via `Snyk Advisor` and it showed that `clsx` has 70/100 package health score.
As I looked at Github, I found out that `clsx` isn't maintained for at least 1 year which may lead to security issues.

## Decision

I've decided to use `classnames` instead of `clsx` which works the same way but has higher package health score.

## Package checking

1. After installing `classnames` tested it with `pnpm audit` and it showed no issues.

2. Checked `classnames` on `Snyk Advisor` and it showed 84/100 package health score.

3. Checked `classnames` on `Github`:
   - last update was 2 moths ago which is better than `clsx`, but maybe it will be the reason to find another alternative
   - there's `Dependabot` in CI which minimizes the risk of security issues.
   - more active community (45 contributors), 17.7k stars, more than 500 forks which is much better than `clsx`
