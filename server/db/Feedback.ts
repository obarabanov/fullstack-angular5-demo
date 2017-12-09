import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Feedback = mongoose.model('Feedback', new Schema({

    hostName: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: false
    },
    communication: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    },
    atmosphere: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    },
    valueForMoney: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    }

}));
export default Feedback;
