const { exec, spawn } = require("child_process");

// =====================================
// Helper Functions
// =====================================

function error_log(title, body) {
  return new Promise(function (resolve, reject) {
    let gotify_token = "Aktz7WH52izij5n"; // render-puppeteer-bot
    const message = `**${title}** \n\n${body}`;
    const curl = spawn('curl', [
      `https://jossebrijesha-gotify.onrender.com/message?token=${gotify_token}`,
      '-F', `title=${title}`,
      '-F', `message=${message}`,
      // '-F', `priority=0`
    ]);
    curl.stdout.on('data', (data) => console.log(`stdout: ${data}`));
    curl.stderr.on('data', (data) => console.error(`stderr: ${data}`));
    curl.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      resolve(code);
    });
  });
}

function installPackages(packages) {
  return new Promise((resolve, reject) => {
    const command = `npm install ${packages.join(' ')}`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error installing packages: ${error}`);
        reject(error);
      } else {
        console.log(`Packages installed successfully: ${packages.join(', ')}`);
        resolve();
      }
    });
  });
}

// =====================================

(async (installPackages) => {

  // =====================================
  const email = `username@domain.com`;
  const password = `password`;

  const authToken = `rnd_xyz`;
  const dockerImg = `username/img`;
  const customDomainUrl = `email.code.xcodeclazz.com`;
  // =====================================
  
  await installPackages(['lodash', 'axios']);

  const _ = require('lodash');
  const axios = require("axios");
  const puppeteer = require('puppeteer');

  const hostUrl = `https://dashboard.render.com`;
  const createWebUrl = `https://dashboard.render.com/web/new`;

  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();
  await page.goto(hostUrl);

  // Login

  const emailField = 'input[name="email"]';
  await page.waitForSelector(emailField);
  await page.type(emailField, email);

  const passwodField = 'input[name="password"]';
  await page.waitForSelector(passwodField);
  await page.type(passwodField, password);
  
  const buttonSignIn = 'button[type="submit"]';
  await page.waitForSelector(buttonSignIn);
  await page.click(buttonSignIn);

  // Dashboard

  await page.waitForNavigation();
  await page.goto(createWebUrl);

  // New Web Service

  await new Promise((resolve, _) => setTimeout(() => resolve(), 1000 * 5));

  const existing_img_btn = await page.evaluateHandle(() => { return document.evaluate('//button[text()="Existing Image"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; });
  await existing_img_btn.click();

  const imageUrlField = 'input[id="image-path"]';
  await page.waitForSelector(imageUrlField);
  await page.type(imageUrlField, dockerImg);

  await new Promise((resolve, _) => setTimeout(() => resolve(), 1000 * 5));

  //   const cred_btn = await page.evaluateHandle(() => { return document.evaluate('//button[text()="No credential"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; });
  //   await cred_btn.click();

  //   const secret_cred_btn = await page.evaluateHandle((img) => { return document.evaluate(`//span[text()="${img}"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }, dockerImg);
  //   await secret_cred_btn.click();

  //   await new Promise((resolve, _) => setTimeout(() => resolve(), 1000 * 3));

  const next_btn = await page.evaluateHandle(() => { return document.evaluate('//button[text()="Connect"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; });
  await next_btn.click();

  // Deploy

  const serviceNameField = 'input[name="serviceName"]';
  await page.waitForSelector(serviceNameField);
  await page.evaluate(() => {
    const inputElement = document.querySelector('input[name="serviceName"]');
    inputElement.value = '';
  });
  await page.type(serviceNameField, dockerImg);

  const free_plan_btn = await page.evaluateHandle(() => { return document.evaluate('//div[text()="Free"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; });
  await free_plan_btn.click();

  try {
    // get all the services,
    const srvs = await axios.get('https://api.render.com/v1/services?limit=1', {
      headers: {
        'authorization': `Bearer ${authToken}`,
        'content-type': 'application/json',
        'accept': 'application/json',
      }
    });

    // Pick the first one
    const srv = _.first(srvs.data);

    // Delete the service
    await axios.delete('https://api.render.com/v1/services/' + srv?.service?.id, {
      headers: {
        'authorization': `Bearer ${authToken}`,
        'content-type': 'application/json',
        'accept': 'application/json',
      }
    });

  } catch(err) {
    await error_log("ERROR:render-#1", err.message);
    throw new Error(err.message);
  }

  const buttonDeploy = 'button[type="submit"]';
  await page.waitForSelector(buttonDeploy);
  await page.click(buttonDeploy);

  let srv = {};

  try {

    await new Promise((resolve, _) => setTimeout(() => resolve(), 1000 * 10));

    // get all the services,
    const srvs = await axios.get('https://api.render.com/v1/services?limit=1', {
      headers: {
        'authorization': `Bearer ${authToken}`,
        'content-type': 'application/json',
        'accept': 'application/json',
      }
    });

    await new Promise((resolve, _) => setTimeout(() => resolve(), 1000 * 10));

    // Pick the first one
    srv = _.first(srvs.data);

    // Domain Name Assign
    await axios.post('https://api.render.com/v1/services/' + srv?.service?.id + '/custom-domains', {
      "name": customDomainUrl
    }, {
      headers: {
        'authorization': `Bearer ${authToken}`,
        'content-type': 'application/json',
        'accept': 'application/json',
      }
    });

  } catch(err) {
    await error_log("ERROR:render-#2", err.message);
    throw new Error(err.message);
  }

  await error_log("render", JSON.stringify(srv, null, 2));

  await browser.close();
})(installPackages);
