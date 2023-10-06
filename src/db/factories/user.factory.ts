import { Role } from "src/common/role.enum";
import { User } from "src/users/user.entity";
import { setSeederFactory } from "typeorm-extension";

export default setSeederFactory(User, (faker)=>{
    const user = new User();

    user.first_name = faker.person.firstName();
    user.last_name = faker.person.lastName();
    user.email = faker.internet.email({firstName: user.first_name, lastName: user.last_name});
    // need to encrypt the password...
    user.password = faker.internet.password();
    user.roles = [Role.User, Role.Admin];
   
    return user;
})