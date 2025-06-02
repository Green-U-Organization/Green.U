# Test info

- Name: has title
- Location: C:\Users\Pierre\Documents\WebDev\BeCode\Green.U\my-app\tests\example.spec.ts:3:5

# Error details

```
Error: page.goto: NS_ERROR_CONNECTION_REFUSED
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

    at C:\Users\Pierre\Documents\WebDev\BeCode\Green.U\my-app\tests\example.spec.ts:4:14
```

# Page snapshot

```yaml
- heading "Unable to connect" [level=1]
- paragraph: Firefox can’t establish a connection to the server at localhost:3000.
- paragraph
- list:
  - listitem: The site could be temporarily unavailable or too busy. Try again in a few moments.
  - listitem: If you are unable to load any pages, check your computer’s network connection.
  - listitem: If your computer or network is protected by a firewall or proxy, make sure that Nightly is permitted to access the web.
- button "Try Again"
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('has title', async ({ page }) => {
>  4 |   await page.goto('http://localhost:3000');
     |              ^ Error: page.goto: NS_ERROR_CONNECTION_REFUSED
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