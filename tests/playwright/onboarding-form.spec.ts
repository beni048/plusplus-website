import { test, expect } from '@playwright/test';

test.describe('Onboarding Form', () => {
    test.setTimeout(90000); // Verify slow form interactions
    test.use({ viewport: { width: 1280, height: 1000 } });

    test('submits successfully for Natural Person', async ({ page }) => {
        // Mock API
        await page.route('**/api/submit-application', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ success: true, message: 'On-boarding submitted successfully!' })
            });
        });

        const base = process.env.PW_BASE_URL || process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';
        await page.goto(`${base}/en/data`);

        // Wait for form to load
        await expect(page.getByText('Client On-boarding').first()).toBeVisible({ timeout: 10000 });
        await page.waitForLoadState('networkidle');

        // Select Entity Type: Natural Person
        await page.getByLabel('Entity Type').click();
        await expect(page.getByRole('option', { name: 'Natural Person' })).toBeVisible();
        await page.getByRole('option', { name: 'Natural Person' }).click();
        await page.waitForTimeout(500);

        // Fill Personal Info
        await page.getByLabel('First Name').fill('John');
        await page.getByLabel('Last Name').fill('Doe');

        // Handle DatePicker
        const dobField = page.getByLabel('Date of Birth');
        await dobField.click();
        await page.waitForTimeout(300);
        await dobField.fill('1990-01-01');

        await page.getByLabel('Nationality').fill('American');
        await page.getByLabel('Email Address').fill('john.doe@example.com');
        await page.getByLabel('Phone Number').fill('+1234567890');

        // Address
        // Use first because address fields might appear in other sections if rendered eagerly (though shouldn't for Nat Person)
        await page.getByLabel('Street').first().fill('Main St');
        await page.getByLabel('House Number').first().fill('123');
        await page.getByLabel('Zip Code').first().fill('10001');
        await page.getByLabel('City').first().fill('New York');
        await page.getByLabel('Country').first().fill('USA');

        // AML Profile
        await page.getByLabel('Profession').fill('Engineer');
        await page.getByLabel('Estimated Annual Income (CHF)').fill('100000');
        await page.getByLabel('Estimated Total Wealth (CHF)').fill('500000');
        await page.getByLabel('Estimated Total Liabilities (CHF)').fill('0');

        // Origin of Assets - Category Select
        const originLabel = page.locator('label').filter({ hasText: 'Origin of Assets' }).first();
        const categoryButton = page.locator('button[role="combobox"]').filter({
            has: originLabel.locator('..')
        }).first();

        await categoryButton.scrollIntoViewIfNeeded();
        await categoryButton.click();
        await page.waitForTimeout(300);
        await expect(page.getByRole('option', { name: /Salary.*Employment/ })).toBeVisible({ timeout: 5000 });
        await page.getByRole('option', { name: /Salary.*Employment/ }).click();

        await page.waitForTimeout(300);

        await page.getByLabel('Amount (CHF)').fill('50000');
        await page.getByLabel('Description').fill('Savings');
        await page.getByLabel('Planned Transaction Volume').fill('10000');

        // Purpose Select
        const purposeButton = page.locator('button[role="combobox"]').filter({
            has: page.locator('label').filter({ hasText: 'Purpose of Relationship' })
        }).first();
        await purposeButton.scrollIntoViewIfNeeded();
        await purposeButton.click();
        await page.waitForTimeout(300);
        await expect(page.getByRole('option', { name: /Wealth Preservation/ })).toBeVisible({ timeout: 5000 });
        await page.getByRole('option', { name: /Wealth Preservation/ }).click();

        // Third Party Relations Select
        const thirdPartyButton = page.locator('button[role="combobox"]').filter({
            has: page.locator('label').filter({ hasText: 'Third Party Relations' })
        }).first();
        await thirdPartyButton.scrollIntoViewIfNeeded();
        await thirdPartyButton.click();
        await page.waitForTimeout(300);
        await expect(page.getByRole('option', { name: /No, I am the sole beneficial owner/ })).toBeVisible({ timeout: 5000 });
        await page.getByRole('option', { name: /No, I am the sole beneficial owner/ }).click();

        // Valid File Upload
        const fileInput = page.locator('input[type="file"]').first();
        await fileInput.setInputFiles({
            name: 'passport.jpg',
            mimeType: 'image/jpeg',
            buffer: Buffer.from('fake-passport-content')
        });

        // Submit
        const submitButton = page.getByRole('button', { name: /Submit/ });
        await expect(submitButton).toBeEnabled({ timeout: 5000 });
        await submitButton.click();

        // Assert success
        await expect(page.locator('text=On-boarding submitted successfully')).toBeVisible({ timeout: 20000 });
    });

    test('submits successfully for Legal Entity (Operative Company)', async ({ page }) => {
        await page.route('**/api/submit-application', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ success: true, message: 'On-boarding submitted successfully!' })
            });
        });

        const base = process.env.PW_BASE_URL || process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';
        await page.goto(`${base}/en/data`);

        await expect(page.getByText('Client On-boarding').first()).toBeVisible({ timeout: 10000 });
        await page.waitForLoadState('networkidle');

        // Select Entity Type: Legal Entity
        await page.getByLabel('Entity Type').click();
        await expect(page.getByRole('option', { name: 'Legal Entity' })).toBeVisible();
        await page.getByRole('option', { name: 'Legal Entity' }).click();
        await page.waitForTimeout(500);

        // Opener Details
        const openerFirst = page.getByLabel('First Name').first();
        await openerFirst.fill('Alice');
        await page.getByLabel('Last Name').first().fill('Smith');
        await page.getByLabel('Date of Birth').first().fill('1985-05-05');
        await page.getByLabel('Nationality').first().fill('British');

        // Use nth(0) for Opener Address just to be sure, though they should be first visual block
        await page.getByLabel('Street').nth(0).fill('Main St');
        await page.getByLabel('House Number').nth(0).fill('1');
        await page.getByLabel('Zip Code').nth(0).fill('1000');
        await page.getByLabel('City').nth(0).fill('London');
        await page.getByLabel('Country').nth(0).fill('UK');

        await page.getByLabel('Function').fill('Director');

        // Opener Auth
        const authSignatoryButton = page.locator('button[role="combobox"]').filter({
            has: page.locator('label').filter({ hasText: 'Are you an authorized signatory?' })
        }).first();
        await authSignatoryButton.click();
        await page.getByRole('option', { name: 'Yes' }).click();

        // Second signatory No
        const secondSigButton = page.locator('button[role="combobox"]').filter({
            has: page.locator('label').filter({ hasText: 'Is there a second signatory?' })
        }).first();
        await secondSigButton.click();
        await page.getByRole('option', { name: 'No' }).click();

        // Company Information
        await page.getByLabel('Company Name').fill('Test Corp');

        // Legal Entity Type
        const typeButton = page.locator('button[role="combobox"]').filter({
            has: page.locator('label').filter({ hasText: /^Legal Entity Type$/ })
        }).first();
        await typeButton.scrollIntoViewIfNeeded();
        await typeButton.click();
        await page.getByRole('option', { name: 'Operative Company' }).click();

        await page.getByLabel('Commercial Register Number').fill('CH-123.456.789');
        await page.getByLabel('Date of Incorporation').fill('2000-01-01');

        // Domicile Address (2nd address block)
        await page.getByLabel('Street').nth(1).fill('Corp Blvd');
        await page.getByLabel('House Number').nth(1).fill('100');
        await page.getByLabel('Zip Code').nth(1).fill('8000');
        await page.getByLabel('City').nth(1).fill('Zurich');
        await page.getByLabel('Country').nth(1).fill('Switzerland');

        // Business Activity
        const bizActivityButton = page.locator('button[role="combobox"]').filter({
            has: page.locator('label').filter({ hasText: 'Detailed Business Activity' })
        }).first();
        await bizActivityButton.scrollIntoViewIfNeeded();
        await bizActivityButton.click();
        await page.getByRole('option').first().click(); // Just pick first

        // Owners > 25% -> No
        const ownersButton = page.locator('button[role="combobox"]').filter({
            has: page.locator('label').filter({ hasText: 'Are there owners with > 25% shares?' })
        }).first();
        await ownersButton.click();
        await page.getByRole('option', { name: 'No' }).click();

        // Managing Directors - Add One
        await page.getByRole('button', { name: 'Add Person' }).first().click();
        // The new person form fields appear. They are later in DOM.
        // Assuming they are the 3rd block of person fields (Opener, (empty Auth Sig 2), ... MD 1)
        // Let's use last() for simplicity as we just added it
        await page.getByLabel('Full Name').last().fill('Bob Manager');
        await page.getByLabel('Date of Birth').last().fill('1980-08-08');
        await page.getByLabel('Nationality').last().fill('Swiss');
        await page.getByLabel('Street').last().fill('Work St');
        await page.getByLabel('House Number').last().fill('9');
        await page.getByLabel('Zip Code').last().fill('8000');
        await page.getByLabel('City').last().fill('Zurich');
        await page.getByLabel('Country').last().fill('Switzerland');

        // Upload files (Passport for Opener, Register for Company)
        // Simply upload to all file inputs found
        const fileInputs = page.locator('input[type="file"]');
        const count = await fileInputs.count();
        for (let i = 0; i < count; i++) {
            if (await fileInputs.nth(i).isVisible()) {
                await fileInputs.nth(i).setInputFiles({
                    name: `doc${i}.pdf`,
                    mimeType: 'application/pdf',
                    buffer: Buffer.from('fake-pdf-content')
                });
            }
        }

        const submitBtn = page.getByRole('button', { name: /Submit/ });
        await expect(submitBtn).toBeEnabled();
        await submitBtn.click();

        await expect(page.locator('text=On-boarding submitted successfully')).toBeVisible({ timeout: 20000 });
    });

    test('submits successfully for Legal Entity (Foundation)', async ({ page }) => {
        await page.route('**/api/submit-application', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ success: true, message: 'On-boarding submitted successfully!' })
            });
        });

        const base = process.env.PW_BASE_URL || process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';
        await page.goto(`${base}/en/data`);

        await expect(page.getByText('Client On-boarding').first()).toBeVisible({ timeout: 10000 });
        await page.waitForLoadState('networkidle');

        // Legal Entity -> Foundation
        await page.getByLabel('Entity Type').click();
        await expect(page.getByRole('option', { name: 'Legal Entity' })).toBeVisible();
        await page.getByRole('option', { name: 'Legal Entity' }).click();
        await page.waitForTimeout(500);

        // Fill Opener Basic
        await page.getByLabel('First Name').first().fill('Alice');
        await page.getByLabel('Last Name').first().fill('Smith');
        await page.getByLabel('Date of Birth').first().fill('1985-05-05');
        await page.getByLabel('Nationality').first().fill('British');
        await page.getByLabel('Street').nth(0).fill('Main St');
        await page.getByLabel('House Number').nth(0).fill('1');
        await page.getByLabel('Zip Code').nth(0).fill('1000');
        await page.getByLabel('City').nth(0).fill('London');
        await page.getByLabel('Country').nth(0).fill('UK');
        await page.getByLabel('Function').fill('Board Member');

        // Opener Auth Yes
        await page.locator('button[role="combobox"]').filter({ has: page.getByText('Are you an authorized signatory?') }).click();
        await page.getByRole('option', { name: 'Yes' }).click();
        await page.locator('button[role="combobox"]').filter({ has: page.getByText('Is there a second signatory?') }).click();
        await page.getByRole('option', { name: 'No' }).click();

        // Company Info
        await page.getByLabel('Company Name').fill('Test Foundation');

        // Legal Entity Type -> Foundation
        const typeButton = page.locator('button[role="combobox"]').filter({ has: page.locator('label').filter({ hasText: /^Legal Entity Type$/ }) }).first();
        await typeButton.scrollIntoViewIfNeeded();
        await typeButton.click();
        await page.getByRole('option', { name: 'Foundation' }).click();

        await page.getByLabel('Commercial Register Number').fill('CH-999.888.777');
        await page.getByLabel('Date of Incorporation').fill('2010-01-01');
        await page.getByLabel('Street').nth(1).fill('Foundation Rd');
        await page.getByLabel('House Number').nth(1).fill('1');
        await page.getByLabel('Zip Code').nth(1).fill('9000');
        await page.getByLabel('City').nth(1).fill('Vaduz');
        await page.getByLabel('Country').nth(1).fill('Liechtenstein');

        // Foundation Details
        await page.locator('button[role="combobox"]').filter({ has: page.getByText('Foundation Type') }).click();
        await page.getByRole('option', { name: 'Discretionary' }).click();

        await page.locator('button[role="combobox"]').filter({ has: page.getByText('Is the foundation revocable?') }).click();
        await page.getByRole('option', { name: 'No' }).click();

        // Founder Details
        await page.getByLabel('Full Name').first().fill('Founder Guy'); // Assuming founder is first "Full Name" in this section
        await page.getByLabel('Date of Birth').nth(2).fill('1950-01-01'); // 0: opener, 1: (unused auth sig 2), 2: founder
        await page.getByLabel('Nationality').nth(2).fill('Swiss');
        // Founder Address (3rd address block)
        await page.getByLabel('Street').nth(2).fill('Founder St');
        await page.getByLabel('House Number').nth(2).fill('1');
        await page.getByLabel('Zip Code').nth(2).fill('8000');
        await page.getByLabel('City').nth(2).fill('Zurich');
        await page.getByLabel('Country').nth(2).fill('Switzerland');

        await page.locator('button[role="combobox"]').filter({ has: page.getByText('Is the Founder deceased?') }).click();
        await page.getByRole('option', { name: 'No' }).click();

        // Uploads
        const fileInputs = page.locator('input[type="file"]');
        const count = await fileInputs.count();
        for (let i = 0; i < count; i++) {
            if (await fileInputs.nth(i).isVisible()) {
                await fileInputs.nth(i).setInputFiles({
                    name: `doc${i}.pdf`,
                    mimeType: 'application/pdf',
                    buffer: Buffer.from('fake-pdf-content')
                });
            }
        }

        const submitBtn = page.getByRole('button', { name: /Submit/ });
        await expect(submitBtn).toBeEnabled();
        await submitBtn.click();

        await expect(page.locator('text=On-boarding submitted successfully')).toBeVisible({ timeout: 20000 });
    });

    test('submits successfully for Legal Entity (Trust)', async ({ page }) => {
        await page.route('**/api/submit-application', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ success: true, message: 'On-boarding submitted successfully!' })
            });
        });

        const base = process.env.PW_BASE_URL || process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';
        await page.goto(`${base}/en/data`);

        await expect(page.getByText('Client On-boarding').first()).toBeVisible({ timeout: 10000 });

        await page.getByLabel('Entity Type').click();
        await expect(page.getByRole('option', { name: 'Legal Entity' })).toBeVisible();
        await page.getByRole('option', { name: 'Legal Entity' }).click();
        await page.waitForTimeout(500);

        // Opener
        await page.getByLabel('First Name').first().fill('Tom');
        await page.getByLabel('Last Name').first().fill('Trustee');
        await page.getByLabel('Date of Birth').first().fill('1980-01-01');
        await page.getByLabel('Nationality').first().fill('UK');
        await page.getByLabel('Street').nth(0).fill('Trust St');
        await page.getByLabel('House Number').nth(0).fill('1');
        await page.getByLabel('Zip Code').nth(0).fill('2000');
        await page.getByLabel('City').nth(0).fill('London');
        await page.getByLabel('Country').nth(0).fill('UK');
        await page.getByLabel('Function').fill('Trustee');

        // Opener Auth Yes
        await page.locator('button[role="combobox"]').filter({ has: page.getByText('Are you an authorized signatory?') }).click();
        await page.getByRole('option', { name: 'Yes' }).click();
        await page.locator('button[role="combobox"]').filter({ has: page.getByText('Is there a second signatory?') }).click();
        await page.getByRole('option', { name: 'No' }).click();

        await page.getByLabel('Company Name').fill('The Family Trust');

        // Legal Entity Type -> Trust
        const typeButton = page.locator('button[role="combobox"]').filter({ has: page.locator('label').filter({ hasText: /^Legal Entity Type$/ }) }).first();
        await typeButton.scrollIntoViewIfNeeded();
        await typeButton.click();
        await page.getByRole('option', { name: 'Trust' }).click();

        await page.getByLabel('Commercial Register Number').fill('N/A');
        await page.getByLabel('Date of Incorporation').fill('2020-01-01');
        // Domicile (2nd address block)
        await page.getByLabel('Street').nth(1).fill('Trust HQ');
        await page.getByLabel('House Number').nth(1).fill('1');
        await page.getByLabel('Zip Code').nth(1).fill('1111');
        await page.getByLabel('City').nth(1).fill('City');
        await page.getByLabel('Country').nth(1).fill('Country');

        // Trust Details
        await page.locator('button[role="combobox"]').filter({ has: page.getByText('Trust Type') }).click();
        await page.getByRole('option', { name: 'Discretionary' }).click();

        await page.locator('button[role="combobox"]').filter({ has: page.getByText('Is the trust revocable?') }).click();
        await page.getByRole('option', { name: 'No' }).click();

        // Settlor
        const settlorName = page.getByLabel('Full Name').first();
        await expect(settlorName).toBeVisible();
        await settlorName.fill('Settlor Sam');

        // Just fill Settlor Address (3rd block)
        await page.getByLabel('Street').nth(2).fill('Settlor St');
        await page.getByLabel('House Number').nth(2).fill('1');
        await page.getByLabel('Zip Code').nth(2).fill('3000');
        await page.getByLabel('City').nth(2).fill('City');
        await page.getByLabel('Country').nth(2).fill('Country');

        await page.locator('button[role="combobox"]').filter({ has: page.getByText('Is the Settlor deceased?') }).click();
        await page.getByRole('option', { name: 'No' }).click();

        // Trustee (4th block usually, but might vary)
        // Trust details asks for Trustee too.
        // There will be another "Full Name" input for Trustee.
        // Let's iterate inputs or use nth.
        // 0: Opener, 1: (unused auth sig 2), 2: Settlor, 3: Trustee
        // Actually, schema/TrustDetails has inputs for: Settlor, Trustee, Protector.
        // So we need to fill them all.

        // Trustee
        await page.getByLabel('Full Name').nth(1).fill('Trustee Tim'); // 2nd visible Full Name in this view? 
        // Note: Opener doesn't use "Full Name", it uses "First Name"/"Last Name".
        // Authorised Signatories use "Full Name" but are hidden if 2nd sig is No.
        // So 0: Settlor, 1: Trustee, 2: Protector.
        await page.getByLabel('Street').nth(3).fill('Trustee St'); // 0: opener, 1: domicile, 2: settlor, 3: trustee
        await page.getByLabel('House Number').nth(3).fill('1');
        await page.getByLabel('Zip Code').nth(3).fill('3000');
        await page.getByLabel('City').nth(3).fill('City');
        await page.getByLabel('Country').nth(3).fill('Country');

        // Protector
        await page.getByLabel('Full Name').nth(2).fill('Protector Paul');
        await page.getByLabel('Street').nth(4).fill('Protector St');
        await page.getByLabel('House Number').nth(4).fill('1');
        await page.getByLabel('Zip Code').nth(4).fill('3000');
        await page.getByLabel('City').nth(4).fill('City');
        await page.getByLabel('Country').nth(4).fill('Country');

        // Uploads
        const fileInputs = page.locator('input[type="file"]');
        const count = await fileInputs.count();
        for (let i = 0; i < count; i++) {
            if (await fileInputs.nth(i).isVisible()) {
                await fileInputs.nth(i).setInputFiles({
                    name: `doc${i}.pdf`,
                    mimeType: 'application/pdf',
                    buffer: Buffer.from('fake-pdf-content')
                });
            }
        }

        const submitBtn = page.getByRole('button', { name: /Submit/ });
        await expect(submitBtn).toBeEnabled();
        await submitBtn.click();

        await expect(page.locator('text=On-boarding submitted successfully')).toBeVisible({ timeout: 20000 });
    });
});
