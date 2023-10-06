import { Distributor } from 'src/distributor/entities/distributor.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Distributor, (faker)=>{
    const distributor = new Distributor();

    distributor.name = faker.person.fullName();
    distributor.NHS_Contract_End_Date = faker.date.future();

    return distributor;
});