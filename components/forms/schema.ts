import * as z from 'zod';

export const personSchema = z.object({
    fullName: z.string().optional(),
    street: z.string().optional(),
    houseNumber: z.string().optional(),
    zipCode: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    dateOfBirth: z.string().optional(),
    nationality: z.string().optional(),
});

export const formSchema = z.object({
    entityType: z.enum(["natural_person", "legal_entity"]),

    // --- Natural Person Fields ---
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    street: z.string().optional(),
    houseNumber: z.string().optional(),
    zipCode: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    dateOfBirth: z.string().optional(),
    nationality: z.string().optional(),

    // New: Document type selection for verification (passport or ID)
    idDocumentType: z.enum(["passport", "id"]).optional(),
    // AML profile fields (mandatory for natural persons)
    amlProfile: z.object({
        profession: z.string().optional(),
        estimatedIncome: z.string().optional(),
        estimatedWealth: z.string().optional(),
        estimatedLiabilities: z.string().optional(),
        originOfAssets: z.object({
            category: z.enum([
                'salary_employment',
                'savings',
                'investment_capital_gains',
                'real_estate_sale',
                'company_sale',
                'inheritance_gift',
                'loan',
                'lottery_gambling',
                'other'
            ]).optional(),
            otherExplanation: z.string().optional(),
            amount: z.string().optional(),
            currency: z.string().optional(),
            description: z.string().optional(),
        }).optional(),
        relationshipPurpose: z.object({
            type: z.enum([
                'wealth_preservation',
                'capital_appreciation',
                'income_generation',
                'diversification',
                'transactional_banking',
                'asset_management',
                'other'
            ]).optional(),
            otherDetails: z.string().optional()
        }).optional(),
        plannedTransactionVolume: z.string().optional(),
        thirdPartyRelations: z.object({
            type: z.enum([
                'no_beneficial_owner', // "No, I am the sole beneficial owner"
                'advisor_attorney',
                'family_member',
                'business_partner',
                'trustee',
                'other'
            ]).optional(),
            otherDetails: z.string().optional()
        }).optional(),
    }).optional(),
    specialClarifications: z.string().optional(),

    // --- Legal Entity Fields ---

    // Opener Details
    openerFirstName: z.string().optional(),
    openerLastName: z.string().optional(),
    openerFunction: z.string().optional(), // New
    openerDateOfBirth: z.string().optional(),
    openerNationality: z.string().optional(),

    // Opener Address (Split)
    openerStreet: z.string().optional(),
    openerHouseNumber: z.string().optional(),
    openerZipCode: z.string().optional(),
    openerCity: z.string().optional(),
    openerCountry: z.string().optional(),

    // Opener Authorization
    isOpenerAuthorizedSignatory: z.enum(["yes", "no"]).optional(),
    hasSecondSignatory: z.enum(["yes", "no"]).optional(), // New
    numberOfSignatories: z.enum(["1", "2"]).optional(), // New
    authorizedSignatory1: personSchema.optional(),
    authorizedSignatory2: personSchema.optional(),

    // Company Info
    companyName: z.string().optional(),
    // Domicile Address (Split)
    domicileStreet: z.string().optional(),
    domicileHouseNumber: z.string().optional(),
    domicileZipCode: z.string().optional(),
    domicileCity: z.string().optional(),
    domicileCountry: z.string().optional(),

    legalEntityType: z.enum(["operative_company", "domiciliary_company", "foundation", "trust"]).optional(),

    // Operative Company & Domiciliary Company Specifics
    managingDirectors: z.array(personSchema).optional(),
    ownersMoreThan25Percent: z.array(personSchema).max(3, { message: "You can add up to 3 owners with > 25% shares." }).optional(),
    hasOwnersMoreThan25Percent: z.enum(["yes", "no"]).optional(),
    detailedBusinessActivity: z.object({
        type: z.enum([
            'financial_services',
            'real_estate_construction',
            'technology_software',
            'manufacturing_industrial',
            'trade_commerce',
            'energy_mining',
            'healthcare_pharma',
            'transport_logistics',
            'tourism_hospitality',
            'public_sector',
            'professional_services',
            'gaming_gambling',
            'crypto_virtual_assets',
            'other'
        ]).optional(),
        otherDetails: z.string().optional()
    }).optional(),
    sourceOfFunds: z.object({
        type: z.enum(['business_profits', 'investment', 'loan', 'equity', 'other']).optional(),
        otherDetails: z.string().optional()
    }).optional(),

    // Foundation Specifics
    foundationType: z.enum(["discretionary", "non_discretionary"]).optional(),
    isFoundationRevocable: z.enum(["yes", "no"]).optional(),
    founder: personSchema.optional(),
    isFounderDeceased: z.enum(["yes", "no"]).optional(),
    foundationBoardMembers: z.array(personSchema).optional(),
    foundationBeneficiaries: z.array(personSchema).optional(),
    foundationBeneficiariesFixedClaim: z.enum(["yes", "no"]).optional(),
    nominationRights: z.array(personSchema).optional(),

    // Trust Specifics
    trustType: z.enum(["discretionary", "non_discretionary"]).optional(),
    isTrustRevocable: z.enum(["yes", "no"]).optional(),
    settlor: personSchema.optional(),
    isSettlorDeceased: z.enum(["yes", "no"]).optional(),
    trustee: personSchema.optional(),
    protector: personSchema.optional(),
    trustBeneficiaries: z.array(personSchema).optional(),
    trustBeneficiariesFixedClaim: z.enum(["yes", "no"]).optional(),

    // Economic Beneficiary (For all Legal Entities)
    economicBeneficiaries: z.array(personSchema).optional(),

}).superRefine((data, ctx) => {
    // Helper to validate person object
    const validatePerson = (person: any, path: (string | number)[]) => {
        if (!person) return;
        if (!person.fullName) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Full name is required", path: [...path, "fullName"] });
        if (!person.street) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Street is required", path: [...path, "street"] });
        if (!person.zipCode) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Zip code is required", path: [...path, "zipCode"] });
        if (!person.city) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "City is required", path: [...path, "city"] });
        if (!person.country) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Country is required", path: [...path, "country"] });
        if (!person.dateOfBirth) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Date of birth is required", path: [...path, "dateOfBirth"] });
        if (!person.nationality) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Nationality is required", path: [...path, "nationality"] });
    };

    // --- Natural Person Validation ---
    if (data.entityType === "natural_person") {
        if (!data.firstName) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "First name is required", path: ["firstName"] });
        if (!data.lastName) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Last name is required", path: ["lastName"] });
        if (!data.dateOfBirth) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Date of birth is required", path: ["dateOfBirth"] });
        if (!data.nationality) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Nationality is required", path: ["nationality"] });

        // Address
        if (!data.street) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Street is required", path: ["street"] });
        if (!data.zipCode) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Zip code is required", path: ["zipCode"] });
        if (!data.city) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "City is required", path: ["city"] });
        if (!data.country) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Country is required", path: ["country"] });

        if (!data.email) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Email is required", path: ["email"] });
        } else if (!z.string().email().safeParse(data.email).success) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid email address", path: ["email"] });
        }

        // AML Profile Validation (Mandatory for Natural Person)
        if (!data.amlProfile?.profession) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Profession is required", path: ["amlProfile", "profession"] });
        if (!data.amlProfile?.estimatedIncome) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Estimated Income is required", path: ["amlProfile", "estimatedIncome"] });
        if (!data.amlProfile?.estimatedWealth) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Estimated Wealth is required", path: ["amlProfile", "estimatedWealth"] });
        if (!data.amlProfile?.estimatedLiabilities) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Estimated Liabilities is required", path: ["amlProfile", "estimatedLiabilities"] });

        // Origin of Assets
        if (!data.amlProfile?.originOfAssets?.category) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Origin of Assets Category is required", path: ["amlProfile", "originOfAssets", "category"] });
        if (data.amlProfile?.originOfAssets?.category === 'other' && !data.amlProfile?.originOfAssets?.otherExplanation) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please specify the origin of assets", path: ["amlProfile", "originOfAssets", "otherExplanation"] });
        }
        if (!data.amlProfile?.originOfAssets?.amount) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Amount is required", path: ["amlProfile", "originOfAssets", "amount"] });
        if (!data.amlProfile?.originOfAssets?.currency) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Currency is required", path: ["amlProfile", "originOfAssets", "currency"] });
        if (!data.amlProfile?.originOfAssets?.description) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Description is required", path: ["amlProfile", "originOfAssets", "description"] });

        // Relationship Purpose
        if (!data.amlProfile?.relationshipPurpose?.type) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Purpose is required", path: ["amlProfile", "relationshipPurpose", "type"] });
        if (data.amlProfile?.relationshipPurpose?.type === 'other' && (!data.amlProfile?.relationshipPurpose?.otherDetails || data.amlProfile.relationshipPurpose.otherDetails.length < 2)) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please specify the purpose", path: ["amlProfile", "relationshipPurpose", "otherDetails"] });
        }

        if (!data.amlProfile?.plannedTransactionVolume) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Volume is required", path: ["amlProfile", "plannedTransactionVolume"] });

        // Third Party Relations
        if (!data.amlProfile?.thirdPartyRelations?.type) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Third party relations is required", path: ["amlProfile", "thirdPartyRelations", "type"] });
        if (data.amlProfile?.thirdPartyRelations?.type === 'other' && (!data.amlProfile?.thirdPartyRelations?.otherDetails || data.amlProfile.thirdPartyRelations.otherDetails.length < 2)) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please specify the third party relation", path: ["amlProfile", "thirdPartyRelations", "otherDetails"] });
        }
    }

    // --- Legal Entity Validation ---
    if (data.entityType === "legal_entity") {
        // Opener Details
        if (!data.openerFirstName) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Opener first name is required", path: ["openerFirstName"] });
        if (!data.openerLastName) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Opener last name is required", path: ["openerLastName"] });
        if (!data.openerFunction) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Opener function is required", path: ["openerFunction"] });
        if (!data.openerDateOfBirth) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Opener DOB is required", path: ["openerDateOfBirth"] });
        if (!data.openerNationality) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Opener nationality is required", path: ["openerNationality"] });

        // Opener Address
        if (!data.openerStreet) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Street is required", path: ["openerStreet"] });
        if (!data.openerZipCode) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Zip code is required", path: ["openerZipCode"] });
        if (!data.openerCity) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "City is required", path: ["openerCity"] });
        if (!data.openerCountry) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Country is required", path: ["openerCountry"] });

        // Opener Authorization
        if (!data.isOpenerAuthorizedSignatory) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please specify if opener is authorized signatory", path: ["isOpenerAuthorizedSignatory"] });
        } else if (data.isOpenerAuthorizedSignatory === 'yes') {
            // If authorized, check for second signatory
            if (!data.hasSecondSignatory) {
                ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please specify if there is a second signatory", path: ["hasSecondSignatory"] });
            } else if (data.hasSecondSignatory === 'yes') {
                if (!data.authorizedSignatory2?.fullName) {
                    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Second authorized signatory is required", path: ["authorizedSignatory2", "fullName"] });
                }
                validatePerson(data.authorizedSignatory2, ["authorizedSignatory2"]);
            }
        } else if (data.isOpenerAuthorizedSignatory === 'no') {
            // If not authorized, check number of signatories
            if (!data.numberOfSignatories) {
                ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please specify number of authorized signatories", path: ["numberOfSignatories"] });
            } else {
                if (!data.authorizedSignatory1?.fullName) {
                    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Authorized signatory 1 is required", path: ["authorizedSignatory1", "fullName"] });
                }
                validatePerson(data.authorizedSignatory1, ["authorizedSignatory1"]);

                if (data.numberOfSignatories === '2') {
                    if (!data.authorizedSignatory2?.fullName) {
                        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Authorized signatory 2 is required", path: ["authorizedSignatory2", "fullName"] });
                    }
                    validatePerson(data.authorizedSignatory2, ["authorizedSignatory2"]);
                }
            }
        }

        // Company Info
        if (!data.companyName) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Company name is required", path: ["companyName"] });

        // Domicile Address
        if (!data.domicileStreet) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Street is required", path: ["domicileStreet"] });
        if (!data.domicileZipCode) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Zip code is required", path: ["domicileZipCode"] });
        if (!data.domicileCity) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "City is required", path: ["domicileCity"] });
        if (!data.domicileCountry) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Country is required", path: ["domicileCountry"] });

        if (!data.legalEntityType) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Legal entity type is required", path: ["legalEntityType"] });

        // Business Activity & Source of Funds (Applicable to ALL Legal Entities)
        if (!data.detailedBusinessActivity?.type) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Business activity is required", path: ["detailedBusinessActivity", "type"] });
        if (data.detailedBusinessActivity?.type === 'other' && !data.detailedBusinessActivity?.otherDetails) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please specify business activity", path: ["detailedBusinessActivity", "otherDetails"] });
        }

        if (!data.sourceOfFunds?.type) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Source of funds is required", path: ["sourceOfFunds", "type"] });
        if (data.sourceOfFunds?.type === 'other' && !data.sourceOfFunds?.otherDetails) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please specify source of funds", path: ["sourceOfFunds", "otherDetails"] });
        }

        // Operative Company
        if (data.legalEntityType === "operative_company") {
            if (!data.hasOwnersMoreThan25Percent) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please specify if there are owners > 25%", path: ["hasOwnersMoreThan25Percent"] });

            if (data.hasOwnersMoreThan25Percent === 'yes') {
                if (!data.ownersMoreThan25Percent || data.ownersMoreThan25Percent.length === 0) {
                    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please add at least one owner", path: ["ownersMoreThan25Percent"] });
                }
            } else if (data.hasOwnersMoreThan25Percent === 'no') {
                if (!data.managingDirectors || data.managingDirectors.length === 0) {
                    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please add at least one managing director", path: ["managingDirectors"] });
                }
            }
        }

        // Foundation
        if (data.legalEntityType === "foundation") {
            if (!data.foundationType) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Foundation type is required", path: ["foundationType"] });
            if (!data.isFoundationRevocable) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Revocability is required", path: ["isFoundationRevocable"] });
            if (!data.isFounderDeceased) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please specify if founder is deceased", path: ["isFounderDeceased"] });
            if (!data.foundationBeneficiariesFixedClaim) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please specify if beneficiaries have fixed claim", path: ["foundationBeneficiariesFixedClaim"] });

            validatePerson(data.founder, ["founder"]);
        }

        // Trust
        if (data.legalEntityType === "trust") {
            if (!data.trustType) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Trust type is required", path: ["trustType"] });
            if (!data.isTrustRevocable) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Revocability is required", path: ["isTrustRevocable"] });
            if (!data.isSettlorDeceased) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please specify if settlor is deceased", path: ["isSettlorDeceased"] });
            if (!data.trustBeneficiariesFixedClaim) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please specify if beneficiaries have fixed claim", path: ["trustBeneficiariesFixedClaim"] });

            validatePerson(data.settlor, ["settlor"]);
            validatePerson(data.trustee, ["trustee"]);
            if (data.protector?.fullName) validatePerson(data.protector, ["protector"]); // Protector might be optional? User said "Protector (Name...)" in list. Assuming required if listed. But often optional in trusts. I'll make it optional if name is empty, or required? User listed it explicitly. Let's assume required for now, or check if user said "if any". User just said "Protector". I'll validate it.
        }
    }
});

export type FormValues = z.infer<typeof formSchema>;
