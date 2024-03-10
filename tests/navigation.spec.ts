/* eslint-disable testing-library/prefer-screen-queries */
import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Alcotracker/);
});

test("Navigation links", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Click the Register link.
  await page.getByTestId("nav-register").click();

  await expect(
    page.getByRole("heading", { name: "Add a drink" })
  ).toBeVisible();

  // Click the Records link.
  await page.getByTestId("nav-records").click();

  await expect(
    page.getByRole("heading", { name: "Your listed records" })
  ).toBeVisible();

  // Click the Statistics link.
  await page.getByTestId("nav-statistics").click();

  await expect(
    page.getByRole("heading", { name: "Your statistics" })
  ).toBeVisible();

  // Click the Data link.
  await page.getByTestId("nav-data").click();

  await expect(page.getByRole("heading", { name: "Your data" })).toBeVisible();

  // Click the Home link.
  await page.getByTestId("nav-home").click();

  await expect(
    page.getByRole("heading", { name: "Alcotracker" })
  ).toBeVisible();
});

test("Footer links", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.getByTestId("footer-about").click();

  await expect(
    page.getByRole("heading", { name: "About Alcotracker" })
  ).toBeVisible();
});
