// Start function calculateSubnetMask
function calculateSubnetMask() {
    var attendeesInput = document.getElementById("attendees");
    var subnetMaskOutput = document.getElementById("subnetMask");
    var resultDiv = document.getElementById("result");

    var attendees = parseInt(attendeesInput.value);

    if (isNaN(attendees) || attendees <= 0) {
        subnetMaskOutput.textContent = "Please enter a valid number of attendees.";
        resultDiv.style.display = "block";
        return;
    }

    var subnet = calculateSubnet(attendees);

    subnetMaskOutput.innerHTML = "Binary: " + subnet.binary + "<br>Subnet Mask: " + subnet.decimal;
    resultDiv.style.display = "block";
}

function calculateSubnet(attendees) {
    var hostBits = Math.ceil(Math.log2(attendees)); // Calculate the number of host bits needed
    var subnetBits = 32 - hostBits; // Calculate the number of subnet bits

    var subnetMask = "";
    var binarySubnetMask = "";

    for (var i = 0; i < 4; i++) {
        var octetBits = Math.min(subnetBits, 8);
        var octet = 256 - Math.pow(2, 8 - octetBits);
        subnetMask += octet;
        binarySubnetMask += octet.toString(2).padStart(8, "0"); // Convert octet to binary and pad with zeros
        subnetBits -= octetBits;
        if (i < 3) {
            subnetMask += ".";
            binarySubnetMask += ".";
        }
    }

    return {
        decimal: subnetMask,
        binary: binarySubnetMask
    };
}
// End function calculateSubnetMask

// Start function calculate
function calculate() {
    var input = parseInt(document.getElementById("input").value);

    // Generate binary representation
    var binary = "1".repeat(input) + "0".repeat(32 - input);
    document.getElementById("binary").textContent = "Binary: " + formatBinary(binary);

    // Convert binary to subnet mask
    var subnetMask = convertToSubnetMask(binary);
    document.getElementById("subnetMask").textContent = "Subnet Mask: " + subnetMask;

    // Calculate power of 2
    var power = 32 - input;
    var result = Math.pow(2, power);
    document.getElementById("power").textContent = "2^" + power + " = " + result.toLocaleString();
}

function convertToSubnetMask(binary) {
    var subnetMask = "";

    for (var i = 0; i < 32; i += 8) {
        var octet = binary.substr(i, 8);
        subnetMask += parseInt(octet, 2);

        if (i < 24) {
            subnetMask += ".";
        }
    }

    return subnetMask;
}

function formatBinary(binary) {
    var formatted = "";
    for (var i = 0; i < binary.length; i += 8) {
        formatted += binary.substr(i, 8) + ".";
    }
    return formatted.slice(0, -1);
}
// End function calculate

// Start function generateIPs
function generateIPs() {
    var ipAddress = document.getElementById("ipAddress").value;

    var ipParts = ipAddress.split(".");
    ipParts = ipParts.map(function (part) {
        return parseInt(part);
    });

    var generatedIPs = [];
    for (var i = 0; i < 6; i++) {
        generatedIPs.push(ipParts.join("."));
        ipParts[3] += 1;
        if (ipParts[3] > 255) {
            ipParts[3] = 0;
            ipParts[2] += 1;
            if (ipParts[2] > 255) {
                ipParts[2] = 0;
                ipParts[1] += 1;
                if (ipParts[1] > 255) {
                    ipParts[1] = 0;
                    ipParts[0] += 1;
                }
            }
        }
    }

    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    if (generatedIPs.length > 0) {
        var table = document.createElement("table");
        var headerRow = document.createElement("tr");
        var headerCell1 = document.createElement("th");
        var headerCell2 = document.createElement("th");
        headerCell1.textContent = "Generated IP Address";
        headerCell2.textContent = "Index";
        headerRow.appendChild(headerCell1);
        headerRow.appendChild(headerCell2);
        table.appendChild(headerRow);

        for (var j = 0; j < generatedIPs.length; j++) {
            var row = document.createElement("tr");
            var cell1 = document.createElement("td");
            var cell2 = document.createElement("td");
            cell1.textContent = generatedIPs[j];
            cell2.textContent = j + 1;
            row.appendChild(cell1);
            row.appendChild(cell2);
            table.appendChild(row);
        }

        resultDiv.appendChild(table);
    } else {
        resultDiv.textContent = "No IP addresses generated.";
    }
}

var ipAddressInput = document.getElementById("ipAddress");
ipAddressInput.addEventListener("input", generateIPs);
// End function generateIPs

// Function to calculate and update the subnet information
function updateSubnetInfo() {
    const input = document.getElementById("ipInput").value;
    const [ip, cidr] = input.split("/");

    // Calculate subnet mask in binary
    const subnetMaskBinary = "1".repeat(cidr).padEnd(32, "0");
    const subnetMask = convertBinaryToIP(subnetMaskBinary);

    // Calculate network and broadcast IPs
    const ipBinary = convertIPToBinary(ip);
    const networkIPBinary = ipBinary.substr(0, cidr).padEnd(32, "0");
    const broadcastIPBinary = ipBinary.substr(0, cidr).padEnd(32, "1");
    const networkIP = convertBinaryToIP(networkIPBinary);
    const broadcastIP = convertBinaryToIP(broadcastIPBinary);

    // Output results
    document.getElementById("binaryOutput").textContent = `Binary: ${subnetMaskBinary.slice(0, 8)}.${subnetMaskBinary.slice(8, 16)}.${subnetMaskBinary.slice(16, 24)}.${subnetMaskBinary.slice(24)}`;
    document.getElementById("subnetMaskOutput").textContent = `Subnet Mask: ${subnetMask}`;
    document.getElementById("networkIPOutput").textContent = `Network IP: ${networkIP}`;
    document.getElementById("broadcastIPOutput").textContent = `Broadcast IP: ${broadcastIP}`;
}

// Function to convert IP address to binary
function convertIPToBinary(ip) {
    return ip.split(".").map((part) => parseInt(part).toString(2).padStart(8, "0")).join("");
}

// Function to convert binary to IP address
function convertBinaryToIP(binary) {
    const parts = binary.match(/.{1,8}/g).map((part) => parseInt(part, 2));
    return parts.join(".");
}

// Listen for changes in the input field and update the subnet information
document.getElementById("ipInput").addEventListener("input", updateSubnetInfo);

// Initial calculation when the page loads
updateSubnetInfo();



