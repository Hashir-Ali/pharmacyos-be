import { randomInt } from 'crypto';
import { Drug } from 'src/drug/entities/drug.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Drug, (faker)=>{
    const drugNames: string[] = [
        'Omeprazole_Cap', 
        'Dressit Ster Dress Pack', 
        "Flaminal Forte",
        "Co-Magaldrox_Susp",
        "Antacid/Oxetacaine_Oral Susp",
        "Simeticone_Susp",
        "Infacol_Susp",
        "Gppe Liq_Gaviscon",
        "Sod Algin/Pot Bicarb_Susp",
        "Sod Alginate/Pot Bicarb_Tab Chble",
        "Gastrocote_Tab",
        "Gaviscon Infant_Sach",
        "Gaviscon Advance_Liq",
        "Gaviscon_Liq Sach",
        "Gaviscon Advance_Liq",
        "Gaviscon Advance_Tab",
        "Topal_Antacid Tab",
        "Peptac_Liq (Aniseed)",
        "Peptac_Liq (Peppermint)",
        "Alverine",
        "Dicycloverine",
        "Dicycloverine HCl_Tab",
        "Hyoscine Butylbrom_Inj",
        "Buscopan_Tab",
        "Mebeverine HCl_Tab",
        "Mebeverine HCl_Cap",
        "Cimetidine_Tab 400mg",
    ];

    const drug = new Drug();

    drug.name = drugNames[randomInt(drugNames.length-1)];
    drug.dosage = randomInt(500);
    drug.dosageUnit = faker.science.unit().symbol;
    drug.dosageForm = 'Film Coated Tablets';
    drug.BNFCode = faker.number.int({ min: 1000000 }).toString();
    drug.fullDescription = faker.commerce.productDescription();
    drug.containerSize = randomInt(20);
    drug.location = faker.location.zipCode();
    drug.drugEAN = faker.number.int({ min: 1000000 });

    return drug;
});