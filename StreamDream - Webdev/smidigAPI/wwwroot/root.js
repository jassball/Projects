const localhostURL = "http://localhost:5233";

const getAllStorePackages = document.getElementById("getAllPackagesBtn").onclick = async() => {
    try {
        const response = await axios.get(`${localhostURL}/StoreItem`)
        const allStorePackages = response.data
        console.log(allStorePackages)
    } catch (error) {
        console.log(error)
    }
}

const getPackageByIdBtn = document.getElementById("getPackageByIdBtn").onclick = async() => {
    const input = document.getElementById("getPackageById").value
    try {
        const response = await axios.get(`${localhostURL}/StoreItem/${input}`)
        const packageData = response.data
        console.log(packageData)
    } catch (error) {
        console.log(error)
    }
}

const createNewPackageBtn = document.getElementById("createPackageBtn").onclick = async() => {
    const newPackageTitle = document.getElementById("newPackageTitle").value
    const newPackageType = document.getElementById("newPackageType").value;
    const newPackageShortDesc = document.getElementById("newPackageShortDesc").value
    const newPackageLongDesc = document.getElementById("newPackageLongDesc").value
    const newPackagePrice = document.getElementById("newPackagePrice").value
    const newPackageRating = document.getElementById("newPackageRating").value
    const newPackageImage = document.getElementById("newPackageImage")

    try {
        let fd = new FormData()
        fd.append("file", newPackageImage.files[0])
        axios.post(`${localhostURL}/StoreItem/image`, fd)

        const newPackage = {
            id: ``,
            title: `${newPackageTitle}`,
            type: `${newPackageType}`, 
            shortDesc: `${newPackageShortDesc}`,
            longDesc: `${newPackageLongDesc}`, 
            price: `${newPackagePrice}`,
            rating: `${newPackageRating}`,
            image: `${newPackageImage.files[0].name}`
        }

        const addNewPackage = await axios.post(`${localhostURL}/StoreItem`, newPackage)
    } catch (error) {
        console.log(error)
    }
}

const updateGetPackageBtn = document.getElementById("updateGetPackageByIdBtn").onclick = async() => {
    const input = document.getElementById("updateGetPackageById").value
    const title = document.getElementById("updatePackageTitle")
    const type = document.getElementById("updatePackageType")
    const shortDesc = document.getElementById("updatePackageShortDesc")
    const longDesc = document.getElementById("updatePackageLongDesc")
    const price = document.getElementById("updatePackagePrice")
    const rating = document.getElementById("updatePackageRating")
    const image = document.getElementById("updatePackageImage")
    const updateBtn = document.getElementById("updatePackageBtn")

    try {
        const response = await axios.get(`${localhostURL}/StoreItem/${input}`)
        const packageData = response.data
        title.disabled = false
        type.disabled = false
        shortDesc.disabled = false
        longDesc.disabled = false
        price.disabled = false
        rating.disabled = false
        image.disabled = false
        updateBtn.disabled = false
        title.placeholder = packageData.title
        type.value = packageData.type;
        shortDesc.placeholder = packageData.shortDesc
        longDesc.placeholder = packageData.longDesc
        price.placeholder = packageData.price
        rating.placeholder = packageData.rating
        
        console.log(packageData)
    } catch (error) {
        console.log(error)
    }
}

const updateStorePackageBtn = document.getElementById("updatePackageBtn").onclick = async() => {
    const packageId = document.getElementById("updateGetPackageById").value
    let updateTitle = document.getElementById("updatePackageTitle").value
    let updateType = document.getElementById("updatePackageType").value;
    let updateShortDesc = document.getElementById("updatePackageShortDesc").value
    let updateLongDesc = document.getElementById("updatePackageLongDesc").value
    let updatePrice = document.getElementById("updatePackagePrice").value
    let updateRating = document.getElementById("updatePackageRating").value
    const updateImage = document.getElementById("updatePackageImage")

    try {
        const oldPackage = await axios.get(`${localhostURL}/StoreItem/${packageId}`)
        const oldPackageData = oldPackage.data

        let oldTitle = oldPackageData.title
        let oldType = oldPackageData.type
        let oldShortDesc = oldPackageData.shortDesc
        let oldLongDesc = oldPackageData.longDesc
        let oldPrice = oldPackageData.price
        let oldRating = oldPackageData.rating
        let oldImage = oldPackage.image
        let currentImage
        

        if (updateTitle != "") {}else{updateTitle = oldTitle}
        if (updateType != "") {}else{updateType = oldType}
        if (updateShortDesc != "") {}else{updateShortDesc = oldShortDesc}
        if (updateLongDesc != "") {}else{updateLongDesc = oldLongDesc}
        if (updatePrice != "") {}else{updatePrice = oldPrice}
        if (updateRating != "") {}else{updateRating = oldRating}
        if (updateImage.files.length == 0) {
            currentImage = oldImage
        } else {
            let fd = new FormData()
            fd.append("file", updateImage.files[0])
            axios.post(`${localhostURL}/StoreItem/image`, fd)
            currentImage = updateImage.files[0].name
        }

        const updatedPackage = {
            id: `${packageId}`,
            title: `${updateTitle}`,
            type: `${updateType}`,
            shortDesc: `${updateShortDesc}`,
            longDesc: `${updateLongDesc}`,
            price: `${updatePrice}`,
            rating: `${updateRating}`,
            image: `${currentImage}`
        }

        const insertUpdatePackage = await axios.put(`${localhostURL}/StoreItem/${packageId}`, updatedPackage)
    } catch (error) {
        console.log(error)
    }
}

const removePackage = document.getElementById("removePackageByIdBtn").onclick = async() => {
    const input = document.getElementById("removePackageById").value
    try {
        const response = await axios.delete(`${localhostURL}/StoreItem/${input}`)

        console.log("Package deleted")
    } catch (error) {
        console.log(error)
    }
}