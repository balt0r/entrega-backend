import { faker } from "@faker-js/faker";

class UsersManager {
  #all = [];
  create = () => {
    try {
      const fullName = faker.person.fullName().toLowerCase().split(" ");
      const user = {
        _id: faker.database.mongodbObjectId(),
        name: fullName[0],
        lastName: fullName[1],
        email: fullName.join(".") + "@coder.com",
        password: "hola1234",
        age: faker.number.int({ min: 18, max: 70 }),
        avatar: faker.image.avatar(),
        role: faker.helpers.arrayElement(["user", "admin", "premium"]),
      };
      this.#all.push(user);
      return user;
    } catch (error) {
      throw error;
    }
  };
  readAll = ()=> {
    try {
        return this.#all
    } catch (error) {
        throw error
    }
  }
}

const usersManager = new UsersManager();
export default usersManager;