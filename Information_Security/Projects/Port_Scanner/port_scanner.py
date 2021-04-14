import socket
import pyfiglet
from datetime import datetime
import common_ports

# Banner for Port Scanner
ascii_banner = pyfiglet.figlet_format("PORT SCANNER")
print(ascii_banner)

# Create socket object using IPv4 and TCP
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# Scan timeout value
s.settimeout(5)

def get_open_ports(target, port_range, verbose=False):
    start, stop = port_range[0], port_range[-1]
    open_ports = []

    # Add Banner
    print("\n" + ("-" * 70))
    print(f"Scanning Target {target} on Ports {start} through {stop}")
    print("Scanning started at: ", str(datetime.now()))
    print("-" * 70)

    try:
        # Scan ports and add open ports to list
        for port in range(start, stop + 1):
            if s.connect_ex((target, port)):
                open_ports.append(port)
        if verbose: # Return formatted verbose text
            port_dict = {'PORT': 'SERVICE'}
            for port in open_ports:
                if port in common_ports:
                    port_dict[port] = common_ports[port]
                else:
                    port_dict[port] = ''
            return "Open ports for {"
        else: # Return just the list of open ports
            return open_ports
    except socket.gaierror:
        if target.split('.')[-1].isdigit():
          try:
              socket.inet_aton(target) # Check if IP is valid
          except:
            return "Error: Invalid IP address."
        else:
            return "Error: Invalid hostname."