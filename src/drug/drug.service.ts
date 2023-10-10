import { DrugOrderService } from './../drug_order/drug_order.service';
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { CreateDrugDto } from './dto/create-drug.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Drug } from './entities/drug.entity';
import { ObjectId } from 'mongodb';
import { randomInt } from 'crypto';
import { faker } from '@faker-js/faker';

@Injectable()
export class DrugService {
  constructor(
    @InjectRepository(Drug)
    private drugRepository: MongoRepository<Drug>,
    @Inject(forwardRef(()=>DrugOrderService))
    private drugOrderService: DrugOrderService
  ){}

  // commented for later use...!
  async create(createDrugDto: CreateDrugDto) {
    return await this.drugRepository.save(createDrugDto);
  }

  findAll() {
    return this.drugRepository.find();
  }

  async findOne(id: string) {
    const Drug = await this.drugRepository.findOne({where: {_id: new ObjectId(id)}});

    const drugOrders = await this.drugOrderService.findDrugOrders(id);
    return {...Drug, orders: drugOrders};
  }

  async seedDrug(seedCount: number){
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
    // loop till seedCount.
    // create array of objectDTO...
    // pass objectDto to saveMany function...
    const objectDTO: Drug[]= [];

    for( let i = 0; i <= seedCount; i++ ){
        objectDTO.push(
          {
            name: drugNames[randomInt(drugNames.length-1)],
            dosage: randomInt(500),
            dosageUnit: faker.science.unit().symbol,
            dosageForm: 'Film coated Tablets',
            BNFCode: faker.number.int({min: 1000000}).toString(),
            fullDescription: faker.commerce.productDescription(),
            containerSize: randomInt(20),
            location: faker.location.zipCode(),
            drugEAN: faker.number.int({min: 1000000}),
            created_at: faker.date.recent(),
            Updated_at: faker.date.recent(),
            is_enabled: faker.datatype.boolean(0.75), // 0-1 : 0.75 means 75% of true boolean value...
          }
        );
    }
    const seedThem = await this.drugRepository.insertMany(objectDTO);
    return seedThem;
  }
}
