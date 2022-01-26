#!/bin/bash

# bi2png
# Copyright (C) 2022 Gaëtan LE HEURT-FINOT
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http:#www.gnu.org/licenses/>.

mkdir dist
npm install
python generate_icon_list.py
cp list.json ./src/js/pablo.js index.html ./dist
cp -r ./node_modules/bootstrap-icons/icons/ ./dist/icons/
npm run build