import { Role } from "src/common/role.enum";
import { User } from "src/users/user.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export default class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ):Promise<void>
    {
        const repository = dataSource.getRepository(User);
        await repository.save({
            first_name: 'Hashir',
            last_name: 'Shah',
            email: 'testing@test.com',
            password: 'abcdefghijklmnop',
            roles: [Role.User, Role.Admin],
        });
    }
}