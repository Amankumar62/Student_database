const Student = require('../app/student');
const assert = require('assert');

describe('Create records', () => {
    it('create a user in DB', () => {
        // assert(false);
        const sam = new Student({ name: "Sam" });
        sam.save()
            .then(() => {
                assert(!sam.isNew)
            })
            .catch(() => {
                console.log("error");
            });
    });
});

//All read tests

describe("Read test", () => {
    let reader;
    beforeEach((done) => {
        reader = Student({ name: "Reader" })
        reader.save()
            .then(() => {
                done();
            });
    });
    it("read a user: Reader", (done) => {
        Student.find({ name: "Reader" })
            .then((student) => {
                //id is bson value
                assert(reader._id.toString() === student[0]._id.toString());
                done();
            });
    });
});

//All delete test
describe("Delete test", () => {

    let deleter;
    beforeEach((done) => {
        deleter = new Student({name: "Deleter"});
        deleter.save()
        .then(()=>{
            done();
        });
    });

    it("Delete the user : deleter",done =>{
            Student.findByIdAndDelete(deleter._id)
            .then(() =>Student.findOne({name: "Deleter"}))
            .then(student => {
            assert(student === null);
            done();
        });
    });
});

//All update test

describe("Update tests ",() =>{
    let updater;
    beforeEach((done) => {
        updater = new Student({name: "Updater"});
        updater.save()
        .then(() => done())
    })
    it('set n save test',() => {
        updater.set('name',"UpUpdater");
        updater.save()
        .then(() => Student.find({}))
        .then(students => {
            assert(studens[0].name !== 'Updater');
        });
    });
});