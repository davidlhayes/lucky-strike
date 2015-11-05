#This is a challenge project for NextCapital

![Screenshot](https://raw.githubusercontent.com/davidlhayes/lucky-strike/master/app/images/lucky-strike-screen.png)

##Here is the description:

NextCapital Bowling Jackpot
As a part of our interview process, we'd like you to build a webapp that integrates with the RESTful JSON API defined in this project.

The app will be a simple way for a bowling league to track a progressive jackpot. Bowlers in the league can buy tickets to enter the drawing. All tickets cost $10 dollars, and the proceeds go into the jackpot. After some tickets are bought, one ticket is drawn at random. The owner of that ticket gets to roll once. If they get a strike, they win the entire pot. Otherwise, they win a fraction of the pot, and the remaining pot rolls over into the next drawing.

This API provides the backend for this app, and is publicly accessible at http://bowling-api.nextcapital.com. It is documented below.

Solution Requirements

At a minimum, your app should let a user:

Sign up
Log in
View a league's current jackpot
Let a league's bowlers buy tickets for the current jackpot
Draw a winning ticket for a jackpot
Record the result of the jackpot roll and then see the next jackpot
View the history of a league's jackpots
Please make your app look least decent and add a little something to show off. Don't be afraid to write some unit tests as well.

###The full description is at: http://bowling-api.nextcapital.com/

##My Implementation

##Technology Used:

*AngularJS
*Javascript
*Bower
*Sass
*HTML5
*CSS3

##Special features:

*Animated loading indicators (the API response can be quick or slow, I've discovered)
*A nice logo (with a freely distributed image, modified for this website)
*A nice color scheme
*Name lookups (a separate API call to augment bowler ID with the name for display)
*Totaling and display of balances and totals
*Responsiveness-Easy to use on a small device
*Large, dynamic buttons for special actions: buying a ticket, drawing a winner, recording pins felled
*Breadcrumb navigation plus clear indication of current user

###Notes

The objective of this app is spelled out in the description above, but also by the limitations of the API. For example, there is no provision
for removing leagues, bowlers, lotteries or for changing any attributes. A real-world application would allow for correction of mistakes. Further, a real-world database would be populated with a number of details about each bowler and league, not just name. Naturally, that would require additional functionality and more coding that was necessary for a thorough demonstration.

This project was launched from the official angular-seed app. I kept the organizational structure, which places each view with it's controller and testing
file in the same directory.

My intention was to use testing extensively. While the framework was in place from angular-seed, I have thus far been unable to incorporate Jasmine tests into testing the angular controllers. I look forward to mastering this important skill.
