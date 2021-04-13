import socket
import re
import common_ports

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.settimeout(5)

def is_valid_ipv4_address(address):
    try:
        socket.inet_pton(socket.AF_INET, address)
    except AttributeError:
        try:
            socket.inet_aton(address)
        except socket.error:
            return False
        return address.count('.') == 3
    except socket.error:  # Not a valid address
        return False
    return True

def is_valid_url(url):
    regex = ("((http|https)://)(www.)?" +
             "[a-zA-Z0-9@:%._\\+~#?&//=]" +
             "{2,256}\\.[a-z]" +
             "{2,6}\\b([-a-zA-Z0-9@:%" +
             "._\\+~#?&//=]*)")

    p = re.compile(regex)

    if (str == None): # If the string is empty return false
        return False

    if(re.search(p, str)): # Return if the string matched the ReGex
        return True
    else:
        return False

def get_open_ports(target, port_range, verbose=False):
    start, stop = port_range[0], port_range[-1]
    open_ports = []

    try:
        is_valid_ipv4_address(target)
    except AssertionError:
        try:
            is_valid_url(target)
        except:
            return "Error: Invalid hostname."
    except:
        return "Error: Invalid IP address."

    for port in range(start, stop + 1):
        if s.connect_ex((target, port)):
            open_ports.append(port)
    if verbose:
        # Only thing left is to create the formatted text like shown in the instructions.
        pass
    else:
        return(open_ports)