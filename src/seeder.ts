import { NestFactory } from "@nestjs/core";
import { SeederModule } from "./database/seeder/seeder.module";
import { DBSeeder } from "./database/seeder/seeder_db.service";
import { exit } from "process";

async function bootstrap (){

    const appContext = await NestFactory.createApplicationContext(SeederModule);
    const seeder = appContext.get(DBSeeder);
    await seeder.seed(20);
    console.log('Seeding Completed');
    await appContext.close();
    //as per documentation we don't need manual process exit.
    //But nestJs close() process is not working for us
    exit();
}

bootstrap();