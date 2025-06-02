# Test info

- Name: has title
- Location: C:\Users\Pierre\Documents\WebDev\BeCode\Green.U\my-app\tests\example.spec.ts:3:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

    at C:\Users\Pierre\Documents\WebDev\BeCode\Green.U\my-app\tests\example.spec.ts:4:14
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('has title', async ({ page }) => {
>  4 |   await page.goto('http://localhost:3000');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
   5 |
   6 |   // Expect a title "to contain" a substring.
   7 |   await expect(page).toHaveTitle(/green.U/);
   8 | });
   9 |
  10 | test('get started link', async ({ page }) => {
  11 |   await page.goto('https://playwright.dev/');
  12 |
  13 |   // Click the get started link.
  14 |   await page.getByRole('link', { name: 'Get started' }).click();
  15 |
  16 |   // Expects page to have a heading with the name of Installation.
  17 |   await expect(
  18 |     page.getByRole('heading', { name: 'Installation' })
  19 |   ).toBeVisible();
  20 | });
  21 |
```