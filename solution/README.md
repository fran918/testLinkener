# Solution Francisco A. Cupen B.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.7.

## Start the project

### Install

Run `install.bat` to install all package of npm
or
at solution folder run `npm i`

### Run the project
Run `start.bat` to start the server at `http://localhost:8080/` and angular project at `http://localhost:4200/`
or
run `java -jar backend/server.jar` and at solution folder run `ng serve` 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## How update the code without crash the project

### New columns in chart

if the quatity of columns in the chart have to change (adding ones) have to go to chart.component.ts and in the line 64, add a new empty array, then at line  72 push these values of the new column to this new array, also add this at the info array, then add it and configurate it in the array data in the line 86.
have to be sure configurate the colors and symbol to customized the data

in table.component.ts do the same with the new value,
in table.component.html add a column in the table.
be sure that copy all directives of the other columns, to be able update the data.

### New Intervals of time

if you want to add another interval of time, you are able to add it in the interval.ts, in assets folder.

you will have to add a new object with label and value, in value you have to set the time un miliseconds, for example if the label says 'ten senconds ago' you have to put in value 10000 (10 seconds in miliseconds).

### Change date format in table

to change the format of date in the table, you can go to table.component.html and look in the data.timestamp in the pipe date you can customize the format.

## Description

this project is a test for Linkener, the goal here is receive data from an API from a server in the port 8080, with credential with Swagger, and display these data in a chart (value/time) and in a table with 3 columns
timestamp, value1 and value2.
these values could be change just doing click inside the value and typing the new value, this new value refresh automacly in the server and refresh the chart (without press enter).

also you can change the interval of time that you want to see the data in the chart and table.

## Justification

this project i used highchart for charts, just for convenience, because almost all the styling be the same, i used a directive that enable the edit content in a div and that refresh the data directly at the server and chart.
i downloaded the credential from swagger website with the format typescript for angular and add it to the app.module.ts, also i used and update the services that swagger gave, modify the Date prototype to be the same that the server need.

## Challenges

i didn't know about swagger, i used to work with customs API from php, node, django and others, like firebase, AWS etc, this is a powerful tool, i loved it, because all the features that that have,
also the use of highchart  did a bit hard the development because all the customizations that it need and the documentation and versions to angular there aren`t the same, in big part.
