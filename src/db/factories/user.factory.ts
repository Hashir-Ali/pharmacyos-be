import { User } from "src/users/user.entity";
import { setSeederFactory } from "typeorm-extension";

export default setSeederFactory(User, (faker)=>{
    const user = new User();

    user.first_name = faker.person.firstName();
    user.last_name = faker.person.lastName();
    // user.email = faker.
    // need to figure out random emails...
    // need to encrypt the password...
    
    return user;
})