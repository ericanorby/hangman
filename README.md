#Hangskeleton - a Hangman Game

##Technologies used
Javascript, JQuery 2.2.4 CDN, HTML5, CSS3

##Approach taken
I decided to create a modern-looking hangman game that allows a user to choose puzzles from different categories and keep track of their scores. I started by creating a basic layout, and organizing how I wanted my website to look. I used loops in Javascript to create the blank puzzle spaces and the alphabet letters. I used JQuery events to allow the user to click on a letter, view the instructions, and choose a category.

##Installation instructions
Open your terminal and navigate to a folder you would like to clone this repository to. Enter "$ git clone" + this file to clone a copy of this repository on your local computer.

##Unsolved problems
The dimensions of my page are in pixels. I would have liked to use responsive design but it was difficult to figure out how to have the game avoid shifting too much when the window is resized.

##User stories
A user should be able to:
- view instructions on how to play
- choose a category to select a random puzzle from that category
- see which letters have already been played
- see a piece of the hangman appear every time a guess is incorrect
- view their score (for the current game), win streak, and cumulative score (for all games played during win streak)
