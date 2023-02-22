const mongoose = require('mongoose');
const ArtCollectionsSchema = new mongoose.Schema({
    collection_title: String,
    artCollectionss_name: String,
    artCollectionss_short_desc: String,
    artCollectionss_category: String,
    artCollectionss_price: Number,
    collectionsImg: String,
    user: String,
    contractAddress: String,
    type: {
        type: String, default: "Fixed Price"
    },
    selling_type: {
        type: String, default: "First TIme Sell"
    },
    bid_amount_in_usd: {
        type: String, default: "N/A"
    },
    status: {
        type: String, default: "Draft"
    }

});

const arts = new mongoose.model("own-nfts", ArtCollectionsSchema);
module.exports = arts;