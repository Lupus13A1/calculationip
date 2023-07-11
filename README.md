Subnet Calculator
This subnet calculator is a JavaScript application that allows you to perform various subnet calculations. It includes the following features:
    Calculate subnet mask based on the number of attendees
    Convert a decimal number to binary and determine the corresponding subnet mask
    Generate a range of IP addresses based on a given IP address
    Calculate subnet information (subnet mask, network IP, broadcast IP) based on an IP address and CIDR notation

Usage
To use the subnet calculator, follow these steps:
    1.Open the index.html file in a web browser.
    2.Enter the required information in the input fields.
    3.Click the corresponding button to perform the desired calculation.
    4.The results will be displayed below the input fields.

Functions
'calculateSubnetMask()'
This function calculates the subnet mask based on the number of attendees. It retrieves the number of attendees from the input field, validates the input, and then calls the calculateSubnet() function to perform the calculation. The calculated subnet mask is displayed in both binary and decimal format.

'calculateSubnet(attendees)'
This function is called by the calculateSubnetMask() function. It takes the number of attendees as a parameter and calculates the subnet mask by determining the number of host bits needed and the corresponding number of subnet bits. It then constructs the subnet mask in both decimal and binary format and returns an object containing the subnet mask in both formats.

'calculate()'
This function is called when the "Calculate" button is clicked. It retrieves the input value from the corresponding input field, generates the binary representation of the input, converts the binary to a subnet mask, and calculates the power of 2. The results are displayed below the input fields.

'convertToSubnetMask(binary)'
This function takes a binary string as input and converts it to a subnet mask in decimal format. It splits the binary string into four octets, converts each octet to decimal, and joins them with periods to form the subnet mask.

'formatBinary(binary)'
This function takes a binary string as input and formats it by inserting periods every 8 bits. The formatted binary string is returned.

'generateIPs()'
This function is called when the input in the IP address field changes. It retrieves the IP address from the input field, generates a range of six IP addresses based on the input, and displays the generated IP addresses in a table.

'updateSubnetInfo()'
This function is called when the input in the IP input field changes. It retrieves the IP address and CIDR notation from the input field, calculates the subnet mask, network IP, and broadcast IP based on the input, and displays the results.

'convertIPToBinary(ip)'
This function takes an IP address in decimal format and converts it to a binary string. It splits the IP address into four parts, converts each part to binary, pads each binary string to 8 bits, and joins them to form the binary representation of the IP address.

'convertBinaryToIP(binary)'
This function takes a binary string as input and converts it to an IP address in decimal format. It splits the binary string into four octets, converts each octet to decimal, and joins them with periods to form the IP address.
