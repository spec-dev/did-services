const addressToUserId = address => address

const formatDidRecord = (address, didData = {}) => {
    const { domain, provider, textRecords = {} } = didData
    return {
        userId: addressToUserId(address),
        domain,
        provider,
        email: textRecords.email,
        url: textRecords.url,
        avatar: textRecords.avatar,
        name: textRecords.name,
        description: textRecords.description,
    }
}

module.exports = {
    addressToUserId,
    formatDidRecord,
}