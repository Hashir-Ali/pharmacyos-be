import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { DrugOrder } from './entities/drug_order.entity';
import { DrugDistributorService } from './../drug_distributor/drug_distributor.service';
import { DistributorService } from './../distributor/distributor.service';
import { UsersService } from 'src/users/users.service';
import { CreateDrugOrderDto } from './dto/create-drug_order.dto';
import { SortOrder } from 'src/drug/drug.controller';

@Injectable()
export class DrugOrderService {
  constructor(
    @InjectRepository(DrugOrder)
    private DrugOrderRepository: MongoRepository<DrugOrder>,
    private UserService: UsersService,
    private DistributorService: DistributorService,
    private DrugDistributorService: DrugDistributorService,
  ) {}

  async create(CreateDrugOrderDto: CreateDrugOrderDto) {
    // update drug here.. for last_order...
    // await this.drugService.updateDrug(CreateDrugOrderDto.drugId, {
    //   status: false,
    //   name: drug.name,
    //   dosage: drug.dosage,
    //   dosageUnit: drug.dosageUnit,
    //   dosageForm: drug.dosageForm,
    //   BNFCode: drug.BNFCode,
    //   fullDescription: drug.fullDescription,
    //   containerSize: drug.containerSize,
    //   location: drug.location,
    //   drugEAN: drug.drugEAN,
    //   last_order: drug.last_order,
    //   rule_type: drug.rule_type,
    // });
    // above creates a circular dependency...!
    return await this.DrugOrderRepository.save(CreateDrugOrderDto);
  }

  async findAll(
    page: string,
    limit: string,
    sortOrder: SortOrder,
    filters: any = {},
  ) {
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const regex = new RegExp(filters.filters, 'i');
    // populate distributor name using supplierId field..
    // get type from drug distributor on basis of drugId and distributorId field..
    const [orders, number] = await this.DrugOrderRepository.findAndCount({
      where: filters.filters ? { quantityOrdered: { $regex: regex } } : {},
      skip: skip,
      take: parseInt(limit),
      order: {
        expected_delivery_date:
          sortOrder && sortOrder.length > 0 && sortOrder !== 'undefined'
            ? sortOrder
            : 'ASC',
      },
    });
    const populatedOrders = await this.populateOrders(orders);

    return [...populatedOrders, number];
  }

  async findDrugOrders(drugId: string) {
    const orders = await this.DrugOrderRepository.find({
      where: { drugId: new ObjectId(drugId) },
    });
    return await this.populateOrders(orders);
  }

  async findCurrentYearOrders(drugId: string){
    const d = new Date();
    const orders = await this.DrugOrderRepository.find({
      where: {
        drugId: new ObjectId(drugId),
        created_at: { $gte: new Date(d.getFullYear(), 0, 1) },
        quantityReceived: { $gte: 0 },
      }
    });

    return await this.populateOrders(orders);
  }

  async getCurrentYearReceivedOrders(drugId: string) {
    const d = new Date();
    const orders = await this.DrugOrderRepository.find({
      where: {
        drugId: new ObjectId(drugId),
        isReceived: true,
        created_at: { $gte: new Date(d.getFullYear(), 0, 1) },
        quantityReceived: { $gte: 0 },
      },
    });

    return await this.populateOrders(orders);
  }

  async findOne(id: string | ObjectId) {
    // populate distributor name using supplierId field..
    // get type from drug distributor on basis of drugId and distributorId field..
    // get user data from ordered by (id field of registered user)..
    const drug_order = await this.DrugOrderRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
    return drug_order
      ? await this.populateOrders([drug_order])
      : new NotFoundException();
  }

  async populateOrders(orders: DrugOrder[]) {
    return await Promise.all(
      orders.map(async (value, index) => {
        const distributor = await this.DistributorService.findOneById(
          value?.supplierId,
        );
        const ordered_by = await this.UserService.findOne(value.ordered_by);
        const type = await this.DrugDistributorService.getType(
          value.drugId,
          value.supplierId,
        );
        const { supplierId, drugId, ...result } = value;

        return {
          ...result,
          From: distributor?.name,
          ordered_by: ordered_by,
          type: type,
        };
      }),
    );
  }

  async insertMany(objectDto: DrugOrder[]) {
    const savedData = await this.DrugOrderRepository.insertMany(objectDto);
    return savedData;
  }
}
