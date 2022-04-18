<p align="center"><img src="/src/img/android-chrome-96x96.png"></p>
<h2 align="center">Biimage</h2>
<p align="center">Easily turn any Bootstrap Icons into an image file </p>
<p align="center">
    <a href="#about">About</a> •
    <a href="#features">Features</a> •
    <a href="#deploy">Deploy</a> •
    <a href="#license">License</a>
</p>

## About

Icons proposed by Bootstrap Icons are very nice.  
However, there are no simple tools to customise them and download them in classic image formats.  
This project solves this lack.

## Features

- **Simple** and **lightweight**
- **All Bootstrap Icons**
- **Customisation** of the icon's **colour**
- **Customisation** of the icon's **size**
- **Export** in **png** or **svg** format

## Deploy

### Install dependencies

First check that you have **Node.js** and **npm** installed on your machine.
Then, install **Node.js dependencies**
```bash
npm install
```

### Generate icon list

First check that you have **Python** installed on your machine.
Then, run:
```bash
python generate_icon_list.py
```

### Create a `dist` folder

Then create a folder for the files that will correspond to the compiled projects:
```bash
mkdir dist
```

### Copy icons and icon list to `dist` folder

Now copy the icons and the icon list into the dist folder:
```bash
cp list.json ./src/img/favicon.ico ./dist
cp -r ./node_modules/bootstrap-icons/icons/ ./dist/icons/
```

### Building the project

Execute the following command to build the project (HTML, CSS, JS, ...):
```bash
npm run build
```

## License

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see http://www.gnu.org/licenses/.

