const addressToUserId = address => address

const formatDidRecord = (address, didData = {}) => ({
    userId: addressToUserId(address),
    domain: didData.domain,
    provider: didData.provider,
    email: didData.email,
    url: didData.url,
    avatar: didData.avatar,
    name: didData.name,
    description: didData.description,
})

module.exports = {
    addressToUserId,
    formatDidRecord,
}