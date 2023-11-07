import chai from "chai";
const expect = chai.expect;

import StoreService from "../src/services/store.services";

const storeServices = new StoreService();

describe("Store Functions", () => {
    describe("createStore", () => {
        it("should create a new store", async () => {
            const userId = '63edsvw4f342vw24ef'
            const store = {
                name: "John Ventures",
                description: "A place to get all your needs",
                address: {
                    street: "Oluyole way",
                    city: "Ibadan",
                    state: "Oyo",
                    country: "Nigeria"
                },
            };
            const next = () => { };
            const newStore = await storeServices.createStore(userId, store, next);
            expect(newStore).to.be.an("object");
            expect(newStore).to.have.property("name");
            expect(newStore).to.have.property("description");
            expect(newStore).to.have.property("address");
            expect(newStore).to.have.property("user_id");
        })
    });

    describe("getStoreById", () => {
        it("should return a store by id", async () => {
            const userId = '63edsvw4f342vw24ef'
            const next = () => { };
            const store = await storeServices.getUserStoreById(userId, next);
            expect(store).to.be.an("array");
        })
    });

})