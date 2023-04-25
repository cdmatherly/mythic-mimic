const { Campaign } = require("../models/campaign.model")

// get all campaigns
module.exports.getAllCampaigns = (req, res) => {
    Campaign.find()
        .then((campaigns) => {
            return res.json(campaigns)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}

// get campaign by ID
module.exports.getCampaignById = (req, res) => {
    Campaign.findById(req.params.id)
        .then((campaign) => {
            return res.json(campaign)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}

// Create a new campaign
module.exports.createCampaign = (req, res) => {
    Campaign.create(req.body)
        .then(campaign => {
            return res.json(campaign)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}

// Edit a campaign
module.exports.updateCampaignById = (req, res) => {
    Campaign.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
        .then((campaign) => {
            return res.json(campaign)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}

// Delete a campaign
module.exports.deleteCampaign = (req, res) => {
    Campaign.findByIdAndDelete(req.params.id)
        .then((campaign) => {
            return res.json(campaign)
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
}