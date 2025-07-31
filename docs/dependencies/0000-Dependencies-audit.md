# 0000-Dependencies audit

Date: 15-06-2025

## Results

```bash
┌─────────────────────┬────────────────────────────────────────────────────────┐
│ moderate            │ Vite's server.fs.deny bypassed with /. for files under │
│                     │ project root                                           │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Package             │ vite                                                   │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Vulnerable versions │ >=6.3.0 <=6.3.3                                        │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Patched versions    │ >=6.3.4                                                │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Paths               │ . > @tailwindcss/vite@4.1.4 > vite@6.3.2               │
│                     │                                                        │
│                     │ . > @vitejs/plugin-react-swc@3.9.0 > vite@6.3.2        │
│                     │                                                        │
│                     │ . > vite@6.3.2                                         │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ More info           │ https://github.com/advisories/GHSA-859w-5945-r5v3      │
└─────────────────────┴────────────────────────────────────────────────────────┘
┌─────────────────────┬────────────────────────────────────────────────────────┐
│ low                 │ brace-expansion Regular Expression Denial of Service   │
│                     │ vulnerability                                          │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Package             │ brace-expansion                                        │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Vulnerable versions │ >=1.0.0 <=1.1.11                                       │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Patched versions    │ >=1.1.12                                               │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Paths               │ . > @typescript-eslint/eslint-plugin@8.30.1 >          │
│                     │ @typescript-eslint/parser@8.30.1 > eslint@9.24.0 >     │
│                     │ @eslint/config-array@0.20.0 > minimatch@3.1.2 >        │
│                     │ brace-expansion@1.1.11                                 │
│                     │                                                        │
│                     │ . > @typescript-eslint/eslint-plugin@8.30.1 >          │
│                     │ @typescript-eslint/parser@8.30.1 > eslint@9.24.0 >     │
│                     │ @eslint/eslintrc@3.3.1 > minimatch@3.1.2 >             │
│                     │ brace-expansion@1.1.11                                 │
│                     │                                                        │
│                     │ . > @typescript-eslint/eslint-plugin@8.30.1 >          │
│                     │ @typescript-eslint/parser@8.30.1 > eslint@9.24.0 >     │
│                     │ minimatch@3.1.2 > brace-expansion@1.1.11               │
│                     │                                                        │
│                     │ ... Found 67 paths, run `pnpm why brace-expansion` for │
│                     │ more information                                       │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ More info           │ https://github.com/advisories/GHSA-v6h2-p8h4-qcjw      │
└─────────────────────┴────────────────────────────────────────────────────────┘
┌─────────────────────┬────────────────────────────────────────────────────────┐
│ low                 │ brace-expansion Regular Expression Denial of Service   │
│                     │ vulnerability                                          │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Package             │ brace-expansion                                        │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Vulnerable versions │ >=2.0.0 <=2.0.1                                        │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Patched versions    │ >=2.0.2                                                │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Paths               │ . > @typescript-eslint/eslint-plugin@8.30.1 >          │
│                     │ @typescript-eslint/parser@8.30.1 >                     │
│                     │ @typescript-eslint/typescript-estree@8.30.1 >          │
│                     │ minimatch@9.0.5 > brace-expansion@2.0.1                │
│                     │                                                        │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Package             │ brace-expansion                                        │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Vulnerable versions │ >=2.0.0 <=2.0.1                                        │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Patched versions    │ >=2.0.2                                                │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Paths               │ . > @typescript-eslint/eslint-plugin@8.30.1 >          │
│                     │ @typescript-eslint/parser@8.30.1 >                     │
│                     │ @typescript-eslint/typescript-estree@8.30.1 >          │
│                     │ minimatch@9.0.5 > brace-expansion@2.0.1                │
│                     │                                                        │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Vulnerable versions │ >=2.0.0 <=2.0.1                                        │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Patched versions    │ >=2.0.2                                                │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Paths               │ . > @typescript-eslint/eslint-plugin@8.30.1 >          │
│                     │ @typescript-eslint/parser@8.30.1 >                     │
│                     │ @typescript-eslint/typescript-estree@8.30.1 >          │
│                     │ minimatch@9.0.5 > brace-expansion@2.0.1                │
│                     │                                                        │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Patched versions    │ >=2.0.2                                                │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Paths               │ . > @typescript-eslint/eslint-plugin@8.30.1 >          │
│                     │ @typescript-eslint/parser@8.30.1 >                     │
│                     │ @typescript-eslint/typescript-estree@8.30.1 >          │
│                     │ minimatch@9.0.5 > brace-expansion@2.0.1                │
│                     │                                                        │
│ Patched versions    │ >=2.0.2                                                │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Paths               │ . > @typescript-eslint/eslint-plugin@8.30.1 >          │
│                     │ @typescript-eslint/parser@8.30.1 >                     │
│                     │ @typescript-eslint/typescript-estree@8.30.1 >          │
│                     │ minimatch@9.0.5 > brace-expansion@2.0.1                │
│                     │                                                        │
│ Paths               │ . > @typescript-eslint/eslint-plugin@8.30.1 >          │
│                     │ @typescript-eslint/parser@8.30.1 >                     │
│                     │ @typescript-eslint/typescript-estree@8.30.1 >          │
│                     │ minimatch@9.0.5 > brace-expansion@2.0.1                │
│                     │                                                        │
│                     │ @typescript-eslint/parser@8.30.1 >                     │
│                     │ @typescript-eslint/typescript-estree@8.30.1 >          │
│                     │ minimatch@9.0.5 > brace-expansion@2.0.1                │
│                     │                                                        │
│                     │ @typescript-eslint/typescript-estree@8.30.1 >          │
│                     │ minimatch@9.0.5 > brace-expansion@2.0.1                │
│                     │                                                        │
│                     │ minimatch@9.0.5 > brace-expansion@2.0.1                │
│                     │                                                        │
│                     │ . > @typescript-eslint/eslint-plugin@8.30.1 >          │
│                     │ @typescript-eslint/type-utils@8.30.1 >                 │
│                     │ @typescript-eslint/typescript-estree@8.30.1 >          │
│                     │ . > @typescript-eslint/eslint-plugin@8.30.1 >          │
│                     │ @typescript-eslint/type-utils@8.30.1 >                 │
│                     │ @typescript-eslint/typescript-estree@8.30.1 >          │
│                     │ minimatch@9.0.5 > brace-expansion@2.0.1                │
│                     │                                                        │
│                     │ @typescript-eslint/type-utils@8.30.1 >                 │
│                     │ @typescript-eslint/typescript-estree@8.30.1 >          │
│                     │ minimatch@9.0.5 > brace-expansion@2.0.1                │
│                     │                                                        │
│                     │ @typescript-eslint/typescript-estree@8.30.1 >          │
│                     │ minimatch@9.0.5 > brace-expansion@2.0.1                │
│                     │                                                        │
│                     │ . > @typescript-eslint/eslint-plugin@8.30.1 >          │
│                     │ @typescript-eslint/type-utils@8.30.1 >                 │
│                     │ minimatch@9.0.5 > brace-expansion@2.0.1                │
│                     │                                                        │
│                     │ . > @typescript-eslint/eslint-plugin@8.30.1 >          │
│                     │ @typescript-eslint/type-utils@8.30.1 >                 │
│                     │ . > @typescript-eslint/eslint-plugin@8.30.1 >          │
│                     │ @typescript-eslint/type-utils@8.30.1 >                 │
│                     │ @typescript-eslint/type-utils@8.30.1 >                 │
│                     │ @typescript-eslint/utils@8.30.1 >                      │
│                     │ @typescript-eslint/typescript-estree@8.30.1 >          │
│                     │ minimatch@9.0.5 > brace-expansion@2.0.1                │
│                     │                                                        │
│                     │ ... Found 12 paths, run `pnpm why brace-expansion` for │
│                     │ more information                                       │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ More info           │ https://github.com/advisories/GHSA-v6h2-p8h4-qcjw      │
└─────────────────────┴────────────────────────────────────────────────────────┘
3 vulnerabilities found
Severity: 2 low | 1 moderate
```

### Zero-day vulnerabilities

I've made checking using `Snyk CLI` and it found no zero-day vulnerabilities.

```bash
✔ Tested 30 dependencies for known issues, no vulnerable paths found.
```

Currently, there are no zero-day vulnerabilities on 15-06-2025.

## Decision

After the audit, I have decided to upgrade the following packages:

- `vite` to `^6.3.4`
- `brace-expansion` to `^2.0.2` as internal dependency of `@typescript-eslint/eslint-plugin`

## Reason

- `vite` package has moderate vulnerability in its server.fs.deny bypassed with /. for files under project root. It may allow attackers to bypass the server.fs.deny configuration and access files outside of the project root.

- `brace-expansion` package has low vulnerability in its Regular Expression Denial of Service vulnerability. It may allow attackers to cause a denial of service by sending a specially crafted input to the package.
