/* eslint-disable testing-library/prefer-screen-queries */
import { expect, test } from "@playwright/test";
import path from "path";

test("import data", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.getByTestId("nav-data").click();

  await expect(page.getByRole("heading", { name: "Your data" })).toBeVisible();

  await page
    .getByTestId("input-import")
    .setInputFiles(path.join(__dirname, "testdata.json"));

  await page.getByTestId("btn-import").click();

  //List records
  await page.getByTestId("nav-records").click();

  await expect(page.getByRole("heading", { name: "2024-02-29" })).toBeVisible();
  expect(
    await page.getByTestId("record-list-0").getByRole("listitem").count()
  ).toBe(3);

  await expect(
    page.getByTestId("record-list-0").getByText("1 rött gött vin, 2.3 units")
  ).toBeVisible();

  // Open details
  await page
    .getByTestId("record-list-0")
    .getByText("1 rött gött vin, 2.3 units")
    .click();

  await expect(
    page.getByRole("heading", { name: "1 rött gött vin" })
  ).toBeVisible();

  await expect(page.getByText("Date: 2024-02-29 : 12:46")).toBeVisible();
  await expect(page.getByText("ABV: 11.5%")).toBeVisible();
  await expect(page.getByText("Volume: 20 cl")).toBeVisible();
  await expect(page.getByText("Calculated units: 2.3")).toBeVisible();

  await expect(page.getByRole("button", { name: "Edit record" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Delete record" })
  ).toBeVisible();

  //edit record

  // delete record
  await page
    .getByTestId("record-list-0")
    .getByText("1 felaktig öl, 1.65 units")
    .click();
  await page.getByRole("button", { name: "Delete record" }).click();
  await expect(
    page.getByRole("button", { name: "Click again to delete record" })
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Click again to delete record" })
    .click();

  await expect(
    page.getByTestId("record-list-0").getByText("1 felaktig öl, 1.65 units")
  ).toHaveCount(0);

  await expect(page.getByRole("heading", { name: "2024-02-28" })).toBeVisible();
  expect(
    await page.getByTestId("record-list-1").getByRole("listitem").count()
  ).toBe(3);

  await expect(page.getByRole("heading", { name: "2024-02-27" })).toBeVisible();
  expect(
    await page.getByTestId("record-list-2").getByRole("listitem").count()
  ).toBe(4);
});
