# UI Coding Standards

## Component Library

**All UI components must use ShadCN UI exclusively.**

- No custom components are to be created under any circumstances.
- Every interactive element, layout primitive, and visual component must come from the ShadCN UI library.
- If a required component does not exist in ShadCN UI, open a discussion before building anything custom.

Install components via the ShadCN CLI:

```bash
npx shadcn@latest add <component-name>
```

Components are added to `src/components/ui/` and should not be modified beyond what ShadCN scaffolds unless absolutely necessary to fix a bug.

## Date Formatting

All date formatting must use [date-fns](https://date-fns.org/).

Dates must be displayed in the following format:

```
1st Sep 2025
2nd Aug 2024
3rd Jan 2026
4th Jun 2024
```

Use the `date-fns` format string `do MMM yyyy` to produce this output:

```ts
import { format } from "date-fns";

format(new Date("2025-09-01"), "do MMM yyyy"); // "1st Sep 2025"
format(new Date("2024-08-02"), "do MMM yyyy"); // "2nd Aug 2024"
format(new Date("2026-01-03"), "do MMM yyyy"); // "3rd Jan 2026"
format(new Date("2024-06-04"), "do MMM yyyy"); // "4th Jun 2024"
```

Do not use `Intl.DateTimeFormat`, `Date.toLocaleDateString()`, `moment`, `dayjs`, or any other date library. Only `date-fns`.
