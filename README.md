
#Dots

When I set out to build Dots I was inspired to show a spatial relationship between groups of people. I realized quickly that social networks like Facebook are very densely connected - many of these "friendships" appear meaningless when visualized on an overcrowded graph. My intuition was to narrow down the scope of the interactions I chose. I wanted to show the user a graph that is more representative of reality than simple social network connections. For these reasons, I graphed the last few photos a user has been tagged in. Although there are some exceptions, most photo tags on Facebook are representative of a genuine moment, some real connection between people. I did not assume that the data I collect displays the full view of one's personal relationships, but it's a start.

My inspiration for this site was in part an aesthetic one. I wanted to treat Dots as an opportunity to express my creativity, especially in a medium not readily known for it - code. I hope that it is intriguing to a user from an artistic perspective and from a scientific or practical one.

![First Example](http://dots.ottosipe.com/example_2.png)

This site is certainly very dynamic. The nodes and edges act as a system of masses and springs. The dots will shift and wiggle as new data is added; it's quite cool to watch. Larger dots (people with more photo tags) will gravitate towards other larger influences. A simulation of basic physics is both practical for this application and visually stunning. The nodes seem to orbit each other and almost feel like stars in a constellation.

![Second Example](http://dots.ottosipe.com/example_3.png)

No two users will see the same patterns of data because it's inherently personal - a social signature. I encourage you to explore interesting relationships to those whom you are close with or not. I was surprised to see predictable social groupings in my own data and I even found a few non-obvious connections between my friends as I explored. Compare yourself to best friends, roommates, siblings, or significant others - the results may intrigue you.

I plan to add additional features to this visualization as this is just the beginning. Allowing users to zoom, pan, and prune groups of nodes is a priority. After that I'd like to allow users to save their data or even share a link so their friends can take a look.

Finally, I wanted to be sure to thank those who worked hard on the open source libraries I used to construct this visualization.
I used [Arbor.js](http://arborjs.org) for particle system simulations and [Meny](http://lab.hakim.se/meny) for the 3D menu animations.

Otto
