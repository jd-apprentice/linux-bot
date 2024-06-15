#!/bin/bash

is_nmap_installed=$(which nmap)

if [ -z "$is_nmap_installed" ]; then
    echo "nmap is not installed. Please install nmap and try again."
    exit 1
fi

is_searchsploit_installed=$(which searchsploit)

if [ -z "$is_searchsploit_installed" ]; then
    echo "searchsploit is not installed. Please install searchsploit and try again."
    exit 1
fi

exec "$@"
