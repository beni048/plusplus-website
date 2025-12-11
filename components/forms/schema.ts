import * as z from 'zod';

export type PersonSchemaType = z.infer<ReturnType<typeof getPersonSchema>>;

const getPersonSchema = (t: (key: string) => string) => z.object({
    fullName: z.string().optional(), // We make fields optional here to handle empty strings from UI, but validate them in superRefine
    street: z.string().optional(),
    houseNumber: z.string().optional(),
    zipCode: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    dateOfBirth: z.string().optional(),
    nationality: z.string().optional(),
});

export const getFormSchema = (t: (key: string, values?: any) => string) => z.object({
    entityType: z.enum(["natural_person", "legal_entity"]),

    // Natural Person Fields
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
    idDocumentType: z.enum(["passport", "id"]).optional(),

    amlProfile: z.object({
        profession: z.string().optional(),
        estimatedIncome: z.string().optional(),
        estimatedWealth: z.string().optional(),
        estimatedLiabilities: z.string().optional(),
        originOfAssets: z.object({
            category: z.enum(['salary_employment', 'savings', 'investment_capital_gains', 'real_estate_sale', 'company_sale', 'inheritance_gift', 'loan', 'lottery_gambling', 'other']).optional(),
            otherExplanation: z.string().optional(),


        }).optional(),
        plannedTransactionVolume: z.string().optional(),
        relationshipPurpose: z.object({
            type: z.enum(['wealth_preservation', 'capital_appreciation', 'income_generation', 'diversification', 'transactional_banking', 'asset_management', 'other']).optional(),
            otherDetails: z.string().optional()
        }).optional(),
        thirdPartyRelations: z.object({
            type: z.enum(['no_beneficial_owner', 'advisor_attorney', 'family_member', 'business_partner', 'trustee', 'other']).optional(),
            otherDetails: z.string().optional()
        }).optional(),
    }).optional(),

    // Legal Entity Fields
    companyName: z.string().optional(),
    legalEntityType: z.enum([
        "operative_company",
        "domiciliary_company",
        "insurance_wrapper",
        "foundation",
        "trust",
        "partnership"
    ]).optional(),
    commercialRegisterNumber: z.string().optional(),
    dateOfIncorporation: z.string().optional(),
    domicileStreet: z.string().optional(),
    domicileHouseNumber: z.string().optional(),
    domicileZipCode: z.string().optional(),
    domicileCity: z.string().optional(),
    domicileCountry: z.string().optional(),

    // Opener Details (The person filling the form)
    openerFirstName: z.string().optional(),
    openerLastName: z.string().optional(),
    openerFunction: z.string().optional(), // Director, etc.
    isOpenerAuthorizedSignatory: z.enum(["yes", "no"]).optional(),
    hasSecondSignatory: z.enum(["yes", "no"]).optional(),
    numberOfSignatories: z.enum(["1", "2"]).optional(),

    openerStreet: z.string().optional(),
    openerHouseNumber: z.string().optional(),
    openerZipCode: z.string().optional(),
    openerCity: z.string().optional(),
    openerCountry: z.string().optional(),
    openerDateOfBirth: z.string().optional(),
    openerNationality: z.string().optional(),

    // Authorized Signatories
    authorizedSignatory1: getPersonSchema(t).optional(),
    authorizedSignatory2: getPersonSchema(t).optional(),

    // Lists of People
    managingDirectors: z.array(getPersonSchema(t)).optional(),
    hasOwnersMoreThan25Percent: z.enum(["yes", "no"]).optional(),
    ownersMoreThan25Percent: z.array(getPersonSchema(t)).optional(),

    // Other lists...
    beneficialOwners: z.array(getPersonSchema(t)).optional(), // Fallback / Global list

    // Specific business fields
    detailedBusinessActivity: z.object({
        type: z.string().optional(), // Using string to allow flexible keys if enum is too large or dynamic
        otherDetails: z.string().optional()
    }).optional(),
    sourceOfFunds: z.object({
        type: z.string().optional(),
        otherDetails: z.string().optional()
    }).optional(),

    // Foundation
    foundationType: z.string().optional(), // enums handled in UI, validation below
    isFoundationRevocable: z.string().optional(),
    founder: getPersonSchema(t).optional(),
    isFounderDeceased: z.string().optional(),
    foundationBoardMembers: z.array(getPersonSchema(t)).optional(),
    foundationBeneficiaries: z.array(getPersonSchema(t)).optional(),
    foundationBeneficiariesFixedClaim: z.string().optional(),
    nominationRights: z.array(getPersonSchema(t)).optional(),

    // Trust
    trustType: z.string().optional(),
    isTrustRevocable: z.string().optional(),
    settlor: getPersonSchema(t).optional(),
    isSettlorDeceased: z.string().optional(),
    trustee: getPersonSchema(t).optional(),
    protector: getPersonSchema(t).optional(),
    trustBeneficiaries: z.array(getPersonSchema(t)).optional(),
    trustBeneficiariesFixedClaim: z.string().optional(),

    economicBeneficiaries: z.array(getPersonSchema(t)).optional(),

    specialClarifications: z.string().optional(),

}).superRefine((data, ctx) => {

    const validatePerson = (person: any, path: (string | number)[]) => {
        if (!person) return;

        if (!person.fullName) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.full_name_required'), path: [...path, "fullName"] });
        if (!person.street) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.street_required'), path: [...path, "street"] });
        if (!person.houseNumber) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.house_number_required'), path: [...path, "houseNumber"] });
        if (!person.city) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.city_required'), path: [...path, "city"] });
        if (!person.country) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.country_required'), path: [...path, "country"] });
        if (!person.dateOfBirth) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.dob_required'), path: [...path, "dateOfBirth"] });
        if (!person.nationality) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.nationality_required'), path: [...path, "nationality"] });
        if (!person.zipCode) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.zip_code_required'), path: [...path, "zipCode"] });
    };

    if (data.entityType === "natural_person") {
        if (!data.firstName) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.first_name_required'), path: ["firstName"] });
        if (!data.lastName) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.last_name_required'), path: ["lastName"] });
        if (!data.dateOfBirth) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.dob_required'), path: ["dateOfBirth"] });
        if (!data.nationality) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.nationality_required'), path: ["nationality"] });

        if (!data.phone) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.phone_required'), path: ["phone"] });
        if (!data.street) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.street_required'), path: ["street"] });
        if (!data.houseNumber) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.house_number_required'), path: ["houseNumber"] });
        if (!data.zipCode) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.zip_code_required'), path: ["zipCode"] });
        if (!data.city) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.city_required'), path: ["city"] });
        if (!data.country) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.country_required'), path: ["country"] });

        if (!data.email) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.email_required'), path: ["email"] });
        } else if (!z.string().email().safeParse(data.email).success) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.email_invalid'), path: ["email"] });
        }

        // AML Profile
        if (!data.amlProfile?.profession) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.profession_required'), path: ["amlProfile", "profession"] });
        if (!data.amlProfile?.estimatedIncome) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.income_required'), path: ["amlProfile", "estimatedIncome"] });
        if (!data.amlProfile?.estimatedWealth) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.wealth_required'), path: ["amlProfile", "estimatedWealth"] });
        if (!data.amlProfile?.estimatedLiabilities) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.liabilities_required'), path: ["amlProfile", "estimatedLiabilities"] });

        // Origin of Assets
        if (!data.amlProfile?.originOfAssets?.category) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.origin_category_required'), path: ["amlProfile", "originOfAssets", "category"] });



        if (!data.amlProfile?.plannedTransactionVolume) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.volume_required'), path: ["amlProfile", "plannedTransactionVolume"] });

        if (!data.amlProfile?.relationshipPurpose?.type) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.purpose_required'), path: ["amlProfile", "relationshipPurpose", "type"] });
        if (!data.amlProfile?.thirdPartyRelations?.type) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.third_party_required'), path: ["amlProfile", "thirdPartyRelations", "type"] });

    }

    if (data.entityType === "legal_entity") {
        if (!data.companyName) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.company_name_required'), path: ["companyName"] });
        if (!data.commercialRegisterNumber) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.commercial_register_number_required'), path: ["commercialRegisterNumber"] });
        if (!data.dateOfIncorporation) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.date_of_incorporation_required'), path: ["dateOfIncorporation"] });
        if (!data.legalEntityType) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.legal_entity_type_required'), path: ["legalEntityType"] });

        // Domicile Address
        if (!data.domicileStreet) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.street_required'), path: ["domicileStreet"] });
        if (!data.domicileHouseNumber) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.house_number_required'), path: ["domicileHouseNumber"] });
        if (!data.domicileZipCode) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.zip_code_required'), path: ["domicileZipCode"] });
        if (!data.domicileCity) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.city_required'), path: ["domicileCity"] });
        if (!data.domicileCountry) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.country_required'), path: ["domicileCountry"] });

        // Opener
        if (!data.openerFirstName) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.first_name_required'), path: ["openerFirstName"] });
        if (!data.openerLastName) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.last_name_required'), path: ["openerLastName"] });
        if (!data.openerFunction) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.function_required'), path: ["openerFunction"] });
        if (!data.openerDateOfBirth) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.dob_required'), path: ["openerDateOfBirth"] });
        if (!data.openerNationality) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.nationality_required'), path: ["openerNationality"] });

        if (!data.openerStreet) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.street_required'), path: ["openerStreet"] });
        if (!data.openerHouseNumber) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.house_number_required'), path: ["openerHouseNumber"] });
        if (!data.openerZipCode) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.zip_code_required'), path: ["openerZipCode"] });
        if (!data.openerCity) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.city_required'), path: ["openerCity"] });
        if (!data.openerCountry) ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.country_required'), path: ["openerCountry"] });

        // Opener Auth
        if (!data.isOpenerAuthorizedSignatory) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.is_opener_authorized_signatory_required'), path: ["isOpenerAuthorizedSignatory"] });
        }

        if (data.legalEntityType === "operative_company") {
            if (data.hasOwnersMoreThan25Percent === 'yes') {
                if (!data.ownersMoreThan25Percent || data.ownersMoreThan25Percent.length === 0) {
                    ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.owner_required'), path: ["ownersMoreThan25Percent"] });
                } else {
                    data.ownersMoreThan25Percent.forEach((person, index) => validatePerson(person, ["ownersMoreThan25Percent", index]));
                }
            } else if (data.hasOwnersMoreThan25Percent === 'no') {
                if (!data.managingDirectors || data.managingDirectors.length === 0) {
                    // FIXED: Better message than 'undefined'
                    ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.managing_director_required'), path: ["managingDirectors"] });
                } else {
                    data.managingDirectors.forEach((person, index) => validatePerson(person, ["managingDirectors", index]));
                }
            }
        }

        // Business Activity
        if (!data.detailedBusinessActivity?.type) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.business_activity_required'), path: ["detailedBusinessActivity", "type"] });
        }
        if (!data.sourceOfFunds?.type) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('messages.source_of_funds_required'), path: ["sourceOfFunds", "type"] });
        }
    }
});

export type FormValues = z.infer<ReturnType<typeof getFormSchema>>;
