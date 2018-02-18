/*
__drum object__
drumType can contain different drum sounds from various libraries, could become
pattern has drum, velocity with default 5 and range 0-10, and on/off using booleans
steps can be 8, 16, 32, 64 should have a upper limit with default 8
mute is per drum with default false
solo is per drum with default false
volume is per drum with default 5
overall velocity with default 5
*/


If I was serious about speed, I would use for loops instead of maps as for loops are some 40% faster.
https://jsperf.com/map-vs-for-loop-performance/6
Since this is a coding challenge with just 3 drums, map is more readable and is shorter to type.