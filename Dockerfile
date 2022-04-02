FROM apify/actor-node-playwright-firefox:16

COPY package.json ./

RUN npm --quiet set progress=false \
 && npm install --only=prod --no-optional \
 && echo "Node.js version:" \
 && node --version \
 && echo "NPM version:" \
 && npm --version

COPY . ./