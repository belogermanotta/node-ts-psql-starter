import { getConnection } from "../../../util/db";
import { Foo } from "../../../entity/Foo";

export async function getFoos() {
    const conn = await getConnection();
    const fooRepository = conn.getRepository(Foo);
    const foos = await fooRepository.find();

    return foos;
}

export async function store(data: Foo) {
    const conn = await getConnection();
    const fooRepository = conn.getRepository(Foo);

    const foo = new Foo();
    foo.id = data.id;
    foo.name = data.name;

    return await fooRepository.save(foo);
}