# Design

![Design](./Design%20PostNL%20assignment.jpg)

This repo contains solution 1. Solution 2 is a possibility if there is no need to do mapping (but I am not very familiar with IOT Core and don't know how the messages are formatted (and how they can be stored)).

Queue vs. topic considerations: 
- queue to limit concurrency on lambda 
- queue guarantees message will be handled

Topic: 
- pub sub is better -> when delayed message does not need to be consumed (since next will be there already)