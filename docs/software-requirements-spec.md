# Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Schedule](#schedule)
- [Software Description](#software-description)
- [User Groups](#user-groups)
- [Non-Functional requirements and environmental constraints](#non-functional-requirements-and-environmental-constraints)

# Introduction

<< Insert Introduction here>>

# Schedule

    Term 1

        Week 7: Requirements report + project requirement presentation
        Week 8: Decide which software we are using for the app. 
        Week 9: Finish paper prototype and start on the app.
        Week 10: Get the base code working to have phone compatible AR size to show.
        Week 11: Position buttons and categories and make sure the buttons work.
        Week 12: Finish up little touches building home screen.
        Week 13: Peer testing report I + video demo (Bug Testing)

        This is the bare minimum requirement. homescreen working at the minimum.

    Term 2
        Week 1: Make a template page for restaurant description / option 
        Week 2: Start on Google Maps API to link with restaurants.
        Week 3: Make a map tab in the app and make Google map show.
        Week 4: Link the description page with google maps.
        Week 5: Make the restaurants list in proximity order.
        Week 6: Make order confirmation page
        Week 7: Remove listing upon order confirmation 
        Week 8: Bug testing / Finishing up touches for peer testing
        Week 9: Peer testing report II + video demo II (Bug Testing)
        Week 10: Create settings page 
        Week 11: Create account page, get dummy account working.
        Week 12: Bug testing / Extra features
        Week 13: Bug testing / Extra features
        Week 14: Final Report + Final Presentation

# Software Description

The EquiFood software is meant as a way to connect consumers with food distribution businesses to reduce food waste by selling food at a discounted price that would otherwise go to waste. It's not designed to sell the products on its own, but only to allow this connection. The app functions by allowing businesses to post listings of food that they want to sell at a discounted price, which should have a list of tags that can be added to allow for easy searching later. These listings should have a geolocation attached; each restaurant would have a default geolocation, but it should be editable if necessary. The consumers are then able to log into the app and search for food they're interested in -- either by browsing food that is nearest to them, or by searching for food by name or by tag.

A potential option is for the customers to "reserve" the food, and have it removed from the listing so that they can be sure to pick it up. If this direction is taken, the app would notify the restaurant about the reservation, and require a specific timeline from the customer for when they will be able to pick the food up. If the customer does not follow through in that time, the reservation should be removed.

# User Groups

There are three main user groups that can be identified. One is the "admin" class of users; the programmers, administration and similar users working on the app itself, who should have global access to the app and all the functions therein. Another is the restaurants and other businesses, who should be able to log into the app through the business view to add, edit and remove the products they have available. The third group is the public; these users can open the app through the user view, and search for specific products or browse the products available near them.

# Non-Functional requirements and environmental constraints

    - Links to Google Maps API
    - Javascript is the main language
    - React Native for app making
    - The server is run locally on the machine for the project.