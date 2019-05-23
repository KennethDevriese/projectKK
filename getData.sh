#!/bin/bash
TEMP=$(/usr/sbin/i2cget -y 1 0x48 0 b)
TEMP=$((TEMP))
echo $TEMP
