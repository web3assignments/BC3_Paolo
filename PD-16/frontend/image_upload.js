var ipfs;

function log(logstr) {
    document.getElementById('log').innerHTML += logstr + "\n";
}

async function uploadImage() {
    const reader = new FileReader();
    reader.onloadend = async function () {
        log("uploading...");
        const buff = buffer.Buffer(reader.result) // Convert data into buffer
        const result = await ipfs.add(buff).catch(log);
        console.log(`CID: ${result.path} , URL: https://ipfs.io/ipfs/${result.path}`);
    };
    const image = document.getElementById("image");
    reader.readAsArrayBuffer(image.files[0]);
}

async function getImage() {
    var ui8arr = [];
    var hash = document.getElementById("imageHashId").value;
    if (hash.length != 46) { // All ipfs CID's are 46 characters long, anything is else invalid
        alert('Please enter a valid ipfs CID before submitting!');
        return;
    }
    log(`Checking hash ${hash} via IPFS on Infura`);
    for await (const result of ipfs.cat(hash)) {
        ui8arr.push(result); // get all parts of the image
    }

    // Fill array with the found result
    for await (const result of ipfs.cat(hash)) {
        ui8arr.push(result);
    }

    console.log(ui8arr); // Log contents of array

    var blob = new Blob(ui8arr, { type: "image/jpeg" }); // convert to blob
    var url = URL.createObjectURL(blob); // make usable in img
    document.getElementById("myImage").src = url;
}

async function getHash() {
    var imageHash = document.getElementById("imageHashId").value;
    if (imageHash == "") {
        alert("image hash is empty, upload an image first!");
        return;
    }
    console.log(`Hash: ${imageHash}`);
    document.getElementById("myImage").innerText = imageHash;
}

// Check ipfs version at load
window.onload = getIpfs;
async function getIpfs() {
    log(`Connecting to IPFS`);
    ipfs = window.IpfsHttpClient("https://ipfs.infura.io:5001");
    const version = await ipfs.version().catch((x) => log(`Error: ${x}`));
    log(`IPFS Version ${JSON.stringify(version)}`);
}