
AzTaxi AI Dispatch Module

This module selects the best driver based on:

1. Distance to passenger
2. Driver rating
3. Current workload

Score formula:

score =
(distance * 2)
+ (ratingFactor * 3)
+ (activeRides * 5)

Lower score = better driver

Usage:

const { chooseDriver } = require("./modules/ai-dispatch")

const driver = chooseDriver(pickup, drivers)
