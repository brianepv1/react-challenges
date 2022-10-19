# Flybondi react chanllenge
Link: [Link to this doc](#)

Autor(s): Brian Paloamr

Status: [**Draft**, Ready for review, In Review, Reviewed]

Last Updated: 2022/10/19

## Contents
- Goal
- Non-Goals
- Background
- Overview
- Detailed Desing
    - Solution 1
        - Frontend
        - Backend
    - Solution 2
        - Frontend
        - Backend
- Considerations
- Metrics

## Links
- [Original Challenges](https://github.com/flybondi/dev-challenge)
- [Another link](#)

## Objective
_What and why are we doing this?_

I'm doing this to practices my react skill and problem resolutions

_Include context for people that are unfamiliar with the project._
Just practicing

_Keep it short, elaborate below in **Background, Overview ande Detailed Design**_

_Add screenshots / mocks where necessary_

## Goals

- Goals

Hola! Soy Nelsona y tengo 65 años. La compu no me gusta mucho pero me dijeron que en Flybondi.com conseguís pasajes baratos, así que voy a hacer el esfuerzo. Quiero irme de vacaciones y tengo sólo $800 para gastar en pasajes, ida y vuelta. No tengo mucho problema a dónde irme. Me gustan tanto las sierras, como el mar, el calor como el frío. Me gustaría saber muy fácilmente y con muy pocos clicks, a qué lugares de Argentina y alrededores me puedo ir por esa plata. Tampoco tengo problema cuántos días irme ni cuándo. Mi mayor restricción es la plata. Soy jubilada, sabrás entender! Me gustaría que la computadora me diga a dónde me puedo ir, cuánto me sale, qué día y por cuánto tiempo.

Quizás mi nieta Valentina que hizo un taller de computación me ayude. Ella tiene 16 años y es muy inteligente. Me puede decir cuál es el que más me conviene. Según la fecha que sea el pasaje, puede que mi hijo Víctor me acompañe, también Valentina y Adriana (mi nuera).

## Non Goals

- Non-Goals

## Background

_What is the context of the project?_

Need to create a react applicationto resolve the problem in Goals Section.


_Include resources like other design docs if needed._

_Don't write about you design or requirements here_

## Overview

_High-level overview of your proposal._

- We don't need to find just 1 fly
- We need to desing a system to do you own travel with total price
- Get the data from the dataset

_This sections should be understandable by new employees on your team that is not related to the project._

_Put details in the next section._

## Detailed Desing

_Overview of dataset and desing._

We have this dataset format.
```js
[
  {
    origin: String,
    destination: String,
    price: Float,
    availability: Number,
    date: String
  }
]
```

If we go to see the dataset we got an array  and we can start to proposal from here.

```js
[
    {
        "data": "2021-11-15",
        "origin": "COR",
        "destination": "MDZ",
        "price": 474.05,
        "availability": 9
    }
]
```

The idea is

_Tools like [Excalidraw](https://excalidraw.com)_

_Cover major changes:_

_- What are the new functions that you will wirte?_

_- Why do you need new components?_

_- Is there any code that can be reusable?_

_Don't elaborate deeply on the implementation details._


## Solution 1

### Frontend

_Frontend_

First we need to define some variables for the system.

```js
[
  {
    id: string {FlightID to find your flight}
    origin: string {Base city to get the flight}
    destination: string {Destination city to fly}
    price: number {Final cost of you trip}
    days: number {Duration days of your trip}
    availibity: number {Total of passengers}
  }
]
```

With this variables the team is able to work on the UI Index and the router.

_Mockup Router Proposal_


### Backend

_Backend_



## Solution 2

### Frontend

_Frontend_

### Backend

_Backend_

## Considerations

_Concerns / trade-offs / tech debt_

## Metrics

_What data do you need to validate before launching this feature?_